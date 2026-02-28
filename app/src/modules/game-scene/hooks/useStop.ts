import {useFrame} from "@react-three/fiber/native";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStop() {
  useFrame(() => {
    const {status, positions, ...environment} = useEnvironment.getState();

    if (status !== "started") {
      return;
    }

    const {position, ...attempt} = useAttempt.getState();

    const point = {
      x: position.x,
      z: position.z,
    };

    const key = `${Math.round(point.x)}:${Math.round(point.z)}`;

    if (positions.has(key)) {
      return;
    }

    attempt.break({
      position: point,
    });

    events.emit("break", {
      position: point,
    });

    environment.stop();
  });
}
