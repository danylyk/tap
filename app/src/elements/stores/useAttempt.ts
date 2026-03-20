import {events} from "@/elements/events/game";

const store = {
  time: 0,
  speed: 0,
  history: [] as {
    time: number;
    type: "a" | "b" | "c" | "d";
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
  setAttempt: () => {
    store.time = 0;
    store.history = [];
  },
  setSpeed: ({speed}: {speed: number}) => {
    store.speed = speed;
  },
  addTick: ({delta}: {delta: number}) => {
    store.time += delta;
    events.emit("tick");
  },
  addActionStart: () => {
    store.history.push({
      time: 0,
      type: "a",
      direction: "z",
      position: {
        x: 1,
        z: 1,
      },
    });
  },
  addActionFinish: ({
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
      type: "b",
      direction: move.direction,
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  addActionBreak: ({
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
      type: "c",
      direction: move.direction,
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  addActionMove: ({
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
      type: "d",
      direction: move.direction === "x" ? "z" : "x",
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  getAttempt: () => {
    return JSON.stringify(
      store.history.map((action) => {
        return {
          a: Math.round(action.time * 100) / 100,
          b: action.type,
          c: action.direction,
          d: Math.round(action.position.x * 100) / 100,
          e: Math.round(action.position.z * 100) / 100,
        };
      }),
    );
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
