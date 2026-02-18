import {create} from "zustand";

import {events} from "@/elements/events/game";

export default create<{
  status: "none" | "starting" | "playing" | "ending";
  boundaries: {
    x: Record<number, number[]>;
    z: Record<number, number[]>;
  };
  initialize: (payload: {
    boundaries: {
      x: Record<number, number[]>;
      z: Record<number, number[]>;
    };
  }) => void;
  open: () => void;
  start: () => void;
  stop: () => void;
  close: () => void;
}>((set) => {
  return {
    status: "none",
    boundaries: {
      x: {},
      z: {},
    },
    initialize(payload: {
      boundaries: {
        x: Record<number, number[]>;
        z: Record<number, number[]>;
      };
    }) {
      set(() => {
        return {
          boundaries: {
            x: payload.boundaries.x,
            z: payload.boundaries.z,
          },
        };
      });
    },
    open() {
      set(() => {
        return {
          status: "starting",
        };
      });

      events.emit("open");
    },
    start() {
      set(() => {
        return {
          status: "playing",
        };
      });

      events.emit("start");
    },
    stop() {
      set(() => {
        return {
          status: "ending",
        };
      });

      events.emit("stop");
    },
    close() {
      set(() => {
        return {
          status: "none",
        };
      });

      events.emit("close");
    },
  };
});
