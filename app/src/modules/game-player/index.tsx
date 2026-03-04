import {Suspense, useRef} from "react";
import {Group} from "three";

import useEnvironment from "@/elements/stores/useEnvironment";

import {Skin} from "./components/skin";
import {useCharacterMovement} from "./hooks/useCharacterMovement";
import {usePlayerControl} from "./hooks/usePlayerControl";
import {usePlayerMovement} from "./hooks/usePlayerMovement";

export default function Module() {
  const character = useRef<Group>(null);
  const player = useRef<Group>(null);

  const status = useEnvironment((state) => {
    return state.status;
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

  return (
    <group ref={player} position={[1, 0, 1]}>
      <group ref={character}>
        {status !== "stopped" && (
          <Suspense>
            <Skin />
          </Suspense>
        )}
      </group>
    </group>
  );
}
