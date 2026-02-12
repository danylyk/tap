import {create} from "zustand";

import {events} from "@/elements/events/game";

export default create<{
  status: "none" | "starting" | "playing" | "ending";
  open: () => void;
  start: () => void;
  stop: () => void;
  close: () => void;
}>((set) => {
  return {
    status: "none",
    open() {
      set(() => {
        return {
          status: "starting",
        };
      });

      events.emit("open");
    },
    start() {
      set(() => {
        return {
          status: "playing",
        };
      });

      events.emit("start");
    },
    stop() {
      set(() => {
        return {
          status: "ending",
        };
      });

      events.emit("stop");
    },
    close() {
      set(() => {
        return {
          status: "none",
        };
      });

      events.emit("close");
    },
  };
});
