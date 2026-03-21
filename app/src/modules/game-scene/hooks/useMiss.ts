import {useEffect} from "react";

import useEnvironment from "@/elements/stores/useEnvironment";

export function useMiss() {
  const isMissed = useEnvironment((state) => {
    return state.scene.state === "missed";
  });

  const setSceneState = useEnvironment((state) => {
    return state.setSceneState;
  });

  useEffect(() => {
    if (!isMissed) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setSceneState({
        state: "opened",
      });
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [isMissed, setSceneState]);
}
