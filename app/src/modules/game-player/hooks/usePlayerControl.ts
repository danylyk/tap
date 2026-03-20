import {RefObject, useEffect} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function usePlayerControl({
  ref,
  fade = 0.16,
}: {
  ref: RefObject<Group | null>;
  fade?: number;
}) {
  const addActionMove = useAttempt((state) => {
    return state.addActionMove;
  });

  const setAttempt = useAttempt((state) => {
    return state.setAttempt;
  });

  useEffect(() => {
    function onTap() {
      if (!ref.current) {
        return;
      }

      const {
        scene: {state},
        checkPositionType,
        checkPositionAvailability,
      } = useEnvironment.getState();

      if (state !== "started") {
        return;
      }

      const {time} = useAttempt.getState();

      if (time <= 0 || time <= fade) {
        return;
      }

      const {position} = useAttempt.getState();

      const point = {
        x: position.x,
        z: position.z,
      };

      if (checkPositionType(point, "a") === true) {
        return;
      }

      if (checkPositionAvailability(point) === false) {
        return;
      }

      addActionMove({
        position: point,
      });
    }

    function onReset() {
      if (!ref.current) {
        return;
      }

      setAttempt();
    }

    events.on("tap", onTap);
    events.on("open", onReset);
    events.on("close", onReset);

    return () => {
      events.off("tap", onTap);
      events.off("open", onReset);
      events.off("close", onReset);
    };
  }, [ref, setAttempt, addActionMove, fade]);
}
