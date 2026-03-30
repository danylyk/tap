import "@/public/assets/global.css";

import {Tabs} from "expo-router";
import {House, User} from "lucide-react-native";

import Navigation from "@/modules/navigation";

export default function Layout() {
  return (
    <Navigation>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({color, size}) => {
            return <House color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({color, size}) => {
            return <User color={color} size={size} />;
          },
        }}
      />
    </Navigation>
  );
}
