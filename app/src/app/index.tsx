import React from "react";
import {View} from "react-native";

import {Body} from "@/elements/components/body";
import Attempt from "@/modules/game-attempt";
import Camera from "@/modules/game-camera";
import Content from "@/modules/game-content";
import Enter from "@/modules/game-enter";
import Exit from "@/modules/game-exit";
import Loader from "@/modules/game-loader";
import Marks from "@/modules/game-marks";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";
import Sections from "@/modules/game-sections";

export default function Page() {
  return (
    <Body>
      <Content>
        <View className="absolute inset-0 z-10">
          <Scene>
            <Camera />
            <Player />
            <Sections />
            <Marks />
          </Scene>
        </View>
        <Enter className="absolute inset-0 z-15" />
        <View className="relative z-20">
          <Attempt className="absolute left-6 top-6 select-none" />
        </View>
        <View className="relative z-30">
          <Exit className="absolute right-6 top-6 select-none" />
        </View>
      </Content>
      <Loader />
    </Body>
  );
}
