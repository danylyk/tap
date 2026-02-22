export const state = {
  time: 0,
  speed: 0,
  history: [] as {
    time: number;
    type: "start" | "finish" | "break" | "move";
    direction: "z" | "x";
    position: {
      x: number;
      z: number;
    };
  }[],
};

const store = {
  get position() {
    const moves = state.history;
    const move = moves[moves.length - 1];

    if (!move) {
      return {
        x: 0,
        z: 0,
      };
    }

    const t = state.time - move.time;

    const position = {
      x: Math.round(move.position.x),
      z: Math.round(move.position.z),
    };

    const offset = {
      x: move.direction === "x" ? move.position.z - position.z : 0,
      z: move.direction === "z" ? move.position.x - position.x : 0,
    };

    const place = {
      x: position.x + offset.x,
      z: position.z + offset.z,
    };

    const distance = {
      x: move.direction === "x" ? t * state.speed : 0,
      z: move.direction === "z" ? t * state.speed : 0,
    };

    return {
      x: place.x + distance.x,
      z: place.z + distance.z,
    };
  },
  load: () => {
    state.time = 0;
    state.history = [];
  },
  set: ({speed}: {speed: number}) => {
    state.speed = speed;
  },
  tick: ({delta}: {delta: number}) => {
    state.time += delta;
  },
  start: () => {
    state.history.push({
      time: 0,
      type: "start",
      direction: "z",
      position: {
        x: 0,
        z: 0,
      },
    });
  },
  finish: ({
    position,
  }: {
    position: {
      x: number;
      z: number;
    };
  }) => {
    const move = state.history[state.history.length - 1];

    if (!move) {
      return;
    }

    state.history.push({
      time: state.time,
      type: "finish",
      direction: move.direction,
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  break: ({
    position,
  }: {
    position: {
      x: number;
      z: number;
    };
  }) => {
    const move = state.history[state.history.length - 1];

    if (!move) {
      return;
    }

    state.history.push({
      time: state.time,
      type: "break",
      direction: move.direction,
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  move: ({
    position,
  }: {
    position: {
      x: number;
      z: number;
    };
  }) => {
    const move = state.history[state.history.length - 1];

    if (!move) {
      return;
    }

    state.history.push({
      time: state.time,
      type: "move",
      direction: move.direction === "x" ? "z" : "x",
      position: {
        x: position.x,
        z: position.z,
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
