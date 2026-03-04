import {RefObject, useEffect} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function usePlayerControl({ref}: {ref: RefObject<Group | null>}) {
  useEffect(() => {
    function onTap() {
      if (!ref.current) {
        return;
      }

      const {status, isAvailable} = useEnvironment.getState();

      if (status !== "started") {
        return;
      }

      const {time} = useAttempt.getState();

      if (time === 0) {
        return;
      }

      const {position, move} = useAttempt.getState();

      const point = {
        x: position.x,
        z: position.z,
      };

      if (isAvailable(point) === false) {
        return;
      }

      move({
        position: point,
      });
    }

    events.on("tap", onTap);

    return () => {
      events.off("tap", onTap);
    };
  }, [ref]);
}
