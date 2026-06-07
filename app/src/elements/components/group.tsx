import React, {ComponentProps} from "react";
import {View} from "react-native";

import {cn} from "@/lib/utils";

export function Group({className, ...props}: ComponentProps<typeof View>) {
  return (
    <View
      className={cn("px-2.5 py-1.25 rounded-3xl bg-white/10", className)}
      {...props}
    />
  );
}
