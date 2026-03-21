import {X} from "lucide-react-native";
import {View} from "react-native";

import {Button} from "@/elements/primitives/button";
import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  const loading = useEnvironment((state) => {
    return state.scene.loading;
  });

  const setSceneState = useEnvironment((state) => {
    return state.setSceneState;
  });

  if (["opened"].includes(state) === false) {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <View className={cn("-m-3 p-3 rounded-full", className)} {...props}>
      <Button
        size="medium"
        onPress={() => {
          setSceneState({
            state: "closed",
          });
        }}
      >
        <X size={28} />
      </Button>
    </View>
  );
}
