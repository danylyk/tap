import {useEffect, useState} from "react";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

import useEnvironment from "@/elements/stores/useEnvironment";

export default function Module({
  ...props
}: React.ComponentProps<typeof Animated.View>) {
  const [enabled, setEnabled] = useState(false);

  const {r, g, b} = useEnvironment((state) => {
    return state.content.color;
  });

  const active = useEnvironment((state) => {
    return state.scene.loading;
  });

  useEffect(() => {
    setEnabled(true);
  }, []);

  if (!active) {
    return null;
  }

  return (
    <Animated.View
      {...props}
      entering={enabled ? FadeIn.duration(300) : undefined}
      exiting={FadeOut.duration(300)}
      className="absolute inset-0 z-25 pointer-events-none"
      style={{
        backgroundColor: `rgb(${r},${g},${b})`,
        transitionProperty: "backgroundColor",
        transitionDuration: "0.4s",
      }}
    />
  );
}
