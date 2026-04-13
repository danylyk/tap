import "@/public/assets/global.css";

import {DarkTheme, ThemeProvider} from "@react-navigation/native";
import {Tabs} from "expo-router";
import {House, User} from "lucide-react-native";

import Navigation from "@/modules/navigation";

export default function Layout() {
  return (
    <ThemeProvider value={DarkTheme}>
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
    </ThemeProvider>
  );
}
