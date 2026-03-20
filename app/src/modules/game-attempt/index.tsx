import {Check} from "lucide-react-native";
import {Text, View} from "react-native";

import useAccount from "@/elements/stores/useAccount";
import useEnvironment from "@/elements/stores/useEnvironment";

import {Attempt} from "./components/attempt";
import {Progress} from "./components/progress";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  const id = useEnvironment((state) => {
    return state.document.id;
  });

  const done = useAccount((state) => {
    return state.attempts[id]?.done;
  });

  return (
    <View {...props}>
      <Text className="text-4xl font-bold text-primary">
        <Progress />
        <Text className="text-2xl">%</Text>
      </Text>
      <Text className="text-base text-primary/40">
        ATTEMPT <Attempt />
      </Text>

      {done && (
        <View className="p-1 bg-primary/10 w-7 h-7 flex items-center justify-center rounded-full mt-1">
          <Check size={16} />
        </View>
      )}
    </View>
  );
}
