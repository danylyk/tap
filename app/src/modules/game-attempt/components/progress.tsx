import {useEffect, useState} from "react";
import {Text} from "react-native";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function Progress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onTick() {
      const {time} = useAttempt.getState();
      const {duration} = useEnvironment.getState();

      setProgress(() => {
        return Math.min(99, Math.floor((time / duration) * 100));
      });
    }

    function onReset() {
      setProgress(() => {
        return 0;
      });
    }

    events.on("tick", onTick);
    events.on("open", onReset);
    events.on("close", onReset);

    return () => {
      events.off("tick", onTick);
      events.off("open", onReset);
      events.off("close", onReset);
    };
  }, []);

  return <Text>{progress}</Text>;
}
