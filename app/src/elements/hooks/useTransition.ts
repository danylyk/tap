/* eslint-disable react-hooks/exhaustive-deps */
import {useFrame, useThree} from "@react-three/fiber";
import {useMemo, useRef} from "react";

export function useTransition<T>({
  duration,
  from,
  to,
  selector,
  easing = (t) => t,
  update,
}: {
  duration: number;
  from: T;
  to: T;
  easing?: (t: number) => number;
  selector: (from: T, to: T, progress: number) => T;
  update?: (value: T) => void;
}) {
  const time = useRef(0);
  const progress = useRef(0);
  const start = useRef(from);
  const value = useRef(from);
  const end = useRef(to);

  const clock = useThree((state) => {
    return state.clock;
  });

  useFrame(() => {
    const t = clock.getElapsedTime() - time.current;
    const p = t / duration;
    const v = Math.min(p, 1);

    if (progress.current === 1) {
      return;
    }

    progress.current = easing(v);
    value.current = selector(start.current, end.current, progress.current);

    update?.(value.current);

    if (value.current === end.current) {
      progress.current = 1;
    }
  });

  return useMemo(() => {
    return {
      get ptogress() {
        return progress.current;
      },
      get value() {
        return value.current;
      },
      get start() {
        return start.current;
      },
      get end() {
        return end.current;
      },
      to(to: T, from?: T) {
        if (end.current === to) {
          return;
        }

        time.current = clock.getElapsedTime();
        progress.current = 0;
        end.current = to;

        if (from !== undefined) {
          start.current = from;
        } else {
          start.current = value.current;
        }

        value.current = start.current;
      },
      update: () => {
        if (progress.current === 1) {
          update?.(value.current);
        }
      },
    };
  }, [clock]);
}
