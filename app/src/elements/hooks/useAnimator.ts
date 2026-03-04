import {useEffect, useMemo, useRef} from "react";
import {AnimationAction, LoopOnce, LoopRepeat} from "three";

export function useAnimator({
  actions,
  names,
}: {
  actions: {
    [x: string]: AnimationAction | null;
  };
  names: string[];
}) {
  const active = useRef<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return useMemo(() => {
    return {
      get active() {
        return active.current;
      },
      state() {
        return active.current;
      },
      reset() {
        for (const name of names) {
          const action = actions[name];

          if (action) {
            action.stop();
            action.reset();
          }
        }
      },
      play({
        name,
        fade = 0.15,
        delay = 0,
        repeatable = false,
      }: {
        name: string;
        fade?: number;
        delay?: number;
        repeatable?: boolean;
      }) {
        if (timer.current !== null) {
          clearTimeout(timer.current);
        }

        const current = active.current ?? "";
        const next = name;

        function animate() {
          if (active.current === name) {
            return;
          }

          active.current = name;

          const state = {
            current: actions[current],
            next: actions[next],
          };

          const duration = {
            current: state.current?.getClip().duration ?? 0,
            next: state.next?.getClip().duration ?? 0,
          };

          if (!state.next) {
            return;
          }

          state.next.reset();
          state.next.setLoop(LoopOnce, 1);

          state.next.clampWhenFinished = true;
          state.next.timeScale = 1;

          if (repeatable) {
            state.next.setLoop(LoopRepeat, Infinity);
          }

          if (!state.current) {
            state.next.play();
            return;
          }

          if (duration.current < 0.015 || duration.next < 0.015) {
            state.current.stop();
            state.next.play();
            return;
          }

          state.current.fadeOut(fade);
          state.next.fadeIn(fade);
          state.next.play();
        }

        if (delay > 0) {
          timer.current = setTimeout(animate, delay * 1000);
          return;
        }

        animate();
      },
    };
  }, [actions, names]);
}
