import {ChevronRight, RotateCcw} from "lucide-react-native";
import {View} from "react-native";
import Animated, {Easing, FadeIn, FadeInLeft} from "react-native-reanimated";

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

  return (
    <View
      className={cn("flex-row items-center justify-center gap-2", className)}
      {...props}
    >
      <Animated.View
        entering={FadeInLeft.delay(1500)
          .duration(500)
          .easing(Easing.bezier(0, 0.5, 0.25, 1))}
        className="flex-row gap-4 items-center justify-center"
      >
        {done && (
          <Animated.View
            entering={FadeIn.delay(2000)
              .duration(1000)
              .easing(Easing.bezier(0, 0.05, 0.05, 1))}
          >
            <Button
              variant="primary"
              size="medium"
              onPress={() => {
                setDocument({
                  id,
                });
              }}
            >
              <RotateCcw stroke="white" strokeWidth={3} size={20} />
            </Button>
          </Animated.View>
        )}
        {done && (
          <Button
            className="px-5 gap-3"
            variant="primary"
            size="medium"
            onPress={() => {
              setDocument({
                id,
              });
            }}
          >
            Continue
            <ChevronRight
              className="w-5 h-5 -mr-1"
              stroke="white"
              strokeWidth={3}
            />
          </Button>
        )}
        {!done && (
          <Button
            className="px-5 gap-3.5"
            variant="primary"
            size="medium"
            onPress={() => {
              setDocument({
                id,
              });
            }}
          >
            Retry
            <RotateCcw
              className="w-4.5 h-4.5 -mr-0.5"
              stroke="white"
              strokeWidth={3}
            />
          </Button>
        )}
      </Animated.View>
    </View>
  );
}
