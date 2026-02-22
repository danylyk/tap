import {X} from "lucide-react-native";
import {View} from "react-native";

import {Button} from "@/elements/primitives/button";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  return (
    <View {...props}>
      <Button
        size="medium"
        className="h-12"
        onPress={() => {
          console.log("Click");
        }}
      >
        <X size={28} />
      </Button>
    </View>
  );
}
