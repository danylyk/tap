import {Pressable} from "react-native";

import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module({
  ...props
}: React.ComponentProps<typeof Pressable>) {
  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  const setSceneState = useEnvironment((state) => {
    return state.setSceneState;
  });

  if (["none"].includes(state) === false) {
    return null;
  }

  return (
    <Pressable
      onPress={() => {
        setSceneState({
          state: "opened",
        });
      }}
      {...props}
    />
  );
}
