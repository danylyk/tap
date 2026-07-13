import "@/public/assets/global.css";

import {DarkTheme, ThemeProvider} from "@react-navigation/native";
import {Tabs} from "expo-router";
import {House, User} from "lucide-react-native";
import {LogBox} from "react-native";

import Account from "@/modules/account";
import Navigation from "@/modules/navigation";

LogBox.ignoreLogs([
  "props.pointerEvents is deprecated",
  "Multiple instances of Three.js",
  "EXT_color_buffer_float extension not supported",
]);

export default function Layout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Account>
        <Navigation>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({color, size}) => {
                return <House color={color} size={size} />;
              },
            }}
          />
          <Tabs.Screen
            name="(account)"
            options={{
              title: "Account",
              headerShown: false,
              tabBarIcon: ({color, size}) => {
                return <User color={color} size={size} />;
              },
            }}
          />
        </Navigation>
      </Account>
    </ThemeProvider>
  );
}
