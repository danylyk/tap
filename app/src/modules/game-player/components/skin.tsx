import {useAnimations, useGLTF} from "@react-three/drei/native";
import {useFrame} from "@react-three/fiber/native";
import {useMemo, useRef} from "react";
import {LoopOnce} from "three";

import useGameStore from "@/elements/stores/game";
import model from "@/public/models/p.glb";

export function Skin() {
  const {scene, animations} = useGLTF(model);
  const {actions} = useAnimations(animations, scene);

  const direction = useRef("z");

  const states = useMemo(() => {
    return {
      actions: {
        x: actions["x"] ?? null,
        z: actions["z"] ?? null,
      },
      durations: {
        x: actions["x"]?.getClip().duration ?? 0,
        z: actions["z"]?.getClip().duration ?? 0,
      },
    };
  }, [actions]);

  useFrame(() => {
    const moves = useGameStore.getState();
    const move = moves[moves.length - 1];

    if (!move) {
      return;
    }

    if (move.direction === direction.current) {
      return;
    }

    direction.current = move.direction;

    const current = move.direction === "x" ? "x" : "z";
    const next = move.direction === "x" ? "z" : "x";

    const actions = {
      current: states.actions[current],
      next: states.actions[next],
    };

    if (!actions.current || !actions.next) {
      return;
    }

    actions.next.reset();
    actions.next.setLoop(LoopOnce, 1);

    actions.next.clampWhenFinished = true;
    actions.next.timeScale = 1;

    if (states.durations[current] < 0.3 || states.durations[next] < 0.3) {
      actions.current.stop();
    } else {
      actions.current.fadeOut(0.15);
      actions.next.fadeIn(0.15);
    }

    actions.next.play();
  });

  return (
    <group position={[0, 0, 0]} scale={[30, 30, 30]}>
      <primitive object={scene} />
    </group>
  );
}
