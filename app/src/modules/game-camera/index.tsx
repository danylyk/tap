import {useThree} from "@react-three/fiber/native";
import {useEffect, useRef} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useEnvironment from "@/elements/stores/useEnvironment";

import {useCameraControl} from "./hooks/useCameraControl";
import {useCameraLink} from "./hooks/useCameraLink";
import {useCameraMovement} from "./hooks/useCameraMovement";
import {useCameraZoom} from "./hooks/useCameraZoom";

export default function Module() {
  const viewport = useThree((state) => {
    return state.viewport;
  });

  const camera = useThree((state) => {
    return state.camera;
  });

  const pivot = useRef<Group>(null);
  const offset = useRef<Group>(null);

  const zoom = useCameraZoom({
    zoom: 14.4,
  });

  useCameraControl({
    ref: offset,
    camera: pivot,
  });

  useCameraMovement({
    ref: pivot,
  });

  useCameraLink({
    ref: offset,
  });

  useEffect(() => {
    function onLoad() {
      const {
        scene: {state},
      } = useEnvironment.getState();

      if (state === "stopped") {
        zoom.to(13.9, 13.9);
      }

      if (state === "closed") {
        zoom.to(14.2, 14.2);
      }
    }

    function onOpen() {
      zoom.to(13.9);
    }

    function onStart() {
      zoom.to(14.4);
    }

    function onMiss() {
      zoom.to(15.4);
    }

    function onStop() {
      zoom.to(18.8);
    }

    function onClose() {
      zoom.to(14.2);
    }

    events.on("load", onLoad);
    events.on("open", onOpen);
    events.on("start", onStart);
    events.on("miss", onMiss);
    events.on("stop", onStop);
    events.on("close", onClose);

    return () => {
      events.off("load", onLoad);
      events.off("open", onOpen);
      events.off("start", onStart);
      events.off("miss", onMiss);
      events.off("stop", onStop);
      events.off("close", onClose);
    };
  }, [zoom]);

  return (
    <>
      <group ref={pivot} position={[1, 0, 1]}>
        <group ref={offset} />
      </group>

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
    </>
  );
}
