import {useEffect} from "react";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStart() {
  useEffect(() => {
    function onTap() {
      const {
        scene: {state},
        setSceneState,
      } = useEnvironment.getState();

      const {setAttempt, addActionStart} = useAttempt.getState();

      if (state !== "opened") {
        return;
      }

      setAttempt();
      addActionStart();

      setSceneState({
        state: "started",
      });
    }

    events.on("tap", onTap);

    return () => {
      events.off("tap", onTap);
    };
  }, []);
}
