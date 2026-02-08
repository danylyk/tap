import {useFrame, useThree} from "@react-three/fiber/native";
import {useEffect, useRef} from "react";
import {Group} from "three";

import useGameStore from "@/elements/stores/game";

export default function Module() {
  const player = useRef<Group>(null);
  const root = useRef<Group>(null);

  const camera = useThree((state) => {
    return state.camera;
  });

  const viewport = useThree((state) => {
    return state.viewport;
  });

  const clock = useThree((state) => {
    return state.clock;
  });

  const move = useGameStore((state) => {
    return state.move;
  });

  useEffect(() => {
    if (!root.current) {
      return;
    }

    root.current.add(camera);
  }, [camera]);

  useFrame((state) => {
    if (!root.current) {
      return;
    }

    if (!player.current) {
      return;
    }

    const moves = useGameStore.getState();
    const move = moves[moves.length - 1];

    if (!move) {
      return;
    }

    const time = state.clock.elapsedTime - move.time;

    const position = {
      x: Math.round(move.position.x / 10) * 10,
      z: Math.round(move.position.z / 10) * 10,
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
      x: move.direction === "x" ? time * 120 : 0,
      z: move.direction === "z" ? time * 120 : 0,
    };

    const active = {
      x: place.x + distance.x,
      z: place.z + distance.z,
    };

    const passive = {
      x: (active.x + active.z) / 2,
      z: (active.x + active.z) / 2,
    };

    player.current.position.set(active.x, 0, active.z);
    root.current.position.set(passive.x, 0, passive.z);
  });

  return (
    <>
      <group ref={root} />
      <group ref={player}>
        <mesh position={[15, 9, 15]}>
          <boxGeometry args={[18, 18, 18]} />
          <meshStandardMaterial color={0xbaf455} />
        </mesh>
      </group>
      <primitive object={camera}>
        <mesh
          position={[0, 0, -1]}
          onPointerDown={() => {
            if (!player.current) {
              return;
            }

            move({
              time: clock.elapsedTime,
              position: {
                x: player.current.position.x,
                z: player.current.position.z,
              },
            });
          }}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
      </primitive>
    </>
  );
}
