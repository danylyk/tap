import {useEffect} from "react";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStart() {
  useEffect(() => {
    function onTap() {
      const {
        scene: {state, loading},
        setSceneState,
      } = useEnvironment.getState();

      const {setAttempt, addActionStart} = useAttempt.getState();

      if (state !== "opened" || loading) {
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
