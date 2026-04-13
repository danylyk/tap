import React, {ComponentProps} from "react";
import {View} from "react-native";

import {Text} from "@/elements/primitives/text";
import {cn} from "@/lib/utils";

export function Title({className, ...props}: ComponentProps<typeof Text>) {
  return (
    <View className="px-4 pt-4">
      <Text
        className={cn("leading-4 uppercase text-sm opacity-40", className)}
        {...props}
      />
    </View>
  );
}
