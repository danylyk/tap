import mitt from "mitt";

export const events = mitt<{
  tap: void;
  tick: void;
  open: void;
  start: void;
  stop: void;
  close: void;
  break: {
    position: {
      x: number;
      z: number;
    };
  };
}>();
