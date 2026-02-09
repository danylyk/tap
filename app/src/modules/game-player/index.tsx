import {useFrame, useThree} from "@react-three/fiber/native";
import {easing} from "maath";
import {useEffect, useRef} from "react";
import {Group} from "three";

import useGameStore from "@/elements/stores/game";

export default function Module() {
  const character = useRef<Group>(null);
  const player = useRef<Group>(null);
  const root = useRef<Group>(null);

  const time = useRef(0);

  const transition = useRef<{
    position: {
      x: number;
      z: number;
    };
    offset: {
      x: number;
      z: number;
    };
  }>({
    position: {
      x: 0,
      z: 0,
    },
    offset: {
      x: 0,
      z: 0,
    },
  });

  const camera = useThree((state) => {
    return state.camera;
  });

  const viewport = useThree((state) => {
    return state.viewport;
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

  useFrame((_, delta) => {
    time.current += delta;
  });

  useFrame(() => {
    if (!root.current) {
      return;
    }

    if (!player.current) {
      return;
    }

    if (!character.current) {
      return;
    }

    const moves = useGameStore.getState();
    const move = moves[moves.length - 1];

    if (!move) {
      return;
    }

    const delta = time.current - move.time;

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
      x: move.direction === "x" ? delta * 120 : 0,
      z: move.direction === "z" ? delta * 120 : 0,
    };

    const active = {
      x: place.x + distance.x,
      z: place.z + distance.z,
    };

    const passive = {
      x: (active.x + active.z) / 2,
      z: (active.x + active.z) / 2,
    };

    if (
      transition.current.position.x !== move.position.x ||
      transition.current.position.z !== move.position.z
    ) {
      transition.current.position = {
        x: move.position.x,
        z: move.position.z,
      };

      transition.current.offset = {
        x: player.current.position.x - active.x + character.current.position.x,
        z: player.current.position.z - active.z + character.current.position.z,
      };
    }

    player.current.position.set(active.x, 0, active.z);
    root.current.position.set(passive.x, 0, passive.z);

    character.current.position.lerpVectors(
      {x: transition.current.offset.x, y: 0, z: transition.current.offset.z},
      {x: 0, y: 0, z: 0},
      easing.expo.out(Math.min(delta, 1)),
    );
  });

  return (
    <>
      <group ref={root} />

      <group ref={player}>
        <group ref={character}>
          <mesh position={[15, 9, 15]}>
            <boxGeometry args={[18, 18, 18]} />
            <meshStandardMaterial color={0xbaf455} />
          </mesh>
        </group>
      </group>

      <primitive object={camera}>
        <mesh
          position={[0, 0, -1]}
          onPointerDown={() => {
            if (!player.current) {
              return;
            }

            move({
              time: time.current,
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
