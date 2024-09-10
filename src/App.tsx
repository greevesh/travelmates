import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import SetupScreen from './screens/SetupScreen'
import Navbar from './components/Navbar'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Navbar />
			<Stack.Navigator initialRouteName="Sign In" screenOptions={{
				contentStyle: { backgroundColor: 'white', marginTop: 20 },
				headerShown: false
			}}>
				<Stack.Screen name="Sign In" component={SignInScreen} />
				<Stack.Screen name="Sign Up" component={SignUpScreen} />
				<Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
				<Stack.Screen name="Setup" component={SetupScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
