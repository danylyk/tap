import {useFrame} from "@react-three/fiber/native";
import {useRef} from "react";

export default function Module({update}: {update: (fps: number) => void}) {
  const acc = useRef({
    frames: 0,
    time: 0,
    lastFps: 0,
  });

  useFrame((_, delta) => {
    acc.current.frames += 1;
    acc.current.time += delta;

    if (acc.current.time >= 0.25) {
      const nextFps = Math.round(acc.current.frames / acc.current.time);
      acc.current.frames = 0;
      acc.current.time = 0;

      if (nextFps !== acc.current.lastFps) {
        acc.current.lastFps = nextFps;
        update(nextFps);
      }
    }
  });

  return null;
}
