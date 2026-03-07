import * as Haptics from "expo-haptics";
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
  const move = useAttempt((state) => {
    return state.move;
  });

  const load = useAttempt((state) => {
    return state.load;
  });

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

      if (time <= 0 || time <= fade) {
        return;
      }

      const {position} = useAttempt.getState();

      const point = {
        x: position.x,
        z: position.z,
      };

      if (isAvailable(point) === false) {
        return;
      }

      Haptics.selectionAsync();

      move({
        position: point,
      });
    }

    function onReset() {
      if (!ref.current) {
        return;
      }

      load();
    }

    events.on("tap", onTap);
    events.on("open", onReset);
    events.on("close", onReset);

    return () => {
      events.off("tap", onTap);
      events.off("open", onReset);
      events.off("close", onReset);
    };
  }, [ref, move, load, fade]);
}
