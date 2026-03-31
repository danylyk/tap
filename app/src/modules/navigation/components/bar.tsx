import {BottomTabBar, BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {usePathname} from "expo-router";
import React, {useEffect, useState} from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import useEnvironment from "@/elements/stores/useEnvironment";

export function Bar({...props}: BottomTabBarProps) {
  const pathname = usePathname();

  const isOpened = useEnvironment((state) => state.scene.state !== "closed");
  const isEnabled = pathname === "/";

  const [offset, setOffset] = useState(0);

  const bottom = useSharedValue(0);

  useEffect(() => {
    bottom.value = withTiming(isEnabled && isOpened ? -offset : 0, {
      easing: Easing.bezier(0, 0.25, 0.25, 1),
      duration: 400,
    });
  }, [isEnabled, isOpened, bottom, offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: bottom.value,
    left: 0,
    right: 0,
  }));

  return (
    <Animated.View
      style={animatedStyle}
      onLayout={(e) => {
        setOffset(e.nativeEvent.layout.height + 16);
      }}
    >
      <BottomTabBar {...props} />
    </Animated.View>
  );
}
