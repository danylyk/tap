import debounce from "lodash/debounce";
import {useEffect, useMemo} from "react";
import {Text} from "react-native";

import {useRequest} from "@/elements/hooks/useRequest";
import useAccount from "@/elements/stores/useAccount";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";
import {wait, when} from "@/lib/utils";

import {getDocument} from "./server";

export default function Module({children}: {children: React.ReactNode}) {
  const setSceneLoading = useEnvironment((state) => {
    return state.setSceneLoading;
  });

  const setContent = useEnvironment((state) => {
    return state.setContent;
  });

  const setAttempt = useAccount((state) => {
    return state.setAttempt;
  });

  const setSpeed = useAttempt((state) => {
    return state.setSpeed;
  });

  const document = useEnvironment((state) => {
    return state.document;
  });

  const setSceneLoadingDebounced = useMemo(
    () =>
      debounce(({value}: {value: boolean}) => {
        setSceneLoading({
          value,
        });
      }, 600),
    [setSceneLoading],
  );

  const {data, error, request} = useRequest(
    async ({id}: {id: string}) => {
      const [document] = await when([
        getDocument({
          id,
        }),
        wait(400),
      ]);

      return {
        id: document.id,
        size: document.size,
        color: document.color,
        marks: document.marks,
        done: document.done,
        attempt: document.attempt,
        duration: document.duration,
        boundaries: document.boundaries,
        positions: new Map(
          document.positions.map(({x, z, type}) => {
            return [`${x}:${z}`, type];
          }),
        ),
        sections: document.sections.map(({model, size, offset}) => {
          return {
            model,
            size,
            position: {
              x: offset,
              z: offset,
            },
          };
        }),
      };
    },
    (value) => {
      if (value === false) {
        setSceneLoadingDebounced({
          value,
        });

        return;
      }

      setSceneLoading({
        value,
      });
    },
  );

  useEffect(() => {
    async function action() {
      const {
        attempt,
        size,
        color,
        duration,
        sections,
        positions,
        boundaries,
        marks,
        done,
      } = await request({
        id: document.id,
      });

      const {
        scene: {state},
        setSceneState,
      } = useEnvironment.getState();

      setContent({
        color,
        done,
        attempt,
        positions,
        boundaries,
        sections,
        duration,
      });

      setAttempt({
        id: document.id,
        marks,
        done,
      });

      setSpeed({
        speed: size / duration,
      });

      if (state !== "stopped") {
        return;
      }

      setSceneState({
        state: "opened",
      });
    }

    action();
  }, [document, request, setContent, setAttempt, setSpeed]);

  if (error) {
    return <Text>Error</Text>;
  }

  if (!data) {
    return null;
  }

  return children;
}
