import {Pause} from "lucide-react-native";
import {View} from "react-native";

import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  const isPaused = useEnvironment((state) => {
    return state.scene.state === "paused";
  });

  if (!isPaused) {
    return null;
  }

  return (
    <View
      {...props}
      className="absolute inset-0 z-30 color-primary bg-primary/10 flex items-center justify-center pointer-events-none"
    >
      <Pause size={128} fill="currentColor" opacity={0.35} />
    </View>
  );
}
