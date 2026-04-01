import React from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export function Body({children}: {children: React.ReactNode}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#070B1E",
        }}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
