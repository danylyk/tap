import {useMark} from "../hooks/useMark";
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

  return children;
}
