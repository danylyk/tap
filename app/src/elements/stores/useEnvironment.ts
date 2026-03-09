import {create} from "zustand";

import {events} from "@/elements/events/game";

export default create<{
  color: string;
  status: "none" | "opened" | "started" | "stopped";
  attempt: number;
  positions: Set<string>;
  boundaries: {
    x: Record<number, number[]>;
    z: Record<number, number[]>;
  };
  sections: {
    model: string;
    size: number;
    position: {
      x: number;
      z: number;
    };
  }[];
  marks: {
    position: {
      x: number;
      z: number;
    };
  }[];
  duration: number;
  load: (payload: {
    color: string;
    attempt: number;
    positions: Set<string>;
    boundaries: {
      x: Record<number, number[]>;
      z: Record<number, number[]>;
    };
    sections: {
      model: string;
      size: number;
      position: {
        x: number;
        z: number;
      };
    }[];
    duration: number;
  }) => void;
  open: () => void;
  start: () => void;
  stop: () => void;
  close: () => void;
  mark: (payload: {
    position: {
      x: number;
      z: number;
    };
  }) => void;
  isAvailable: (position: {x: number; z: number}) => boolean;
}>((set, get) => {
  return {
    color: "#ffffff",
    status: "none",
    boundaries: {
      x: {},
      z: {},
    },
    positions: new Set(),
    sections: [],
    marks: [],
    attempt: 0,
    duration: 0,
    isAvailable: ({x, z}) => {
      return get().positions.has(`${Math.round(x)}:${Math.round(z)}`);
    },
    load: (payload) => {
      set(() => {
        return {
          status: "none",
          color: payload.color,
          attempt: payload.attempt,
          positions: payload.positions,
          boundaries: payload.boundaries,
          sections: payload.sections,
          duration: payload.duration,
        };
      });
    },
    open: () => {
      set((state) => {
        return {
          status: "opened",
          attempt: state.marks.length,
        };
      });

      events.emit("open");
    },
    start: () => {
      set(() => {
        return {
          status: "started",
        };
      });

      events.emit("start");
    },
    stop: () => {
      set(() => {
        return {
          status: "stopped",
        };
      });

      events.emit("stop");
    },
    close: () => {
      set(() => {
        return {
          status: "none",
        };
      });

      events.emit("close");
    },
    mark: ({position}) => {
      set((state) => {
        return {
          marks: [
            ...state.marks,
            {
              position: position,
            },
          ],
        };
      });
    },
  };
});
