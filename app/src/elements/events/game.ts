import mitt from "mitt";

export const events = mitt<{
  tap: void;
  open: void;
  start: void;
  stop: void;
  close: void;
}>();
