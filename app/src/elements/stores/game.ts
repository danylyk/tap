export const state = [] as {
  time: number;
  direction: "z" | "x";
  position: {
    x: number;
    z: number;
  };
}[];

const store = {
  reset: () => {
    state.splice(0);
  },
  move: (payload: {
    time: number;
    position: {
      x: number;
      z: number;
    };
  }) => {
    const move = state[state.length - 1];

    if (!move) {
      state.push({
        time: payload.time,
        direction: "z",
        position: {
          x: 0,
          z: 0,
        },
      });

      return;
    }

    state.push({
      time: payload.time,
      direction: move?.direction === "z" ? "x" : "z",
      position: {
        x: payload.position.x,
        z: payload.position.z,
      },
    });
  },
};

function useStore<T>(selector: (state: typeof store) => T) {
  return selector(store);
}

useStore.getState = () => {
  return state;
};

export default useStore;
