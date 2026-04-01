import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {ChevronRight} from "lucide-react-native";
import {useEffect} from "react";
import {Text, View} from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(-74);
  const translateX = useSharedValue(24);

  const isClosed = useEnvironment((state) => {
    return state.scene.state === "closed";
  });

  const isOpened = useEnvironment((state) => {
    return state.scene.state === "opened";
  });

  useEffect(() => {
    const config = {
      easing: Easing.bezier(0, 0.25, 0.25, 1),
      duration: 400,
    };

    if (isClosed) {
      translateY.value = withTiming(insets.bottom - tabBarHeight - 24, config);
      translateX.value = withTiming(24, config);
    } else {
      translateY.value = withTiming(0, config);
      translateX.value = withTiming(0, config);
    }
  }, [isClosed, translateY, translateX, tabBarHeight, insets.bottom]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}, {translateX: translateX.value}],
  }));

  if (![isClosed, isOpened].includes(true)) {
    return null;
  }

  return (
    <Animated.View
      {...props}
      className={cn(
        "absolute z-15 inset-x-0 rounded-2xl pointer-events-none",
        className,
      )}
      style={{
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: insets.bottom + 24,
        paddingRight: 24,
        paddingLeft: 24,
      }}
      entering={FadeIn.duration(300).easing(Easing.bezier(0, 0.5, 0.5, 1))}
      exiting={FadeOut.duration(300).easing(Easing.bezier(0, 0.5, 0.5, 1))}
    >
      {isClosed && (
        <Animated.View
          entering={FadeIn.duration(500).easing(Easing.bezier(0, 0.5, 0.5, 1))}
          exiting={FadeOut.duration(200).easing(Easing.bezier(0, 0.5, 0.5, 1))}
          style={{
            position: "absolute",
            zIndex: 2,
            right: 44,
            bottom: tabBarHeight + 52,
          }}
        >
          <ChevronRight stroke="white" size={28} />
        </Animated.View>
      )}
      <Animated.View className="relative z-2 p=5" style={animatedStyle}>
        <Text className="text-8xl font-black text-white">71</Text>
        <Text className="text-3xl font-light text-white/25">ATTEMPT 3</Text>
      </Animated.View>
    </Animated.View>
  );
}
