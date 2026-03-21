import {Text, View} from "react-native";

import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  if (["stopped"].includes(state) === false) {
    return null;
  }

  return (
    <View
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      <View className="w-full px-6 py-3 bg-primary">
        <Text className="text-white text-base font-bold uppercase text-center">
          10 coins collected
        </Text>
      </View>
      <View className="w-full px-6 py-3 bg-primary">
        <Text className="text-white text-base font-bold uppercase text-center">
          Game Paused
        </Text>
      </View>
    </View>
  );
}
