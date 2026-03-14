import {useAnimations} from "@react-three/drei/native";
import {useFrame} from "@react-three/fiber/native";
import {useEffect, useRef} from "react";

import {events} from "@/elements/events/game";
import {useAnimator} from "@/elements/hooks/useAnimator";
import {useModel} from "@/elements/hooks/useModel";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function Skin({isVisible}: {isVisible?: boolean}) {
  const direction = useRef("z");

  const {scene, ref, animations} = useModel({
    link: "https://content.combostreak.com/tap/skins/1428d81a2f35e1714ff0bd0ea5e139f4.glb",
  });

  const {actions, names} = useAnimations(animations, ref);

  const animator = useAnimator({
    actions,
    names,
  });

  useFrame(() => {
    if (isVisible === false) {
      return;
    }

    const {
      scene: {state},
    } = useEnvironment.getState();

    if (state !== "started") {
      return;
    }

    const {action} = useAttempt.getState();

    if (!action) {
      return;
    }

    if (action.direction === direction.current) {
      return;
    }

    direction.current = action.direction;

    if (animator.state() !== "spawn-z" && animator.state() !== "default-z") {
      animator.play({
        name: action.direction === "z" ? "rotate-z" : "rotate-x",
      });
    }

    animator.play({
      name: action.direction === "z" ? "run-z" : "run-x",
      repeatable: true,
      delay: 0.15,
    });
  });

  useEffect(() => {
    if (isVisible === false) {
      return () => {};
    }

    function onReset() {
      direction.current = "x";

      if (animator.state() === "spawn-z" || animator.state() === "default-z") {
        return;
      }

      animator.reset();

      animator.play({
        name: "spawn-z",
      });

      animator.play({
        name: "default-z",
        repeatable: true,
        delay: 0.15,
      });
    }

    events.on("close", onReset);
    events.on("open", onReset);

    onReset();

    return () => {
      events.off("close", onReset);
      events.off("open", onReset);
    };
  }, [actions, names, animator, isVisible]);

  useEffect(() => {
    if (isVisible !== false) {
      return;
    }

    const {action} = useAttempt.getState();

    if (!action) {
      return;
    }

    if (action.direction === "z") {
      animator.play({
        name: "destroy-z",
      });

      return;
    }

    animator.play({
      name: "destroy-x",
    });
  }, [animator, isVisible]);

  return (
    <group ref={ref} position={[0.5, 0, 0.5]} scale={[3, 3, 3]}>
      <primitive object={scene} />
    </group>
  );
}
