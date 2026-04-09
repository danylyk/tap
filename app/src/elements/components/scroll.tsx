import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useHeaderHeight} from "@react-navigation/elements";
import {ScrollView, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export function Scroll({...props}: React.ComponentProps<typeof ScrollView>) {
  const header = useHeaderHeight();
  const footer = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      {...props}
      style={{
        flex: 1,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          minHeight: "100%",
          paddingTop: header - insets.top + 20,
          paddingBottom: footer - insets.bottom + 20,
          paddingRight: 20,
          paddingLeft: 20,
          backgroundColor: "rgba(0, 0, 0, 0.01)",
        }}
      >
        {props.children}
      </View>
    </ScrollView>
  );
}
