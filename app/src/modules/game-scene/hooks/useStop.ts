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

    const {position, addActionBreak, addActionFinish} = useAttempt.getState();

    const point = {
      x: position.x,
      z: position.z,
    };

    if (checkPositionType(point, "a") === true) {
      addActionFinish({
        position: point,
      });

      setSceneState({
        state: "stopped",
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

    if (checkPositionAvailability(point) === false) {
      addActionBreak({
        position: point,
      });

      setSceneState({
        state: "stopped",
      });

      events.emit("break", {
        position: point,
      });

      if (done === true) {
        return;
      }

      return;
    }
  });
}
