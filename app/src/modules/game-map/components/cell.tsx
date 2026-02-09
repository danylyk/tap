import {Gltf} from "@react-three/drei/native";

import m1 from "@/public/models/m1.glb";

export function Cell({x, z}: {x: number; z: number}) {
  return (
    <group position={[x * 30, 0, z * 30]} scale={[100, 100, 100]}>
      <Gltf src={m1} />
    </group>
  );
}
