import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Sign In" screenOptions={{
				contentStyle: { backgroundColor: 'white', marginTop: 20 },
				headerShown: false
			}}>
				<Stack.Screen name="Sign In" component={SignInScreen} />
				<Stack.Screen name="Sign Up" component={SignUpScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
