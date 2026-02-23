import {X} from "lucide-react-native";
import {View} from "react-native";

import {Button} from "@/elements/primitives/button";
import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const {status, open, close} = useEnvironment();

  if (["opened", "stopped"].includes(status) === false) {
    return null;
  }

  return (
    <View
      className={cn("-m-3 p-3 bg-white/1 rounded-full", className)}
      {...props}
    >
      <Button
        size="medium"
        onPress={() => {
          if (status === "stopped") {
            open();
            return;
          }

          close();
        }}
      >
        <X size={28} />
      </Button>
    </View>
  );
}
