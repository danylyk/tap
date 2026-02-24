import {Clone, useGLTF} from "@react-three/drei/native";

export function Skin({
  position,
  link,
}: {
  position: {x: number; z: number};
  link: string;
}) {
  const {scene} = useGLTF(link);

  return (
    <group position={[position.x, 0, position.z]} scale={[3, 3, 3]}>
      <Clone object={scene} />
    </group>
  );
}
