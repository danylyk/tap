import React, {ComponentProps} from "react";
import {View} from "react-native";

import {cn} from "@/lib/utils";

export function Group({className, ...props}: ComponentProps<typeof View>) {
  return (
    <View className={cn("p-2 rounded-3xl bg-white/10", className)} {...props} />
  );
}
