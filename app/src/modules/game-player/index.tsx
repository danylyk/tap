import {useFrame, useThree} from "@react-three/fiber/native";
import {useEffect, useRef} from "react";
import {Group} from "three";

export default function Module() {
  const camera = useThree((state) => {
    return state.camera;
  });

  const player = useRef<Group>(null);
  const root = useRef<Group>(null);

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

    const t = Math.min(state.clock.elapsedTime, 20) / 20;

    const x = 0;
    const y = 0;
    const z = t * 270;

    player.current.position.set(x, y, z);
    root.current.position.set((x + z) / 2, 0, (x + z) / 2);
  });

  return (
    <>
      <group ref={root} />
      <group ref={player}>
        <mesh position={[15, 15, 15]}>
          <boxGeometry args={[30, 30, 30]} />
          <meshStandardMaterial color={0xbaf455} />
        </mesh>
      </group>
    </>
  );
}
