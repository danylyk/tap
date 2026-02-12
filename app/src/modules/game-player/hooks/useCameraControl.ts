import {easing} from "maath";
import {RefObject, useEffect} from "react";
import {Group, MathUtils} from "three";

import {events} from "@/elements/events/game";
import {useTransition} from "@/elements/hooks/useTransition";

export function useCameraControl({
  ref,
  camera,
}: {
  ref: RefObject<Group | null>;
  camera: RefObject<Group | null>;
}) {
  const transition = useTransition({
    duration: 1,
    from: {x: 0, z: 0},
    to: {x: 0, z: 0},
    selector: (from, to, progress) => {
      return {
        x: MathUtils.lerp(from.x, to.x, progress),
        z: MathUtils.lerp(from.z, to.z, progress),
      };
    },
    easing: (t) => {
      return easing.expo.out(t);
    },
    update: (value) => {
      if (ref.current) {
        ref.current.position.set(value.x, 0, value.z);
      }
    },
  });

  useEffect(() => {
    function onClose() {
      if (camera.current) {
        transition.to(
          {
            x: 0,
            z: 0,
          },
          {
            x: camera.current.position.x - 10,
            z: camera.current.position.z - 10,
          },
        );
      }
    }

    events.on("close", onClose);

    return () => {
      events.off("close", onClose);
    };
  }, [ref, camera, transition]);
}
