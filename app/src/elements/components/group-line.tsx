import React from "react";
import {View} from "react-native";

import {cn} from "@/lib/utils";

export function GroupLine({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn("border-t border-white/5 mx-2 my-2", className)}
      {...props}
    />
  );
}
