import {useEffect} from "react";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStart() {
  useEffect(() => {
    function onTap() {
      const {status, ...environment} = useEnvironment.getState();
      const {...attempt} = useAttempt.getState();

      if (status !== "opened") {
        return;
      }

      attempt.load();
      attempt.start();
      environment.start();
    }

    events.on("tap", onTap);

    return () => {
      events.off("tap", onTap);
    };
  }, []);
}
