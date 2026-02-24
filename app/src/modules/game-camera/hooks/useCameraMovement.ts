import {useFrame} from "@react-three/fiber/native";
import {RefObject, useEffect} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useCameraMovement({ref}: {ref: RefObject<Group | null>}) {
  useFrame(() => {
    if (!ref.current) {
      return;
    }

    const {status} = useEnvironment.getState();

    if (status !== "started") {
      return;
    }

    const {position} = useAttempt.getState();

    const point = {
      x: (position.x + position.z) / 2,
      z: (position.x + position.z) / 2,
    };

    ref.current.position.set(point.x, 0, point.z);
  });

  useEffect(() => {
    function onReset() {
      if (!ref.current) {
        return;
      }

      ref.current.position.set(1, 0, 1);
    }

    events.on("open", onReset);
    events.on("close", onReset);

    return () => {
      events.off("open", onReset);
      events.off("close", onReset);
    };
  }, [ref]);
}
