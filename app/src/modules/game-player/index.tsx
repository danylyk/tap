import {Suspense, useMemo, useRef} from "react";
import {Group} from "three";

import {Visible} from "@/elements/components/visible";
import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";
import {useCharacterMovement} from "./hooks/useCharacterMovement";
import {usePlayerControl} from "./hooks/usePlayerControl";
import {usePlayerMovement} from "./hooks/usePlayerMovement";

export default function Module() {
  const character = useRef<Group>(null);
  const player = useRef<Group>(null);

  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  usePlayerControl({
    ref: player,
  });

  useCharacterMovement({
    ref: character,
    player,
  });

  usePlayerMovement({
    ref: player,
  });

  const isVisible = useMemo(() => {
    if (state === "missed") {
      return false;
    }

    if (state !== "stopped") {
      return true;
    }

    const {
      scene: {progress},
    } = useEnvironment.getState();

    if (progress >= 100) {
      return true;
    }

    return false;
  }, [state]);

  return (
    <group ref={player} position={[1, 0, 1]}>
      <group ref={character}>
        <Suspense>
          <Visible status={isVisible} delay={1000}>
            <Skin />
          </Visible>
        </Suspense>
      </group>
    </group>
  );
}
