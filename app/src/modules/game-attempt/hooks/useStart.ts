import {useEffect} from "react";

import {events} from "@/elements/events/game";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useStart() {
  useEffect(() => {
    function onTap() {
      const {status, open} = useEnvironment.getState();

      if (status !== "started") {
        return;
      }

      open();
    }

    events.on("tap", onTap);

    return () => {
      events.off("tap", onTap);
    };
  }, []);
}
