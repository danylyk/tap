import {Text} from "react-native";

import useEnvironment from "@/elements/stores/useEnvironment";

export function Attempt() {
  const attempt = useEnvironment((state) => {
    return state.content.attempt;
  });

  return <Text>{attempt + 1}</Text>;
}
