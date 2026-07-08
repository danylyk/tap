import {useSplashScreen} from "./hooks/useSplashScreen";
import {useUserAccount} from "./hooks/useUserAccount";
import {useUserSession} from "./hooks/useUserSession";

export default function Module({children}: {children: React.ReactNode}) {
  useUserSession();
  useUserAccount();
  useSplashScreen();

  return children;
}
