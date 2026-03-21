import {ChevronRight, RotateCcw} from "lucide-react-native";
import {View} from "react-native";

import {Button} from "@/elements/primitives/button";
import useAccount from "@/elements/stores/useAccount";
import useEnvironment from "@/elements/stores/useEnvironment";
import {cn} from "@/lib/utils";

export default function Module({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const id = useEnvironment((state) => {
    return state.document.id;
  });

  const state = useEnvironment((state) => {
    return state.scene.state;
  });

  const done = useAccount((state) => {
    return state.attempts[id]?.done ?? false;
  });

  const setDocument = useEnvironment((state) => {
    return state.setDocument;
  });

  if (["stopped"].includes(state) === false) {
    return null;
  }

  return (
    <View
      className={cn("flex-row items-center justify-center gap-2", className)}
      {...props}
    >
      {done && (
        <Button
          className="px-5 gap-3"
          variant="primary"
          size="medium"
          onPress={() => {
            setDocument({
              id,
            });
          }}
        >
          Continue
          <ChevronRight className="w-5 h-5 -mr-1 text-white" strokeWidth={3} />
        </Button>
      )}
      {!done && (
        <Button
          className="px-5 gap-3.5"
          variant="primary"
          size="medium"
          onPress={() => {
            setDocument({
              id,
            });
          }}
        >
          Retry
          <RotateCcw
            className="w-4.5 h-4.5 -mr-0.5 text-white"
            strokeWidth={3}
          />
        </Button>
      )}
    </View>
  );
}
