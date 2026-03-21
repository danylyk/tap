import {useFrame} from "@react-three/fiber/native";

import {events} from "@/elements/events/game";
import useAccount from "@/elements/stores/useAccount";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStop() {
  const setDone = useAccount((state) => {
    return state.setDone;
  });

  useFrame(() => {
    const {
      document: {id},
      scene: {state},
      checkPositionType,
      checkPositionAvailability,
      getClosestPoint,
      setSceneState,
    } = useEnvironment.getState();

    if (state !== "started") {
      return;
    }

    const {
      attempts: {
        [id]: {done} = {
          done: false,
        },
      },
    } = useAccount.getState();

    const {
      position,
      action: {direction},
      addActionBreak,
      addActionFinish,
    } = useAttempt.getState();

    const point = {
      x: position.x,
      z: position.z,
    };

    if (checkPositionAvailability(point) === true) {
      return;
    }

    setSceneState({
      state: "stopped",
    });

    const cell = getClosestPoint({
      position,
      direction,
    });

    if (checkPositionType(cell, "a") === true) {
      addActionFinish({
        position: point,
      });

      events.emit("finish", {
        position: point,
      });

      if (done === true) {
        return;
      }

      setDone({
        id,
      });

      return;
    }

    if (checkPositionType(cell, "b") === true) {
      return;
    }

    addActionBreak({
      position: point,
    });

    events.emit("break", {
      position: point,
    });

    if (done === true) {
      return;
    }

    return;
  });
}
