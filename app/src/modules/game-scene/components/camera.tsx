import {useThree} from "@react-three/fiber/native";

import {events} from "@/elements/events/game";

import {useCameraState} from "../hooks/useCameraState";
import {useCameraZoom} from "../hooks/useCameraZoom";

export function Camera() {
  const camera = useThree((state) => {
    return state.camera;
  });

  const viewport = useThree((state) => {
    return state.viewport;
  });

  const zoom = useCameraZoom({
    zoom: 1.425,
  });

  useCameraState({
    zoom,
  });

  return (
    <primitive object={camera}>
      <mesh
        position={[0, 0, -1]}
        onPointerDown={() => {
          events.emit("tap");
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
  );
}
