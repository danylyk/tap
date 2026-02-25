import {Text, View} from "react-native";

import {Progress} from "./components/progress";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  return (
    <View {...props}>
      <Text className="text-4xl font-bold text-primary">
        <Progress />
        <Text className="text-2xl">%</Text>
      </Text>
      <Text className="text-base text-primary/40">
        ATTEMPT <Text>1</Text>
      </Text>
    </View>
  );
}
