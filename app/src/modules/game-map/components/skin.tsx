import {Clone, useGLTF} from "@react-three/drei/native";

export function Skin({offset, link}: {offset: number; link: string}) {
  const {scene} = useGLTF(link);

  return (
    <group position={[offset * 3, 0, offset * 3]} scale={[3, 3, 3]}>
      <Clone object={scene} />
    </group>
  );
}
