import React from "react";
import {Button, Image, View} from "react-native";

import useGameStore from "@/elements/stores/game";
import Helper from "@/modules/game-helper";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";
import placeholder from "@/public/assets/scene.png";

export default function Page() {
  const reset = useGameStore((state) => {
    return state.reset;
  });

  return (
    <View className="flex-1 justify-end">
      <Image
        source={placeholder}
        resizeMode="contain"
        className="absolute w-full"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <View className="absolute inset-0 z-10">
        <Scene>
          <Helper />
          <Player />
        </Scene>
      </View>
      <View className="relative z-20 p-10 bg-[rgba(0,0,0,0.2)]">
        <Button
          title="Stop"
          onPress={() => {
            reset();
          }}
        />
      </View>
    </View>
  );
}
