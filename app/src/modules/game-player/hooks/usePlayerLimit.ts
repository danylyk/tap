import {useFrame} from "@react-three/fiber/native";

import useGame from "@/elements/stores/game";

export function usePlayerLimit({speed}: {speed: number}) {
  const reset = useGame((state) => {
    return state.reset;
  });

  useFrame(({clock}) => {
    const {moves, map} = useGame.getState();
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
      x: Math.round(place.x + distance.x),
      z: Math.round(place.z + distance.z),
    };

    const point = `${active.x}:${active.z}`;

    if (!map.has(point)) {
      reset();
    }
  });
}
