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

  const setSceneState = useEnvironment((state) => {
    return state.setSceneState;
  });

  if (["opened", "stopped"].includes(state) === false) {
    return null;
  }

  return (
    <View
      className={cn("-m-3 p-3 bg-white/1 rounded-full", className)}
      {...props}
    >
      <Button
        size="medium"
        onPress={() => {
          if (state === "stopped") {
            setSceneState({
              state: "opened",
            });

            return;
          }

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
