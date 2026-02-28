import {useAnimations, useGLTF} from "@react-three/drei/native";
import {useEffect, useMemo, useRef} from "react";
import {LoopOnce} from "three";
import {SkeletonUtils} from "three-stdlib";

export function Skin() {
  const {scene, animations} = useGLTF(
    "https://content.combostreak.com/tap/marks/f0d98d8fe81c07a08f72d12c8c86f0f0.glb",
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const groupRef = useRef(null);

  const {actions} = useAnimations(animations, groupRef);

  useEffect(() => {
    if (!actions["spawn"]) {
      return;
    }

    actions["spawn"].timeScale = 1;
    actions["spawn"].clampWhenFinished = true;
    actions["spawn"].setLoop(LoopOnce, 0);
    actions["spawn"].play();
  }, [actions]);

  return (
    <group ref={groupRef} position={[0.5, 0, 0.5]} scale={[3, 3, 3]}>
      <primitive object={clone} />
    </group>
  );
}
