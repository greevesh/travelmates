import { Alert } from "react-native"

export const handleError = (error: any, message: string) => {
  console.error(message, error)
  Alert.alert('Error', message)
}