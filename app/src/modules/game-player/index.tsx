import {useRef} from "react";
import {Group} from "three";

import {Skin} from "./components/skin";
import {useCharacterMovement} from "./hooks/useCharacterMovement";
import {usePlayerControl} from "./hooks/usePlayerControl";
import {usePlayerLimit} from "./hooks/usePlayerLimit";
import {usePlayerMovement} from "./hooks/usePlayerMovement";

export default function Module() {
  const speed = 10;

  const character = useRef<Group>(null);
  const player = useRef<Group>(null);

  usePlayerControl({
    ref: player,
  });

  useCharacterMovement({
    ref: character,
    player,
  });

  usePlayerMovement({
    ref: player,
    speed,
  });

  usePlayerLimit({
    speed,
  });

  return (
    <group ref={player} position={[1, 0, 1]}>
      <group ref={character}>
        <Skin />
      </group>
    </group>
  );
}
