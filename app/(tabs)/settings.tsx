import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { useEffect, useRef } from 'react'
import { Icon } from 'react-native-paper'

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
        <TouchableOpacity style={styles.signOutBtn}>
          <View style={styles.signOutBtnContainer}>
            <Icon size={20} source="logout" color='#fff' />
            <Text style={styles.signOutText}>Sign out</Text>
          </View>
        </TouchableOpacity>
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
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 15,
  },
  signOutBtnContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  signOutText: {
    marginLeft: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 500
  },
})
