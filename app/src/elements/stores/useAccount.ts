import AsyncStorage from "@react-native-async-storage/async-storage";
import {createJSONStorage, persist} from "expo-zustand-persist";
import {Platform} from "react-native";
import {create} from "zustand";

export default create(
  persist<{
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
  }>(
    (set, get) => {
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
    },
    {
      name: "account",
      storage: createJSONStorage(() => {
        if (Platform.OS === "web") {
          return localStorage;
        }

        return AsyncStorage;
      }),
    },
  ),
);
