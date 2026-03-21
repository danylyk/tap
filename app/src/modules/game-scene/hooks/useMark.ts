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
        action: {direction},
      } = useAttempt.getState();

      const {getClosestPoint} = useEnvironment.getState();

      const point = getClosestPoint({
        position,
        direction,
      });

      addMark({
        id,
        position: point,
      });
    }

    events.on("break", onMark);
    return () => {
      events.off("break", onMark);
    };
  }, [addMark, id]);
}
