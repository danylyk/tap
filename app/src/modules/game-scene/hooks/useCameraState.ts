import {useEffect} from "react";

import {events} from "@/elements/events/game";

export function useCameraState({zoom}: {zoom: {to: (value: number) => void}}) {
  useEffect(() => {
    function onOpen() {
      zoom.to(1.375);
    }

    function onStart() {
      zoom.to(1.425);
    }

    function onStop() {
      zoom.to(1.375);
    }

    function onClose() {
      zoom.to(1.425);
    }

    events.on("open", onOpen);
    events.on("start", onStart);
    events.on("stop", onStop);
    events.on("close", onClose);

    return () => {
      events.off("open", onOpen);
      events.off("start", onStart);
      events.off("stop", onStop);
      events.off("close", onClose);
    };
  }, [zoom]);
}
