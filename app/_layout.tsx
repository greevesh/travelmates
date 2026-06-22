import { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins'
import Navbar from '@/components/Navbar'
import SplashScreen from '@/components/SplashScreen'
import { View } from 'react-native'

ExpoSplashScreen.preventAutoHideAsync().catch(() => {})

const MIN_SPLASH_MS = 10_000

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  })

  useEffect(() => {
    ExpoSplashScreen.hideAsync().catch(() => {})
  }, [])

  useEffect(() => {
    if (!fontsLoaded) return

    const timer = setTimeout(() => setAppIsReady(true), MIN_SPLASH_MS)
    return () => clearTimeout(timer)
  }, [fontsLoaded])

  if (!appIsReady) {
    return <SplashScreen fontsLoaded={fontsLoaded} />
  }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1, zIndex: 99 }}>
      <Navbar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  )
}
