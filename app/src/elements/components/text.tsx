import React from "react";
import {Text as Comp, type TextProps} from "react-native";

export function Text({style, ...props}: TextProps) {
  return (
    <Comp
      style={[
        {
          color: "#fff",
        },
        style,
      ]}
      {...props}
    />
  );
}
