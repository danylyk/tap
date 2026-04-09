/* eslint-disable react-hooks/exhaustive-deps */
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useEffect} from "react";
import {useWindowDimensions, View} from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Svg, {Path} from "react-native-svg";

import useEnvironment from "@/elements/stores/useEnvironment";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Module({
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const {width, height} = useWindowDimensions();

  const isClosed = useEnvironment((state) => {
    return state.scene.state === "closed";
  });

  const isStarted = useEnvironment((state) => {
    return state.scene.state === "started";
  });

  const defaultTop = Math.max(insets.top, 16) + 4;
  const defaultBottom = Math.max(tabBarHeight + 16, 16) + 4;
  const defaultLeft = Math.max(insets.left, 16) + 4;
  const defaultRight = Math.max(insets.right, 16) + 4;

  const x = useSharedValue(defaultLeft);
  const y = useSharedValue(defaultTop);
  const w = useSharedValue(width - defaultLeft - defaultRight);
  const h = useSharedValue(height - defaultTop - defaultBottom);
  const r = useSharedValue(28);

  useEffect(() => {
    const config = {
      easing: Easing.bezier(0, 0.25, 0.25, 1),
      duration: 400,
    };

    if (isClosed) {
      x.value = withTiming(defaultLeft, config);
      y.value = withTiming(defaultTop, config);
      w.value = withTiming(width - defaultLeft - defaultRight, config);
      h.value = withTiming(height - defaultTop - defaultBottom, config);
      r.value = withTiming(28, config);
    } else {
      x.value = withTiming(0, config);
      y.value = withTiming(0, config);
      w.value = withTiming(width, config);
      h.value = withTiming(height, config);
      r.value = withTiming(0, config);
    }
  }, [
    isClosed,
    defaultLeft,
    defaultTop,
    defaultRight,
    defaultBottom,
    x,
    y,
    w,
    h,
    r,
  ]);

  useEffect(() => {
    if (isClosed) {
      w.value = width - defaultLeft - defaultRight;
      h.value = height - defaultTop - defaultBottom;
    } else {
      w.value = width;
      h.value = height;
    }
  }, [
    defaultLeft,
    defaultTop,
    defaultRight,
    defaultBottom,
    width,
    height,
    x,
    y,
    w,
    h,
    r,
  ]);

  const outerRect = `M 0 0 H ${width} V ${height} H 0 Z`;

  const animatedProps = useAnimatedProps(() => {
    const cx = x.value;
    const cy = y.value;
    const cw = w.value;
    const ch = h.value;
    const cr = r.value;

    const inner = [
      `M ${cx + cr} ${cy}`,
      `H ${cx + cw - cr}`,
      `A ${cr} ${cr} 0 0 1 ${cx + cw} ${cy + cr}`,
      `V ${cy + ch - cr}`,
      `A ${cr} ${cr} 0 0 1 ${cx + cw - cr} ${cy + ch}`,
      `H ${cx + cr}`,
      `A ${cr} ${cr} 0 0 1 ${cx} ${cy + ch - cr}`,
      `V ${cy + cr}`,
      `A ${cr} ${cr} 0 0 1 ${cx + cr} ${cy}`,
      "Z",
    ].join(" ");

    return {d: `${outerRect} ${inner}`};
  });

  if (isStarted) {
    return null;
  }

  return (
    <View {...props} className="absolute z-50 pointer-events-none">
      <Svg
        width={width}
        height={height}
        style={{
          position: "absolute",
        }}
      >
        <AnimatedPath
          animatedProps={animatedProps}
          fill="#000000"
          fillRule="evenodd"
          strokeWidth={1}
          stroke="rgba(255, 255, 255, 0.1)"
        />
      </Svg>

      {children}
    </View>
  );
}
