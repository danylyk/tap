import {useFrame} from "@react-three/fiber/native";
import {RefObject, useEffect} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useGame from "@/elements/stores/game";

export function usePlayerMovement({
  ref,
  speed,
}: {
  ref: RefObject<Group | null>;
  speed: number;
}) {
  const reset = useGame((state) => {
    return state.reset;
  });

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

    ref.current.position.set(active.x, 0, active.z);
  });

  useEffect(() => {
    function onStop() {
      reset();
    }

    function onClose() {
      if (ref.current) {
        ref.current.position.set(1, 0, 1);
      }
    }

    events.on("stop", onStop);
    events.on("close", onClose);

    return () => {
      events.off("stop", onStop);
      events.off("close", onClose);
    };
  }, [ref, reset]);
}
