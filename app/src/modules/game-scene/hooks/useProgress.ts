import {useFrame} from "@react-three/fiber";
import {useEffect} from "react";

import {events} from "@/elements/events/game";
import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useProgress() {
  const setSceneProgress = useEnvironment((state) => {
    return state.setSceneProgress;
  });

  useFrame((_) => {
    const {
      scene: {state},
    } = useEnvironment.getState();

    if (state !== "started") {
      return;
    }

    const {time} = useAttempt.getState();

    const {
      scene: {progress},
      content: {duration},
    } = useEnvironment.getState();

    const current = Math.min(99, Math.floor((time / duration) * 100));

    if (current === progress) {
      return;
    }

    setSceneProgress({
      progress: current,
    });
  });

  useEffect(() => {
    function onFinish() {
      setSceneProgress({
        progress: 100,
      });
    }

    events.on("finish", onFinish);

    return () => {
      events.off("finish", onFinish);
    };
  }, [setSceneProgress]);
}
