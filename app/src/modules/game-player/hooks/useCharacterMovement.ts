import {easing} from "maath";
import {RefObject, useEffect} from "react";
import {Group, MathUtils} from "three";

import {events} from "@/elements/events/game";
import {useTransition} from "@/elements/hooks/useTransition";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useCharacterMovement({
  ref,
  player,
}: {
  ref: RefObject<Group | null>;
  player: RefObject<Group | null>;
}) {
  const transition = useTransition({
    duration: 10,
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
    function onTap() {
      if (!ref.current) {
        return;
      }

      if (!player.current) {
        return;
      }

      const {
        scene: {state},
      } = useEnvironment.getState();

      if (state !== "started") {
        return;
      }

      const {position} = useAttempt.getState();

      const point = {
        x: player.current.position.x - position.x + ref.current.position.x,
        z: player.current.position.z - position.z + ref.current.position.z,
      };

      transition.to({x: 0, z: 0}, {x: point.x, z: point.z});
    }

    function onStop() {
      transition.stop();
    }

    function onReset() {
      transition.to({x: 0, z: 0}, {x: 0, z: 0});
    }

    events.on("tap", onTap);
    events.on("stop", onStop);
    events.on("open", onReset);
    events.on("close", onReset);

    return () => {
      events.off("tap", onTap);
      events.off("stop", onStop);
      events.off("open", onReset);
      events.off("close", onReset);
    };
  }, [ref, player, transition]);
}
