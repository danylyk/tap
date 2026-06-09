import {cva, VariantProps} from "class-variance-authority";
import React from "react";
import {Pressable, Text, View} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {cn} from "@/lib/utils";

const pressableVariants = cva("rounded-full", {
  variants: {
    variant: {
      default: "rounded-full",
      secondary: "rounded-3xl",
      primary: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const buttonVariants = cva("flex-row items-center rounded-full", {
  variants: {
    variant: {
      default: "bg-primary/10",
      secondary: "bg-white/10 justify-center rounded-2xl",
      primary: "bg-white shadow-[0_4px_20px_-8px_rgba(255,255,255,0.4)]",
    },
    size: {
      default: "py-2 px-3 gap-1.5",
      medium: "py-2.5 px-3.5",
      large: "py-3.5 px-4.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const textVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-white font-medium uppercase",
      secondary: "text-white font-medium uppercase",
      primary: "text-primary font-medium uppercase",
    },
    size: {
      default: "text-sm",
      medium: "text-base",
      large: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  children,
  scaling = 1.15,
  ...props
}: Omit<React.ComponentProps<typeof Pressable>, "children"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    scaling?: number;
  }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const isSingle = React.Children.toArray(children).length === 1;

  return (
    <Pressable
      data-slot="button"
      onPressIn={() => (scale.value = withSpring(scaling, {mass: 0.75}))}
      onPressOut={() => (scale.value = withSpring(1))}
      className={cn(pressableVariants({variant}))}
      {...props}
    >
      <Animated.View
        style={animatedStyle}
        className={cn(
          "pointer-events-none",
          buttonVariants({variant, size, className}),
        )}
      >
        {React.Children.map(children, (child, i) => {
          if (typeof child === "string" && child.trim()) {
            return (
              <Text className={cn(textVariants({variant, size}))}>{child}</Text>
            );
          }

          return (
            <View className={cn("-mx-0.75", isSingle && "-mx-1")}>{child}</View>
          );
        })}
      </Animated.View>
    </Pressable>
  );
}

export {Button, pressableVariants, buttonVariants, textVariants};
