import {Pressable} from "react-native";

import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module({
  ...props
}: React.ComponentProps<typeof Pressable>) {
  const {status, open} = useEnvironment();

  if (["none"].includes(status) === false) {
    return null;
  }

  return (
    <Pressable
      onPress={() => {
        open();
      }}
      {...props}
    />
  );
}
