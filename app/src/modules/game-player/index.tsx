import {useRef} from "react";
import {Group} from "three";

import {Skin} from "./components/skin";
import {useCameraLink} from "./hooks/useCameraLink";
import {useCameraMovement} from "./hooks/useCameraMovement";
import {useCharacterMovement} from "./hooks/useCharacterMovement";
import {usePlayerControl} from "./hooks/usePlayerControl";
import {usePlayerMovement} from "./hooks/usePlayerMovement";

export default function Module({speed}: {speed: number}) {
  const character = useRef<Group>(null);
  const player = useRef<Group>(null);
  const camera = useRef<Group>(null);

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
    ref: camera,
  });

  return (
    <>
      <group ref={camera} />

      <group ref={player}>
        <group ref={character}>
          <Skin />
        </group>
      </group>
    </>
  );
}
