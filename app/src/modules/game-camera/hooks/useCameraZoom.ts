import {useThree} from "@react-three/fiber/native";
import {easing} from "maath";
import {useEffect, useRef} from "react";
import {MathUtils} from "three";

import {useTransition} from "@/elements/hooks/useTransition";

export function useCameraZoom({zoom}: {zoom: number}) {
  const camera = useThree((state) => {
    return state.camera;
  });

  const size = useThree((state) => {
    return state.size;
  });

  const modifier = useRef(Math.min(size.height / 874, size.width / 402));

  const transition = useTransition({
    duration: 1,
    from: zoom,
    to: zoom,
    selector: (from, to, progress) => {
      return MathUtils.lerp(from, to, progress);
    },
    easing: (t) => {
      return easing.quint.out(t);
    },
    update: (value) => {
      camera.zoom = value * modifier.current;
      camera.updateProjectionMatrix();
    },
  });

  useEffect(() => {
    modifier.current = Math.min(size.height / 874, size.width / 402);
    transition.update();
  }, [size.height, size.width, modifier, transition]);

  return transition;
}
