import { Stack } from "expo-router"
import Navbar from "@/components/Navbar"
import { View } from "react-native"

export default function RootLayout() {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, zIndex: 99 }}>
      <Navbar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  )
}
