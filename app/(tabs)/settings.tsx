import { StyleSheet, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import SignOutButton from '@/components/auth/SignOutButton'

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
        <SignOutButton />
      </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#0047AB',
    height: '100%',
    width: '100%',
    zIndex: 99
  },
})
