import {useMark} from "../hooks/useMark";
import {useMiss} from "../hooks/useMiss";
import {usePause} from "../hooks/usePause";
import {useStart} from "../hooks/useStart";
import {useStop} from "../hooks/useStop";
import {useTime} from "../hooks/useTime";

export function Scene({children}: {children: React.ReactNode}) {
  useStart();
  usePause();
  useStop();
  useTime();
  useMark();
  useMiss();

  return children;
}
