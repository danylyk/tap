import {easing} from "maath";
import {RefObject, useEffect} from "react";
import {Group, MathUtils} from "three";

import {events} from "@/elements/events/game";
import {useTransition} from "@/elements/hooks/useTransition";
import useAttempt from "@/elements/stores/useAttempt";

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
      return easing.quint.out(t);
    },
    update: (value) => {
      if (ref.current) {
        ref.current.position.set(value.x, 0, value.z);
      }
    },
  });

  useEffect(() => {
    function onReset() {
      if (!ref.current || !camera.current) {
        return;
      }

      transition.to(
        {
          x: 0,
          z: 0,
        },
        {
          x: camera.current.position.x - 1 + ref.current.position.x,
          z: camera.current.position.z - 1 + ref.current.position.z,
        },
      );
    }

    function onStop() {
      if (!ref.current || !camera.current) {
        return;
      }

      const {position} = useAttempt.getState();

      const root = {
        x: (position.x + position.z) / 2,
        z: (position.x + position.z) / 2,
      };

      transition.to({
        x: position.x - root.x + 7,
        z: position.z - root.z + 10,
      });
    }

    events.on("open", onReset);
    events.on("close", onReset);
    events.on("stop", onStop);

    return () => {
      events.off("open", onReset);
      events.off("close", onReset);
      events.off("stop", onStop);
    };
  }, [ref, camera, transition]);
}
