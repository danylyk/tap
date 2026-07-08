import AsyncStorage from "@react-native-async-storage/async-storage";
import {createJSONStorage, persist} from "expo-zustand-persist";
import {Platform} from "react-native";
import {create} from "zustand";

let resolveAccountStore!: () => void;

export const waitAccountStore = new Promise<void>((resolve) => {
  resolveAccountStore = resolve;
});

export default create(
  persist<{
    app: {
      token: string;
      loading: boolean;
    };
    user: {
      id: string;
      name: string;
    };
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
    setToken: (payload: {token: string}) => void;
    setAccount: (payload: {id: string; name: string}) => void;
    setLoading: (payload: {loading: boolean}) => void;
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
        app: {
          loading: true,
          token: "",
        },
        user: {
          id: "",
          name: "",
        },
        attempts: {},
        setToken: ({token}) => {
          set((state) => {
            return {
              app: {
                ...state.app,
                token,
              },
            };
          });
        },
        setAccount: ({id, name}) => {
          set((state) => {
            return {
              user: {
                ...state.user,
                id,
                name,
              },
            };
          });
        },
        setLoading: ({loading}) => {
          set((state) => {
            return {
              app: {
                ...state.app,
                loading,
              },
            };
          });
        },
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
      partialize: (state) => {
        const {
          app: {loading, ...app},
          ...rest
        } = state;

        return {app, ...rest} as typeof state;
      },
      merge: (persisted, current) => {
        const state = persisted as Partial<typeof current>;

        return {
          ...current,
          ...state,
          app: {
            ...current.app,
            ...state.app,
          },
        };
      },
      onRehydrateStorage: () => {
        return () => {
          resolveAccountStore();
        };
      },
    },
  ),
);
