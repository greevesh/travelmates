import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0047AB', headerShown: false }}>
      <Tabs.Screen
        name="hub"
        options={{
          title: 'Hub',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  )
}
