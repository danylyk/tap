import {useAnimations} from "@react-three/drei/native";
import {useEffect} from "react";

import {useAnimator} from "@/elements/hooks/useAnimator";
import {useModel} from "@/elements/hooks/useModel";

export function Skin({isVisible}: {isVisible?: boolean}) {
  const {scene, ref, animations} = useModel({
    link: "https://content.combostreak.com/tap/marks/f0d98d8fe81c07a08f72d12c8c86f0f0.glb",
  });

  const {actions, names} = useAnimations(animations, ref);

  const {play} = useAnimator({
    actions,
    names,
  });

  useEffect(() => {
    if (isVisible === false) {
      return;
    }

    play({
      name: "spawn",
    });

    play({
      name: "default",
      repeatable: true,
      delay: 0.15,
    });
  }, [play, isVisible]);

  useEffect(() => {
    if (isVisible !== false) {
      return;
    }

    play({
      name: "destroy",
    });
  }, [play, isVisible]);

  return (
    <group ref={ref} position={[0.5, 0, 0.5]} scale={[3, 3, 3]}>
      <primitive object={scene} />
    </group>
  );
}
