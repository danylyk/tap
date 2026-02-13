import {useAnimations, useGLTF} from "@react-three/drei/native";
import {useFrame} from "@react-three/fiber/native";
import {useEffect, useMemo, useRef} from "react";
import {LoopOnce} from "three";

import {events} from "@/elements/events/game";
import useGame from "@/elements/stores/game";

export function Skin() {
  const direction = useRef("z");

  const {scene, animations} = useGLTF(
    "https://content.combostreak.com/tap/skins/1428d81a2f35e1714ff0bd0ea5e139f4.glb",
  );

  const {actions, names} = useAnimations(animations, scene);

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
    const {moves} = useGame.getState();
    const move = moves[moves.length - 1];

    if (!move) {
      return;
    }

    if (move.direction === direction.current) {
      return;
    }

    direction.current = move.direction;

    const current = move.direction === "z" ? "x" : "z";
    const next = move.direction === "z" ? "z" : "x";

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

  useEffect(() => {
    function onClose() {
      for (const name of names) {
        const action = actions[name];

        if (action) {
          action.stop();
          action.reset();
        }
      }

      direction.current = "z";
    }

    events.on("close", onClose);

    return () => {
      events.off("close", onClose);
    };
  }, [actions, names]);

  return (
    <group position={[0.5, 0, 0.5]} scale={[3, 3, 3]}>
      <primitive object={scene} />
    </group>
  );
}
