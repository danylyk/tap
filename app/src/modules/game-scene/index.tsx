import {Canvas} from "@react-three/fiber/native";
import React, {Suspense} from "react";

import {Camera} from "./components/camera";

export default function Module({children}: {children?: React.ReactNode}) {
  return (
    <>
      <Canvas
        className="bg-white"
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
      >
        <directionalLight position={[-60, 120, -90]} />
        <ambientLight />

        <Camera />

        <Suspense>{children}</Suspense>
      </Canvas>
    </>
  );
}
