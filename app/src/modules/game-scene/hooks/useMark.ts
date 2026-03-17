import {useEffect} from "react";

import {events} from "@/elements/events/game";
import useAccount from "@/elements/stores/useAccount";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useMark() {
  const id = useEnvironment((state) => {
    return state.document.id;
  });

  const addMark = useAccount((state) => {
    return state.addMark;
  });

  useEffect(() => {
    function onMark({
      position,
    }: {
      position: {
        x: number;
        z: number;
      };
    }) {
      const {
        content: {boundaries},
      } = useEnvironment.getState();

      const {action} = useAttempt.getState();

      const point = {
        x: Math.round(position.x),
        z: Math.round(position.z),
      };

      const xs = boundaries.z[point.z]?.reverse() ?? [point.x];
      const zs = boundaries.x[point.x]?.reverse() ?? [point.z];

      const x = xs.find((x) => {
        return point.x >= x;
      });

      const z = zs.find((z) => {
        return point.z >= z;
      });

      if (action.direction === "x") {
        addMark({
          id,
          position: {
            x: x ?? xs[0],
            z: point.z,
          },
        });

        return;
      }

      addMark({
        id,
        position: {
          x: point.x,
          z: z ?? zs[0],
        },
      });
    }

    events.on("break", onMark);
    return () => {
      events.off("break", onMark);
    };
  }, [addMark, id]);
}
