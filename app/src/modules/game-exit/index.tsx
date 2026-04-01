import {X} from "lucide-react-native";
import {View} from "react-native";
import Animated, {Easing, FadeIn, FadeOut} from "react-native-reanimated";

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
    <Animated.View
      {...props}
      className={cn("-m-3 p-3 rounded-full", className)}
      entering={FadeIn.duration(500).easing(Easing.bezier(0, 0.5, 0.5, 1))}
      exiting={FadeOut.duration(100).easing(Easing.bezier(0, 0.5, 0.5, 1))}
    >
      <Button
        size="medium"
        onPress={() => {
          setSceneState({
            state: "closed",
          });
        }}
      >
        <X color="white" size={28} />
      </Button>
    </Animated.View>
  );
}
