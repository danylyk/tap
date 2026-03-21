import {Text, View} from "react-native";
import Animated, {Easing, FadeInDown} from "react-native-reanimated";

import useAccount from "@/elements/stores/useAccount";
import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  if (["stopped"].includes(state) === false) {
    return null;
  }

  const collection = [
    () => {
      const {
        scene: {progress},
      } = useEnvironment.getState();

      return `${progress}% Passed`;
    },
    () => {
      const {
        document: {id},
        content: {done: wasDone, attempt},
      } = useEnvironment.getState();

      const {
        attempts: {
          [id]: {done} = {
            done: false,
          },
        },
      } = useAccount.getState();

      if (!wasDone && done) {
        return `Attempt ${attempt + 1} is successful`;
      }

      return null;
    },
    () => {
      const {
        document: {id},
      } = useEnvironment.getState();

      const {
        attempts: {
          [id]: {done} = {
            done: false,
          },
        },
      } = useAccount.getState();

      if (done) {
        return "New level unlocked";
      }

      return null;
    },
  ];

  return (
    <View
      className={cn(
        "flex items-center justify-center gap-2 **:select-none",
        className,
      )}
      {...props}
    >
      {collection
        .map((getter) => {
          return getter();
        })
        .filter((message) => {
          return message;
        })
        .map((text, index, collection) => {
          const preogress = (index + 1) / collection.length;

          return (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(600 + 300 * preogress)
                .duration(300 + 300 * preogress)
                .easing(Easing.bezier(0, 0.25, 0.25, 1))}
              className="w-full px-6 py-3 bg-primary"
            >
              <Text className="text-white text-base font-bold uppercase text-center">
                {text}
              </Text>
            </Animated.View>
          );
        })}
    </View>
  );
}
