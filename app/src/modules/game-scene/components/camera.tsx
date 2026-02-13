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
    zoom: 14.4,
  });

  useEffect(() => {
    function onOpen() {
      zoom.to(13.9);
    }

    function onStart() {
      zoom.to(14.4);
    }

    function onStop() {
      zoom.to(13.9);
    }

    function onClose() {
      zoom.to(14.2);
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
