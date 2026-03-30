import {Check} from "lucide-react-native";
import {Text, View} from "react-native";
import Animated, {Easing, FadeIn, FadeOut} from "react-native-reanimated";

import useAccount from "@/elements/stores/useAccount";
import useEnvironment from "@/elements/stores/useEnvironment";

import {Attempt} from "./components/attempt";
import {Progress} from "./components/progress";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  const id = useEnvironment((state) => {
    return state.document.id;
  });

  const done = useAccount((state) => {
    return state.attempts[id]?.done;
  });

  const isClosed = useEnvironment((state) => {
    return state.scene.state === "closed";
  });

  if (isClosed) {
    return null;
  }

  return (
    <Animated.View
      {...props}
      entering={FadeIn.duration(500).easing(Easing.bezier(0, 0.5, 0.5, 1))}
      exiting={FadeOut.duration(100).easing(Easing.bezier(0, 0.5, 0.5, 1))}
    >
      <Text className="text-4xl font-bold text-primary">
        <Progress />
        <Text className="text-2xl">%</Text>
      </Text>
      <Text className="text-base text-primary/40">
        ATTEMPT <Attempt />
      </Text>

      {done && (
        <View className="p-1 bg-primary/10 w-7 h-7 flex items-center justify-center rounded-full mt-1">
          <Check size={16} />
        </View>
      )}
    </Animated.View>
  );
}
