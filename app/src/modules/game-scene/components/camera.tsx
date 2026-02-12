import {useThree} from "@react-three/fiber/native";
import {useEffect} from "react";

import {events} from "@/elements/events/game";

import {useCameraZoom} from "../hooks/useCameraZoom";

export function Camera() {
  const camera = useThree((state) => {
    return state.camera;
  });

  const viewport = useThree((state) => {
    return state.viewport;
  });

  const zoom = useCameraZoom({
    zoom: 1.4,
  });

  useEffect(() => {
    function onOpen() {
      zoom.to(1.375);
    }

    function onStart() {
      zoom.to(1.425);
    }

    function onStop() {
      zoom.to(1.375);
    }

    function onClose() {
      zoom.to(1.4);
    }

    events.on("open", onOpen);
    events.on("start", onStart);
    events.on("stop", onStop);
    events.on("close", onClose);

    return () => {
      events.off("open", onOpen);
      events.off("start", onStart);
      events.off("stop", onStop);
      events.off("close", onClose);
    };
  }, [zoom]);

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
