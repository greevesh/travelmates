import { Alert } from "react-native"

export class RefreshTokenFailedError extends Error {
  constructor() {
    super('RefreshTokenFailed')
    this.name = 'RefreshTokenFailed'
  }
}

export const handleError = (error: any, message: string) => {
  console.error(message, error)
  Alert.alert('Error', message)
}

const isRefreshFailure = (err: unknown) =>
  err instanceof Error && err.name === 'RefreshTokenFailed'

export const handleApiError = (err: unknown, message: string) => {
  if (isRefreshFailure(err)) return
  handleError(err, message)
}