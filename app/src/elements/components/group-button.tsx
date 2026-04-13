import React from "react";
import {Pressable} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {Text} from "@/elements/primitives/text";

export function GroupButton({
  className,
  label,
  value,
  icon,
  ...props
}: React.ComponentProps<typeof Pressable> & {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Pressable
      data-slot="button"
      onPressIn={() => {
        opacity.value = withSpring(0.4, {
          mass: 0.75,
        });
      }}
      onPressOut={() => {
        opacity.value = withSpring(1);
      }}
      {...props}
    >
      <Animated.View
        style={animatedStyle}
        className="p-1.75 pl-2 rounded-xl items-center min-h-9.5 flex-row gap-4 justify-between"
      >
        <Text className="leading-4">{label}</Text>

        {value && (
          <Text className="leading-4 grow text-right opacity-40 truncate">
            {value}
          </Text>
        )}

        {icon}
      </Animated.View>
    </Pressable>
  );
}
