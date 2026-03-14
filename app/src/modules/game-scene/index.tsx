import {Canvas} from "@react-three/fiber/native";
import React from "react";

import useEnvironment from "@/elements/stores/useEnvironment";

import {Scene} from "./components/scene";

export default function Module({children}: {children?: React.ReactNode}) {
  const color = useEnvironment((state) => {
    return state.content.color;
  });

  return (
    <Canvas
      orthographic
      camera={{
        up: [0, 1, 0],
        position: [-96, 90, -96],
        rotation: [
          -2.4468543773930898, -0.6550611020925815, -2.671825437663095,
        ],
        zoom: 14.4,
        far: 320,
      }}
      style={{
        backgroundColor: color,
      }}
    >
      <directionalLight position={[-60, 120, -90]} />
      <ambientLight />

      <Scene>{children}</Scene>
    </Canvas>
  );
}
