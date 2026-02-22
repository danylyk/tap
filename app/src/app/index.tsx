import React from "react";
import {View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import Attempt from "@/modules/game-attempt";
import Exit from "@/modules/game-exit";
import Map from "@/modules/game-map";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";

export default function Page() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <View className="absolute inset-0 z-10">
          <Scene>
            <Player speed={10} />
            <Map />
          </Scene>
        </View>
        <View className="relative z-20 h-0">
          <View className="flex grow flex-row justify-between items-start m-6 h-0">
            <Attempt className="h-12" />
            <Exit className="h-12" />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
