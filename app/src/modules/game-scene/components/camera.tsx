/* eslint-disable react-hooks/exhaustive-deps */
import {useThree} from "@react-three/fiber/native";
import {useEffect} from "react";

export function Camera() {
  const camera = useThree((state) => {
    return state.camera;
  });

  const size = useThree((state) => {
    return state.size;
  });

  useEffect(() => {
    camera.zoom = Math.min(size.height / 874, size.width / 402) * 1.425;
    camera.updateProjectionMatrix();
  }, [size.height, size.width]);

  return null;
}
