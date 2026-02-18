export const state = {
  map: new Set<string>(),
  moves: [] as {
    time: number;
    direction: "z" | "x";
    position: {
      x: number;
      z: number;
    };
  }[],
};

const store = {
  reset: () => {
    state.moves = [];
  },
  initialize: (payload: {positions: {x: number; z: number}[]}) => {
    state.map = new Set(
      payload.positions.map(({x, z}) => {
        return `${x}:${z}`;
      }),
    );
  },
  move: (payload: {
    time: number;
    position: {
      x: number;
      z: number;
    };
  }) => {
    const move = state.moves[state.moves.length - 1];

    if (!move) {
      state.moves.push({
        time: payload.time,
        direction: "z",
        position: {
          x: 1,
          z: 1,
        },
      });

      return;
    }

    state.moves.push({
      time: payload.time,
      direction: move.direction === "z" ? "x" : "z",
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
