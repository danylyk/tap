import {useAnimations, useGLTF} from "@react-three/drei/native";
import {useFrame} from "@react-three/fiber/native";
import {useEffect, useMemo, useRef} from "react";
import {LoopOnce} from "three";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

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
    const {status} = useEnvironment.getState();

    if (status !== "started") {
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

    const current = action.direction === "z" ? "x" : "z";
    const next = action.direction === "z" ? "z" : "x";

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
    function onReset() {
      for (const name of names) {
        const action = actions[name];

        if (action) {
          action.stop();
          action.reset();
        }
      }

      direction.current = "z";
    }

    events.on("close", onReset);
    events.on("open", onReset);

    return () => {
      events.off("close", onReset);
      events.off("open", onReset);
    };
  }, [actions, names]);

  return (
    <group position={[0.5, 0, 0.5]} scale={[3, 3, 3]}>
      <primitive object={scene} />
    </group>
  );
}
