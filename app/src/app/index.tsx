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
import Level from "@/modules/game-level";
import Loader from "@/modules/game-loader";
import Marks from "@/modules/game-marks";
import Pause from "@/modules/game-pause";
import Player from "@/modules/game-player";
import Restart from "@/modules/game-restart";
import Scene from "@/modules/game-scene";
import Score from "@/modules/game-score";
import Sections from "@/modules/game-sections";
import Vignette from "@/modules/game-vignette";

export default function Page() {
  return (
    <Body
      noHeader
      noFooter
      style={{
        gap: 0,
      }}
    >
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

        <View className="relative z-10">
          <View className="absolute -bottom-1 -left-100 -right-100 h-100 z-10" />
        </View>

        <View className="absolute left-0 top-0 bottom-0 w-4 z-10" />
        <View className="absolute right-0 top-0 bottom-0 w-4 z-10" />

        <View className="relative z-20">
          <Attempt className="absolute left-3 top-3 select-none" />
        </View>
        <View className="relative z-30">
          <Exit className="absolute right-3 top-3 select-none" />
        </View>
        <View className="relative z-25 mt-auto">
          <Continue className="absolute right-3 bottom-3 select-none" />
        </View>
        <View className="relative z-25">
          <Restart className="absolute left-3 bottom-3 select-none" />
        </View>

        <View className="relative z-10">
          <View className="absolute -top-1 -left-100 -right-100 h-100 z-10" />
        </View>
      </Content>
      <Loader />
      <Pause />
      <Frame />
      <Level />
      <Vignette />
    </Body>
  );
}
