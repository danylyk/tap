import React from "react";
import {Text, View} from "react-native";

export default function Page() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500 text-2xl font-black">Index</Text>
    </View>
  );
}
