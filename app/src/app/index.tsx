import React from "react";
import {ImageBackground, View} from "react-native";

import Scene from "@/modules/game-scene";
import backgroundImage from "@/public/assets/scene.png";

export default function Page() {
  return (
    <View className="flex-1">
      <ImageBackground source={backgroundImage} className="flex-1">
        <Scene />
      </ImageBackground>
    </View>
  );
}
