import {Tabs} from "expo-router";
import React from "react";

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
        },
      }}
      tabBar={(tabBarProps) => {
        return <Bar {...tabBarProps} />;
      }}
    >
      {children}
    </Tabs>
  );
}
