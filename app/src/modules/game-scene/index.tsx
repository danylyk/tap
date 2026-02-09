import {Canvas} from "@react-three/fiber/native";
import React from "react";

import {Camera} from "./components/camera";

export default function Module({children}: {children?: React.ReactNode}) {
  return (
    <>
      <Canvas
        orthographic
        camera={{
          up: [0, 1, 0],
          position: [-960, 900, -960],
          rotation: [
            -2.4468543773930898, -0.6550611020925815, -2.671825437663095,
          ],
          zoom: 1.425,
          far: 3200,
        }}
      >
        <directionalLight position={[-600, 1200, -900]} />
        <ambientLight />

        <Camera />

        {children}
      </Canvas>
    </>
  );
}
