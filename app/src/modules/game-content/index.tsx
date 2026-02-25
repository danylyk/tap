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
  const {loading, data, error, request} = useRequest(
    async ({id}: {id: string}) => {
      const document = await getDocument({
        id,
      });

      const finish = document.sections[document.sections.length - 1];

      return {
        size: finish.offset * 2,
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
  );

  const load = useEnvironment((state) => {
    return state.load;
  });

  const set = useAttempt((state) => {
    return state.set;
  });

  useEffect(() => {
    async function action() {
      const {size, duration, sections, positions, boundaries} = await request({
        id,
      });

      load({
        positions,
        boundaries,
        sections,
        duration,
      });

      set({
        speed: size / duration,
      });
    }

    action();
  }, [id, request, load, set]);

  if (error) {
    return (
      <>
        <Text>Error</Text>
      </>
    );
  }

  if (loading || !data) {
    return (
      <>
        <Text>Loading ...</Text>
      </>
    );
  }

  return children;
}
