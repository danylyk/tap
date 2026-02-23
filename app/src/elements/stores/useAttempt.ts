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
  get position() {
    const moves = this.history;
    const move = moves[moves.length - 1];

    if (!move) {
      return {
        x: 1,
        z: 1,
      };
    }

    const t = this.time - move.time;

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
      x: move.direction === "x" ? t * this.speed : 0,
      z: move.direction === "z" ? t * this.speed : 0,
    };

    return {
      x: place.x + distance.x,
      z: place.z + distance.z,
    };
  },
  load() {
    this.time = 0;
    this.history = [];
  },
  set({speed}: {speed: number}) {
    this.speed = speed;
  },
  tick({delta}: {delta: number}) {
    this.time += delta;
  },
  start() {
    this.history.push({
      time: 0,
      type: "start",
      direction: "z",
      position: {
        x: 1,
        z: 1,
      },
    });
  },
  finish({
    position,
  }: {
    position: {
      x: number;
      z: number;
    };
  }) {
    const move = this.history[this.history.length - 1];

    if (!move) {
      return;
    }

    this.history.push({
      time: this.time,
      type: "finish",
      direction: move.direction,
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  break({
    position,
  }: {
    position: {
      x: number;
      z: number;
    };
  }) {
    const move = this.history[this.history.length - 1];

    if (!move) {
      return;
    }

    this.history.push({
      time: this.time,
      type: "break",
      direction: move.direction,
      position: {
        x: position.x,
        z: position.z,
      },
    });
  },
  move({
    position,
  }: {
    position: {
      x: number;
      z: number;
    };
  }) {
    const move = this.history[this.history.length - 1];

    if (!move) {
      return;
    }

    this.history.push({
      time: this.time,
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
  return store;
};

export default useStore;
