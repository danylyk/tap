import {events} from "@/elements/events/game";

const store = {
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
  get action() {
    const moves = store.history;
    const move = moves[moves.length - 1];

    return move;
  },
  get position() {
    const move = store.action;

    if (!move) {
      return {
        x: 1,
        z: 1,
      };
    }

    const t = store.time - move.time;

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
      x: move.direction === "x" ? t * store.speed : 0,
      z: move.direction === "z" ? t * store.speed : 0,
    };

    return {
      x: place.x + distance.x,
      z: place.z + distance.z,
    };
  },
  load: () => {
    store.time = 0;
    store.history = [];
  },
  set: ({speed}: {speed: number}) => {
    store.speed = speed;
  },
  tick: ({delta}: {delta: number}) => {
    store.time += delta;
    events.emit("tick");
  },
  start: () => {
    store.history.push({
      time: 0,
      type: "start",
      direction: "z",
      position: {
        x: 1,
        z: 1,
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
    const move = store.history[store.history.length - 1];

    if (!move) {
      return;
    }

    store.history.push({
      time: store.time,
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
    const move = store.history[store.history.length - 1];

    if (!move) {
      return;
    }

    store.history.push({
      time: store.time,
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
    const move = store.history[store.history.length - 1];

    if (!move) {
      return;
    }

    store.history.push({
      time: store.time,
      type: "move",
      direction: move.direction === "x" ? "z" : "x",
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
};

function useStore<T = typeof store>(
  selector: (state: typeof store) => T = (state) => state as T,
) {
  return selector(store);
}

useStore.getState = () => {
  return store;
};

export default useStore;
