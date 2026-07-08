import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";

import useAccount from "@/elements/stores/useAccount";

SplashScreen.preventAutoHideAsync();

export function useSplashScreen() {
  const loading = useAccount((state) => {
    return state.app.loading;
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    async function action() {
      await SplashScreen.hideAsync();
    }

    action();
  }, [loading]);
}
