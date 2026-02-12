import {easing} from "maath";
import {RefObject, useEffect} from "react";
import {Group, MathUtils} from "three";

import {events} from "@/elements/events/game";
import {useTransition} from "@/elements/hooks/useTransition";
import useGame from "@/elements/stores/game";
import useScene from "@/elements/stores/scene";

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

      const {status} = useScene.getState();

      if (status !== "playing") {
        return;
      }

      const {moves} = useGame.getState();
      const move = moves[moves.length - 1];

      if (!move) {
        return;
      }

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

      const active = {
        x: player.current.position.x - place.x + ref.current.position.x,
        z: player.current.position.z - place.z + ref.current.position.z,
      };

      transition.to({x: 0, z: 0}, {x: active.x, z: active.z});
    }

    function onStop() {
      transition.stop();
    }

    function onClose() {
      transition.to({x: 0, z: 0}, {x: 0, z: 0});
    }

    events.on("tap", onTap);
    events.on("stop", onStop);
    events.on("close", onClose);

    return () => {
      events.off("tap", onTap);
      events.off("stop", onStop);
      events.off("close", onClose);
    };
  }, [ref, player, transition]);
}
