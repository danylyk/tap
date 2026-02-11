import {Clone, useGLTF} from "@react-three/drei/native";

export function Skin({offset, link}: {offset: number; link: string}) {
  const {scene} = useGLTF(link);

  return (
    <group position={[offset * 30, 0, offset * 30]} scale={[30, 30, 30]}>
      <Clone object={scene} />
    </group>
  );
}
