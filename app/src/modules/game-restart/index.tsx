import {RotateCcw} from "lucide-react-native";
import {View} from "react-native";
import Animated, {Easing, FadeInLeft} from "react-native-reanimated";

import {Button} from "@/elements/primitives/button";
import useAccount from "@/elements/stores/useAccount";
import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const id = useEnvironment((state) => {
    return state.document.id;
  });

  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  const done = useAccount((state) => {
    return state.attempts[id]?.done ?? false;
  });

  const setDocument = useEnvironment((state) => {
    return state.setDocument;
  });

  if (["stopped"].includes(state) === false) {
    return null;
  }

  if (!done) {
    return null;
  }

  return (
    <View
      className={cn("flex-row items-center justify-center gap-2", className)}
      {...props}
    >
      <Animated.View
        entering={FadeInLeft.delay(1700)
          .duration(500)
          .easing(Easing.bezier(0, 0.5, 0.25, 1))}
        className="flex-row gap-4 items-center justify-center"
      >
        <Button
          className="w-12 h-12 items-center justify-center"
          size="medium"
          onPress={() => {
            setDocument({
              id,
            });
          }}
        >
          <RotateCcw color="white" strokeWidth={2.5} size={20} />
        </Button>
      </Animated.View>
    </View>
  );
}
