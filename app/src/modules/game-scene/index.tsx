import {Canvas} from "@react-three/fiber/native";
import React from "react";

import {Cell} from "./cell";

export default function Module({children}: {children?: React.ReactNode}) {
  return (
    <>
      <Canvas
        orthographic
        camera={{
          up: [0, 0, 1],
          position: [960, -960 + 30 * 6, 800],
          rotation: [
            0.8760580505981937, 0.6550611020925816, 0.4697672159266982,
          ],
          zoom: 1.425,
          far: 3200,
        }}
      >
        <axesHelper args={[100]} />
        <directionalLight position={[-600, -600, 1200]} />
        <gridHelper args={[1320, 44]} rotation={[Math.PI / 2, 0, 0]} />

        <Cell width={5} height={5} length={5} x={10} y={0} z={0} />
        <Cell width={5} height={5} length={5} x={0} y={30} z={0} />
        <Cell width={5} height={5} length={5} x={0} y={0} z={90} />

        {children}
      </Canvas>
    </>
  );
}
