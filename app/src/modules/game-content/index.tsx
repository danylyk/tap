import {useEffect} from "react";
import {Text} from "react-native";

import {useRequest} from "@/elements/hooks/useRequest";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

import {getDocument} from "./server";

export default function Module({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const setSceneLoading = useEnvironment((state) => {
    return state.setSceneLoading;
  });

  const setContent = useEnvironment((state) => {
    return state.setContent;
  });

  const setSpeed = useAttempt((state) => {
    return state.setSpeed;
  });

  const {data, error, request} = useRequest(
    async ({id}: {id: string}) => {
      const document = await getDocument({
        id,
      });

      return {
        size: document.size,
        color: document.color,
        attempt: document.attempt,
        duration: document.duration,
        boundaries: document.boundaries,
        positions: new Set(
          document.positions.map(({x, z}) => {
            return `${x}:${z}`;
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
      setSceneLoading({
        value,
      });
    },
  );

  useEffect(() => {
    async function action() {
      const {attempt, size, color, duration, sections, positions, boundaries} =
        await request({
          id,
        });

      setContent({
        color,
        attempt,
        positions,
        boundaries,
        sections,
        duration,
      });

      setSpeed({
        speed: size / duration,
      });
    }

    action();
  }, [id, request, setContent, setSpeed]);

  if (error) {
    return <Text>Error</Text>;
  }

  if (!data) {
    return null;
  }

  return children;
}
