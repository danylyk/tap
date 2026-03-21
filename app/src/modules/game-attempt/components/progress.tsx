import {Text} from "react-native";

import useEnvironment from "@/elements/stores/useEnvironment";

export function Progress() {
  const progress = useEnvironment((state) => {
    return state.scene.progress;
  });

  return <Text>{progress}</Text>;
}
