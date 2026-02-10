import {Gltf} from "@react-three/drei/native";

import model from "@/public/models/b1.glb";

export function B1({offset}: {offset: number}) {
  return (
    <group position={[offset * 30, 0, offset * 30]} scale={[30, 30, 30]}>
      <Gltf src={model} />
    </group>
  );
}
