import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useHeaderHeight} from "@react-navigation/elements";
import React, {ComponentProps} from "react";
import {Platform} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export function Body({
  children,
  noHeader,
  noFooter,
  style,
  ...props
}: {
  children: React.ReactNode;
  noHeader?: boolean;
  noFooter?: boolean;
} & ComponentProps<typeof SafeAreaView>) {
  const top = useHeaderHeight();
  const bottom = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        {...props}
        style={[
          style,
          {
            flex: 1,
            gap: 12,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: noHeader
              ? 16
              : Platform.select({
                  web: top + 16,
                  default: 16,
                }),
            paddingBottom: noFooter ? 16 : bottom - insets.bottom + 16,
          },
        ]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
