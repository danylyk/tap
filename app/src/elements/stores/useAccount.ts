import {create} from "zustand";

export default create<{
  attempts: {
    [id: string]: {
      marks: {
        position: {
          x: number;
          z: number;
        };
      }[];
    };
  };
  setAttempt: (payload: {
    id: string;
    marks: {
      position: {
        x: number;
        z: number;
      };
    }[];
  }) => void;
  addMark: (payload: {
    id: string;
    position: {
      x: number;
      z: number;
    };
  }) => void;
}>((set, get) => {
  return {
    attempts: {},
    setAttempt: ({id, marks}) => {
      set((state) => {
        return {
          attempts: {
            ...state.attempts,
            [id]: {
              marks,
            },
          },
        };
      });
    },
    addMark: ({id, position}) => {
      const attempt = get().attempts[id];

      if (!attempt) {
        return;
      }

      set((state) => {
        return {
          attempts: {
            ...state.attempts,
            [id]: {
              marks: [
                ...attempt.marks,
                {
                  position,
                },
              ],
            },
          },
        };
      });
    },
  };
});
