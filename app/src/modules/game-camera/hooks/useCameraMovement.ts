import {useFrame} from "@react-three/fiber/native";
import {RefObject} from "react";
import {Group} from "three";

import useAttempt from "@/elements/stores/useAttempt";

export function useCameraMovement({ref}: {ref: RefObject<Group | null>}) {
  useFrame(() => {
    if (!ref.current) {
      return;
    }

    const {position} = useAttempt.getState();

    const point = {
      x: (position.x + position.z) / 2,
      z: (position.x + position.z) / 2,
    };

    ref.current.position.set(point.x, 0, point.z);
  });
}
