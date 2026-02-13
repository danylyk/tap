import {useFrame} from "@react-three/fiber/native";
import {RefObject, useEffect} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useGame from "@/elements/stores/game";

export function useCameraMovement({
  ref,
  speed,
}: {
  ref: RefObject<Group | null>;
  speed: number;
}) {
  useFrame(({clock}) => {
    if (!ref.current) {
      return;
    }

    const {moves} = useGame.getState();
    const move = moves[moves.length - 1];

    if (!move) {
      return;
    }

    const t = clock.elapsedTime - move.time;

    const position = {
      x: Math.round(move.position.x),
      z: Math.round(move.position.z),
    };

    const offset = {
      x: move.direction === "x" ? move.position.z - position.z : 0,
      z: move.direction === "z" ? move.position.x - position.x : 0,
    };

    const place = {
      x: position.x + offset.x,
      z: position.z + offset.z,
    };

    const distance = {
      x: move.direction === "x" ? t * speed : 0,
      z: move.direction === "z" ? t * speed : 0,
    };

    const active = {
      x: place.x + distance.x,
      z: place.z + distance.z,
    };

    const passive = {
      x: (active.x + active.z) / 2,
      z: (active.x + active.z) / 2,
    };

    ref.current.position.set(passive.x, 0, passive.z);
  });

  useEffect(() => {
    function onClose() {
      if (ref.current) {
        ref.current.position.set(1, 0, 1);
      }
    }

    events.on("close", onClose);

    return () => {
      events.off("close", onClose);
    };
  }, [ref]);
}
