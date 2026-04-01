import {LinearGradient} from "expo-linear-gradient";
import {useEffect} from "react";
import {View} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module() {
  const isClosed = useEnvironment((state) => {
    return state.scene.state === "closed";
  });

  const isOpened = useEnvironment((state) => {
    return state.scene.state === "opened";
  });

  const opacity = useSharedValue(1);

  useEffect(() => {
    const config = {
      easing: Easing.bezier(0, 0.25, 0.25, 1),
      duration: 400,
    };

    if (isClosed) {
      opacity.value = withTiming(1, config);
    } else if (isOpened) {
      opacity.value = withTiming(0.8, config);
    } else {
      opacity.value = withTiming(0.5, config);
    }
  }, [isClosed, isOpened, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 10,
    pointerEvents: "none",
  }));

  return (
    <>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <LinearGradient
          colors={["rgba(7,11,30,0.3)", "rgba(7,11,30,0)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />
      </View>
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={["rgba(7,11,30,0.0)", "rgba(7,11,30,0.8)"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 400,
          }}
        />
      </Animated.View>
    </>
  );
}
