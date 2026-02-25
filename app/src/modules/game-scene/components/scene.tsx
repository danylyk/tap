import {useStart} from "../hooks/useStart";
import {useStop} from "../hooks/useStop";
import {useTime} from "../hooks/useTime";

export function Scene({children}: {children: React.ReactNode}) {
  useStart();
  useStop();
  useTime();

  return children;
}
