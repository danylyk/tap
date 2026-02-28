import {useAnimations} from "@react-three/drei/native";
import {useEffect} from "react";
import {LoopOnce, LoopRepeat} from "three";

import {useModel} from "@/elements/hooks/useModel";

export function Skin() {
  const {scene, ref, animations} = useModel({
    link: "https://content.combostreak.com/tap/marks/f0d98d8fe81c07a08f72d12c8c86f0f0.glb",
  });

  const {actions} = useAnimations(animations, ref);

  useEffect(() => {
    if (!actions["spawn"]) {
      return;
    }

    actions["spawn"].timeScale = 1;
    actions["spawn"].clampWhenFinished = true;
    actions["spawn"].setLoop(LoopOnce, 0);
    actions["spawn"].play();

    if (!actions["default"]) {
      return;
    }

    const {duration} = actions["spawn"].getClip();

    actions["spawn"].crossFadeTo(actions["default"], duration, true);
    actions["default"].setLoop(LoopRepeat, Infinity);
    actions["default"].play();
  }, [actions]);

  return (
    <group ref={ref} position={[0.5, 0, 0.5]} scale={[3, 3, 3]}>
      <primitive object={scene} />
    </group>
  );
}
