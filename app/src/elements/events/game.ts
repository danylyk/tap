import mitt from "mitt";

export const events = mitt<{
  tap: void;
  tick: void;
  load: void;
  open: void;
  start: void;
  miss: void;
  pause: void;
  stop: void;
  close: void;
  break: {
    position: {
      x: number;
      z: number;
    };
  };
  finish: {
    position: {
      x: number;
      z: number;
    };
  };
}>();
