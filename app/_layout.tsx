import Navbar from "@/components/Navbar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
