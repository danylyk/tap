import React from "react";
import {View} from "react-native";

import {Body} from "@/elements/components/body";
import Attempt from "@/modules/game-attempt";
import Camera from "@/modules/game-camera";
import Content from "@/modules/game-content";
import Continue from "@/modules/game-continue";
import Enter from "@/modules/game-enter";
import Exit from "@/modules/game-exit";
import Frame from "@/modules/game-frame";
import Loader from "@/modules/game-loader";
import Marks from "@/modules/game-marks";
import Pause from "@/modules/game-pause";
import Player from "@/modules/game-player";
import Restart from "@/modules/game-restart";
import Scene from "@/modules/game-scene";
import Score from "@/modules/game-score";
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
        <Score className="absolute inset-0 z-25" />
        <Enter className="absolute inset-0 z-15" />
        <View className="relative z-20">
          <Attempt className="absolute left-6 top-6 select-none" />
        </View>
        <View className="relative z-30">
          <Exit className="absolute right-6 top-6 select-none" />
        </View>
        <View className="relative z-25 mt-auto">
          <Continue className="absolute right-6 bottom-6 select-none" />
        </View>
        <View className="relative z-25">
          <Restart className="absolute left-6 bottom-6 select-none" />
        </View>
      </Content>
      <Loader />
      <Pause />
      <Frame />
    </Body>
  );
}
