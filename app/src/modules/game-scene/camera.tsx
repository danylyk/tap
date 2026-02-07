import {useThree} from "@react-three/fiber/native";
import {useEffect} from "react";

export function Camera() {
  const {camera} = useThree();

  useEffect(() => {
    console.log(camera.rotation);
  }, []);

  return null;
}
