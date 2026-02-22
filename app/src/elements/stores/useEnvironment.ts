import {create} from "zustand";

export default create<{
  status: "none" | "started" | "opened" | "closed";
  positions: Set<string>;
  boundaries: {
    x: Record<number, number[]>;
    z: Record<number, number[]>;
  };
  sections: {
    model: string;
    position: number;
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
      position: number;
    }[];
    duration: number;
  }) => void;
  start: () => void;
  open: () => void;
  close: () => void;
  exit: () => void;
}>((set) => {
  return {
    status: "none",
    boundaries: {
      x: {},
      z: {},
    },
    positions: new Set(),
    sections: [],
    duration: 0,
    load: (payload: {
      positions: Set<string>;
      boundaries: {
        x: Record<number, number[]>;
        z: Record<number, number[]>;
      };
      sections: {
        model: string;
        position: number;
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
    start: () => {
      set(() => {
        return {
          status: "started",
        };
      });
    },
    open: () => {
      set(() => {
        return {
          status: "opened",
        };
      });
    },
    close: () => {
      set(() => {
        return {
          status: "closed",
        };
      });
    },
    exit: () => {
      set(() => {
        return {
          status: "none",
        };
      });
    },
  };
});
