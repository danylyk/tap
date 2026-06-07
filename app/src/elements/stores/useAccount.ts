import AsyncStorage from "@react-native-async-storage/async-storage";
import {createJSONStorage, persist} from "expo-zustand-persist";
import {Platform} from "react-native";
import {create} from "zustand";

export default create(
  persist<{
    attempts: {
      [id: string]: {
        done: boolean;
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
      done: boolean;
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
    setDone: (payload: {id: string}) => void;
  }>(
    (set, get) => {
      return {
        attempts: {},
        setAttempt: ({id, done, marks}) => {
          set((state) => {
            return {
              attempts: {
                ...state.attempts,
                [id]: {
                  done,
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

          if (attempt.done === true) {
            return;
          }

          set((state) => {
            return {
              attempts: {
                ...state.attempts,
                [id]: {
                  ...attempt,
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
        setDone: ({id}) => {
          const attempt = get().attempts[id];

          if (!attempt) {
            return;
          }

          set((state) => {
            return {
              attempts: {
                ...state.attempts,
                [id]: {
                  ...attempt,
                  done: true,
                },
              },
            };
          });
        },
      };
    },
    {
      name: "account",
      storage: createJSONStorage(() => {
        if (Platform.OS !== "web") {
          return AsyncStorage;
        }

        if (typeof localStorage === "undefined") {
          throw new Error("localStorage is unavailable");
        }

        return localStorage;
      }),
    },
  ),
);
