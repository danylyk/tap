import {Link} from "expo-router";
import {Text, View} from "react-native";

export default function Page() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl">About</Text>
      <Link href="/" className="mt-4 text-blue-500 text-lg">
        Go to Home Page
      </Link>
    </View>
  );
}
