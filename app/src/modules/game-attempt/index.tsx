import {useRef} from "react";
import {Text, View} from "react-native";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  const refScore = useRef<Text | null>(null);
  const refAttempt = useRef<Text | null>(null);

  return (
    <View {...props}>
      <Text className="text-4xl font-bold text-primary">
        <Text ref={refScore}>26</Text>
        <Text className="text-2xl">%</Text>
      </Text>
      <Text className="text-base text-primary/40">
        ATTEMPT <Text ref={refAttempt}>10</Text>
      </Text>
    </View>
  );
}
