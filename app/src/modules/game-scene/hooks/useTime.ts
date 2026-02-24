import {useFrame} from "@react-three/fiber";

import useAttempt from "@/elements/stores/useAttempt";
import useEnvironment from "@/elements/stores/useEnvironment";

export function useTime() {
  useFrame((_, delta) => {
    const {status} = useEnvironment.getState();

    if (status !== "started") {
      return;
    }

    const {tick} = useAttempt.getState();

    tick({
      delta,
    });
  });
}
