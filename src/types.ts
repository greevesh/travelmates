import { NavigationProp } from '@react-navigation/native'

interface RootStackParamList {
    'Sign Up': unknown
    'Sign In': unknown
    'Forgot Password': unknown
    'Setup': unknown
}
  
export type SignUpScreenNavProp = NavigationProp<RootStackParamList, 'Sign Up'>
export type SignInScreenNavProp = NavigationProp<RootStackParamList, 'Sign In'>
export type ForgotPasswordScreenNavProp = NavigationProp<RootStackParamList, 'Forgot Password'>
export type SetupScreenNavProp = NavigationProp<RootStackParamList, 'Setup'>