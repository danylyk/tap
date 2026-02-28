import React from "react";
import {View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import Attempt from "@/modules/game-attempt";
import Camera from "@/modules/game-camera";
import Content from "@/modules/game-content";
import Enter from "@/modules/game-enter";
import Exit from "@/modules/game-exit";
import Marks from "@/modules/game-marks";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";
import Sections from "@/modules/game-sections";

export default function Page() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Content id="6919d94f12f0c7f63e22afe87ef9fb51">
          <View className="absolute inset-0 z-10">
            <Scene>
              <Camera />
              <Player />
              <Sections />
              <Marks />
            </Scene>
          </View>
          <Enter className="absolute inset-0 z-15 bg-primary/10" />
          <Attempt className="absolute left-6 top-6 z-20 select-none" />
          <Exit className="absolute right-6 top-6 z-20 select-none" />
        </Content>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
