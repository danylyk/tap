import React, {useState} from "react";
import {Button, Text, View} from "react-native";

// import {Image} from "react-native";
import useScene from "@/elements/stores/scene";
import Debug from "@/modules/game-debug";
// import Helper from "@/modules/game-helper";
import Map from "@/modules/game-map";
import Player from "@/modules/game-player";
import Scene from "@/modules/game-scene";
// import placeholder from "@/public/assets/scene.png";

export default function Page() {
  const [fps, setFps] = useState(0);

  const status = useScene((state) => {
    return state.status;
  });

  const open = useScene((state) => {
    return state.open;
  });

  const close = useScene((state) => {
    return state.close;
  });

  const stop = useScene((state) => {
    return state.stop;
  });

  return (
    <View className="flex-1 justify-end">
      {/* <Image
        source={placeholder}
        resizeMode="contain"
        className="absolute w-full opacity-10"
        style={{
          width: "100%",
          height: "100%",
        }}
      /> */}
      <View className="absolute inset-0 z-10 bg-white">
        <Scene>
          {/* <Helper /> */}
          <Debug update={setFps} />
          <Player speed={10} />
          <Map />
        </Scene>
      </View>
      <View className="relative z-20 p-10 bg-[rgba(0,0,0,0.2)]">
        <Text className="mb-4 text-white">FPS: {fps}</Text>
        {status === "none" && (
          <Button
            title="Open"
            onPress={() => {
              open();
            }}
          />
        )}
        {(status === "starting" || status === "ending") && (
          <Button
            title="Close"
            onPress={() => {
              close();
            }}
          />
        )}
        {status === "playing" && (
          <Button
            title="Stop"
            onPress={() => {
              stop();
            }}
          />
        )}
      </View>
    </View>
  );
}
