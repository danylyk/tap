import React from "react";
import {View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import Attempt from "@/modules/game-attempt";
import Camera from "@/modules/game-camera";
import Content from "@/modules/game-content";
import Enter from "@/modules/game-enter";
import Exit from "@/modules/game-exit";
import Map from "@/modules/game-map";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";

export default function Page() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Content id="6919d94f12f0c7f63e22afe87ef9fb51">
          <View className="absolute inset-0 z-10">
            <Scene>
              <Camera />
              <Player />
              <Map />
            </Scene>
          </View>
          <Enter className="absolute inset-0 z-15 bg-primary/10" />
          <View className="relative z-20 h-0">
            <View className="flex grow flex-row justify-between items-start m-6 h-0">
              <Attempt className="h-12" />
              <Exit className="h-18" />
            </View>
          </View>
        </Content>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
