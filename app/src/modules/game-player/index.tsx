import {useRef} from "react";
import {Group} from "three";

import {Skin} from "./components/skin";
import {useCameraControl} from "./hooks/useCameraControl";
import {useCameraLink} from "./hooks/useCameraLink";
import {useCameraMovement} from "./hooks/useCameraMovement";
import {useCharacterMovement} from "./hooks/useCharacterMovement";
import {usePlayerControl} from "./hooks/usePlayerControl";
import {usePlayerMovement} from "./hooks/usePlayerMovement";

export default function Module({speed}: {speed: number}) {
  const character = useRef<Group>(null);
  const player = useRef<Group>(null);
  const camera = useRef<Group>(null);
  const pivot = useRef<Group>(null);

  useCameraControl({
    ref: pivot,
    camera,
  });

  usePlayerControl({
    ref: player,
  });

  useCameraMovement({
    ref: camera,
    speed,
  });

  useCharacterMovement({
    ref: character,
    player,
  });

  usePlayerMovement({
    ref: player,
    speed,
  });

  useCameraLink({
    ref: pivot,
  });

  return (
    <>
      <group ref={camera} position={[1, 0, 1]}>
        <group ref={pivot} />
      </group>

      <group ref={player} position={[1, 0, 1]}>
        <group ref={character}>
          <Skin />
        </group>
      </group>
    </>
  );
}
