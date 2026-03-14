import {useFrame} from "@react-three/fiber";

import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useTime() {
  useFrame((_, delta) => {
    const {
      scene: {state},
    } = useEnvironment.getState();

    if (state !== "started") {
      return;
    }

    const {tick} = useAttempt.getState();

    tick({
      delta,
    });
  });
}
