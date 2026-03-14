import {useFrame} from "@react-three/fiber/native";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStop() {
  useFrame(() => {
    const {
      scene: {state},
      checkPositionAvailability,
      setSceneState,
    } = useEnvironment.getState();

    if (state !== "started") {
      return;
    }

    const {position, ...attempt} = useAttempt.getState();

    const point = {
      x: position.x,
      z: position.z,
    };

    if (checkPositionAvailability(point) === true) {
      return;
    }

    attempt.break({
      position: point,
    });

    events.emit("break", {
      position: point,
    });

    setSceneState({
      state: "stopped",
    });
  });
}
