import {useEffect} from "react";
import {AppState, Platform} from "react-native";

import {events} from "@/elements/events/game";
import useEnvironment from "@/elements/stores/useEnvironment";

export function usePause() {
  useEffect(() => {
    function onPause() {
      const {
        scene: {state},
        setSceneState,
      } = useEnvironment.getState();

      if (state !== "started") {
        return;
      }

      setSceneState({
        state: "paused",
      });
    }

    if (Platform.OS === "web") {
      function onVisibilityChange() {
        if (document.hidden) {
          onPause();
        }
      }

      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState !== "active") {
        onPause();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    function onTap() {
      const {
        scene: {state},
        setSceneState,
      } = useEnvironment.getState();

      if (state !== "paused") {
        return;
      }

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
