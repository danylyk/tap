import {create} from "zustand";

import {events} from "@/elements/events/game";

export default create<{
  status: "none" | "opened" | "started" | "stopped";
  positions: Set<string>;
  boundaries: {
    x: Record<number, number[]>;
    z: Record<number, number[]>;
  };
  sections: {
    model: string;
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
    positions: Set<string>;
    boundaries: {
      x: Record<number, number[]>;
      z: Record<number, number[]>;
    };
    sections: {
      model: string;
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
}>((set) => {
  return {
    status: "none",
    boundaries: {
      x: {},
      z: {},
    },
    positions: new Set(),
    sections: [],
    marks: [],
    duration: 0,
    load: (payload: {
      positions: Set<string>;
      boundaries: {
        x: Record<number, number[]>;
        z: Record<number, number[]>;
      };
      sections: {
        model: string;
        position: {
          x: number;
          z: number;
        };
      }[];
      duration: number;
    }) => {
      set(() => {
        return {
          status: "none",
          positions: payload.positions,
          boundaries: payload.boundaries,
          sections: payload.sections,
          duration: payload.duration,
        };
      });
    },
    open: () => {
      set(() => {
        return {
          status: "opened",
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
    mark: ({position}: {position: {x: number; z: number}}) => {
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
