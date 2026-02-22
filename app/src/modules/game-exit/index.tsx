import {X} from "lucide-react-native";
import {View} from "react-native";

import {Button} from "@/elements/primitives/button";
import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module({...props}: React.ComponentProps<typeof View>) {
  const {status, close, exit} = useEnvironment();

  if (["started", "closed"].includes(status) === false) {
    return null;
  }

  return (
    <View {...props}>
      <Button
        size="medium"
        className="h-12"
        onPress={() => {
          if (status === "closed") {
            close();
            return;
          }

          exit();
        }}
      >
        <X size={28} />
      </Button>
    </View>
  );
}
