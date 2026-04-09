import {BlurView} from "expo-blur";
import {Tabs} from "expo-router";
import React from "react";
import {StyleSheet} from "react-native";

import {Bar} from "./components/bar";

export default function Module({
  children,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs
      {...props}
      screenOptions={{
        tabBarStyle: {
          minHeight: 54,
          paddingTop: 4,
          backgroundColor: "transparent",
          borderTopColor: "rgba(255, 255, 255, 0.15)",
        },
        headerTransparent: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="systemChromeMaterialDark"
            style={StyleSheet.absoluteFill}
          />
        ),
        headerBackground: () => (
          <BlurView
            intensity={80}
            tint="systemChromeMaterialDark"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
      tabBar={(tabBarProps) => {
        return <Bar {...tabBarProps} />;
      }}
    >
      {children}
    </Tabs>
  );
}
