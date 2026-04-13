import React from "react";
import {Text as Comp, type TextProps} from "react-native";

import {cn} from "@/lib/utils";

export function Text({className, ...props}: TextProps) {
  return <Comp className={cn("text-base text-white", className)} {...props} />;
}
