import { StyleSheet, Animated, Text, View } from 'react-native'
import { useEffect, useRef } from 'react'
import SignOutButton from '@/components/auth/SignOutButton'
import UserInfo from '@/components/settings/UserInfo'

export default function Tab() {
  const slideAnim = useRef(new Animated.Value(1000)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
      <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
        <UserInfo />
        <View style={styles.spacer} />
        <SignOutButton />
      </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0047AB',
    height: '100%',
    width: '100%',
    zIndex: 99
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginTop: 60,
    marginLeft: 20,
  },
  spacer: {
    flex: 1,
  },
})
