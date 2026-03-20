import {create} from "zustand";

import {events} from "../events/game";

export default create<{
  document: {
    id: string;
  };
  scene: {
    loading: boolean;
    state: "opened" | "started" | "paused" | "stopped" | "closed";
  };
  content: {
    attempt: number;
    color: string;
    positions: Map<string, string | undefined>;
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
  };
  setDocument: (payload: {id: string}) => void;
  setSceneLoading: (payload: {value: boolean}) => void;
  setSceneState: (payload: {
    state: "opened" | "started" | "paused" | "stopped" | "closed";
  }) => void;
  setContent: (payload: {
    color: string;
    attempt: number;
    positions: Map<string, string | undefined>;
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
  checkPositionAvailability: (position: {x: number; z: number}) => boolean;
  checkPositionType: (
    position: {x: number; z: number},
    type: string | undefined,
  ) => boolean;
}>((set, get) => {
  return {
    document: {
      id: "6919d94f12f0c7f63e22afe87ef9fb53",
    },
    scene: {
      loading: true,
      state: "closed",
    },
    content: {
      attempt: 0,
      color: "#ffffff",
      positions: new Map(),
      boundaries: {
        x: {},
        z: {},
      },
      sections: [],
      duration: 0,
    },
    checkPositionAvailability: ({x, z}) => {
      const point = `${Math.round(x)}:${Math.round(z)}`;
      const collection = get().content.positions;

      return collection.has(point);
    },
    checkPositionType: ({x, z}, type) => {
      const point = `${Math.round(x)}:${Math.round(z)}`;
      const collection = get().content.positions;

      return collection.get(point) === type;
    },
    setDocument: ({id}) => {
      set(() => {
        return {
          document: {
            id,
          },
        };
      });
    },
    setContent: (payload) => {
      set(() => {
        return {
          content: {
            color: payload.color,
            attempt: payload.attempt,
            positions: payload.positions,
            boundaries: payload.boundaries,
            sections: payload.sections,
            duration: payload.duration,
          },
        };
      });

      events.emit("load");
    },
    setSceneLoading: ({value: loading}) => {
      set(({scene: {state}}) => {
        return {
          scene: {
            state,
            loading,
          },
        };
      });
    },
    setSceneState: ({state}) => {
      set(({scene: {loading}}) => {
        return {
          scene: {
            state,
            loading,
          },
        };
      });

      if (state === "opened") {
        events.emit("open");
      }

      if (state === "started") {
        events.emit("start");
      }

      if (state === "paused") {
        events.emit("pause");
      }

      if (state === "stopped") {
        events.emit("stop");
      }

      if (state === "closed") {
        events.emit("close");
      }
    },
  };
});
