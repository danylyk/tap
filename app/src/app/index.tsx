import React from "react";
import {Image, View} from "react-native";

import Helper from "@/modules/game-helper";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";
import placeholder from "@/public/assets/scene.png";

export default function Page() {
  return (
    <View className="flex-1">
      <Image
        source={placeholder}
        resizeMode="contain"
        className="absolute w-full"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <View className="absolute inset-0">
        <Scene>
          <Helper />
          <Player />
        </Scene>
      </View>
    </View>
  );
}
