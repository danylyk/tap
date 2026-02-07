/* eslint-disable react-hooks/exhaustive-deps */
import {useThree} from "@react-three/fiber/native";
import {useEffect} from "react";

export function Camera() {
  const {camera, size} = useThree();

  useEffect(() => {
    camera.zoom = (size.height / 874) * 1.425;
    camera.updateProjectionMatrix();
  }, [size.height]);

  return null;
}
