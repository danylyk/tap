import {useThree} from "@react-three/fiber/native";
import {RefObject, useEffect} from "react";
import {Group} from "three";

export function useCameraLink({ref}: {ref: RefObject<Group | null>}) {
  const camera = useThree((state) => {
    return state.camera;
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.add(camera);
    }
  }, [camera, ref]);
}
