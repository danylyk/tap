import {useThree} from "@react-three/fiber";
import {selectionAsync} from "expo-haptics";
import {RefObject, useEffect} from "react";
import {Group} from "three";

import {events} from "@/elements/events/game";
import useGame from "@/elements/stores/game";
import useScene from "@/elements/stores/scene";

export function usePlayerControl({ref}: {ref: RefObject<Group | null>}) {
  const clock = useThree((state) => {
    return state.clock;
  });

  const start = useScene((state) => {
    return state.start;
  });

  const move = useGame((state) => {
    return state.move;
  });

  const reset = useGame((state) => {
    return state.reset;
  });

  useEffect(() => {
    function onTap() {
      if (!ref.current) {
        return;
      }

      const {status} = useScene.getState();

      if (status === "playing") {
        move({
          time: clock.elapsedTime,
          position: {
            x: ref.current.position.x,
            z: ref.current.position.z,
          },
        });

        selectionAsync();
      }

      if (status === "starting") {
        start();

        move({
          time: clock.elapsedTime,
          position: {
            x: ref.current.position.x,
            z: ref.current.position.z,
          },
        });

        selectionAsync();
      }
    }

    function onClose() {
      reset();
    }

    events.on("tap", onTap);
    events.on("close", onClose);

    return () => {
      events.off("tap", onTap);
      events.off("close", onClose);
    };
  }, [ref, clock, move, start, reset]);
}
