import {Clone} from "@react-three/drei/native";

import {useModel} from "@/elements/hooks/useModel";

export function Skin({
  position,
  link,
}: {
  position: {x: number; z: number};
  link: string;
}) {
  const {scene, ref} = useModel({
    link,
  });

  return (
    <group ref={ref} position={[position.x, 0, position.z]} scale={[3, 3, 3]}>
      <Clone object={scene} />
    </group>
  );
}
