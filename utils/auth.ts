import axios, { AxiosError } from 'axios'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import { refreshEndpoint, signInEndpoint, signUpEndpoint, signOutEndpoint } from '../consts/api'
import { handleError, RefreshTokenFailedError } from './errorHandler'
import { router } from 'expo-router'
import { useCurrentUserStore } from '@/stores/useCurrentUserStore'
import { useUsersStore } from '@/stores/useUsersStore'

interface Credentials {
    username: string
    password: string
}

export type AuthRequestHeaders = {
	'Content-Type': 'application/json'
	'Authorization': string
	'X-Username': string
}

export const authenticate = async (data: Credentials, endpoint: string) => {
	if (!data?.username?.trim() || !data?.password?.trim()) {
		throw new Error('Invalid credentials: username and password are required')
	}
	if (!endpoint) {
		throw new Error('Invalid endpoint provided')
	}
	try {
		const { username, password } = data
		const res = await axios.post(endpoint, { username, password }, {
			timeout: 10000
		})
		return res.data
	} catch (err) {
		if (err instanceof AxiosError) {
			// Network error - endpoint not reachable
			if (!err.response) {
				if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT') {
					Alert.alert(
						'Connection Error',
						'Unable to reach the server. Please check your internet connection and ensure the server is running.'
					)
				} else {
					Alert.alert(
						'Network Error',
						'Failed to connect to the server. Please check your internet connection and try again.'
					)
				}
				if (__DEV__) console.error('Error: ', 'Endpoints may not match. Please check server configuration.')
				throw err
			}

			// HTTP error responses
			if (endpoint === signInEndpoint) {
				switch (err.response.status) {
				case 404:
					Alert.alert('User does not exist')
					break
				case 401:
					Alert.alert('Incorrect password')
					break
				default:
					Alert.alert('Sign in failed')
					break
				}
			} else if (endpoint === signUpEndpoint) {
				if (err.response.status === 409) {
					Alert.alert('Username already exists')
				} else {
					Alert.alert('Sign up failed')
				}
			}
		} else {
			if (__DEV__) console.log('err: ', err)
			Alert.alert('There was an issue authenticating')
		}
		throw err
	} 
}

export const storeAuthTokens = async (accessToken: string, refreshToken: string) => {
	if (!accessToken?.trim() || !refreshToken?.trim()) {
		throw new Error('Invalid tokens: access token and refresh token are required')
	}
	try {
		await SecureStore.setItemAsync('accessToken', accessToken)
		await SecureStore.setItemAsync('refreshToken', refreshToken)
	}
	catch {
		Alert.alert('There was an issue authenticating')
	}
}

export const signOut = async (username: string | null, refreshToken: string | null) => {
	if (!username || !refreshToken) {
		throw new Error('Username and refresh token are required for sign out')
	}
	try {
		const res = await axios.post(signOutEndpoint, { username, refreshToken })
		return res.data
	}
	catch (err) {
		if (err instanceof AxiosError) {
			handleError(err, 'Sign out failed')
		}
	}
}

export const handleSignOut = async () => {
	const { refreshToken, accessToken } = await fetchUserCredentials()
	try {
		refreshToken && accessToken && await removeAuthTokens()
		useCurrentUserStore.getState().setUploaded(false)
		useCurrentUserStore.getState().setPhoto('')
		useCurrentUserStore.getState().setUsername('')
		useUsersStore.getState().setUsers([])
		router.push('/')
	}
	catch (err) {
		handleError(err, 'Failed to fully complete the sign out process. Please restart the app.')
		throw err
	}
}

export const fetchUserCredentials = async () => {
	try {
		const username = await SecureStore.getItemAsync('username')
		const refreshToken = await SecureStore.getItemAsync('refreshToken')
		const accessToken = await SecureStore.getItemAsync('accessToken')
		if (__DEV__) {
			console.log('username: ', username)
			console.log('refresh token: ', refreshToken)
		}
		return {
			username, refreshToken, accessToken
		}
	}
	catch (err) {
		handleError(err, 'Failed to fetch user credentials')
		throw err
	}
}

export const removeAuthTokens = async () => {
	try {
		await SecureStore.deleteItemAsync('accessToken')
		await SecureStore.deleteItemAsync('refreshToken')
	}
	catch (err) {
		handleError(err, 'There was an issue signing out')
		throw err
	}
}

export const getAuthContext = async () => {
	const { username, accessToken } = await fetchUserCredentials()
	if (!username || !accessToken) {
		throw new Error('Missing user credentials')
	}
	const headers: AuthRequestHeaders = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`,
		'X-Username': username || '',
	}
	return { username, accessToken, headers }
}

export const getAuthHeaders = async () => {
	const { headers } = await getAuthContext()
	return headers
}

export const refreshAccessToken = async () => {
	const { username, refreshToken } = await fetchUserCredentials()
	if (!username || !refreshToken) {
		throw new Error('Missing credentials required for token refresh')
	}

	try {
		const res = await axios.post(
			refreshEndpoint,
			{ username },
			{
				timeout: 10000,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${refreshToken}`,
				},
			}
		)
		const nextAccessToken = res?.data?.accessToken
		const nextRefreshToken = res?.data?.refreshToken
		if (!nextAccessToken) {
			throw new Error('Refresh endpoint did not return an access token')
		}

		await SecureStore.setItemAsync('accessToken', nextAccessToken)
		if (nextRefreshToken) {
			await SecureStore.setItemAsync('refreshToken', nextRefreshToken)
		}
		return nextAccessToken
	}
	catch (err) {
		if (__DEV__) console.error('Failed to refresh access token', err)
		throw err
	}
}

export const withAuthRetry = async (
	request: (headers: AuthRequestHeaders) => Promise<any>,
): Promise<any> => {
	try {
		return await request(await getAuthHeaders())
	}
	catch (err) {
		if (err instanceof AxiosError && (err.response?.status === 401 || err.response?.status === 403)) {
			try {
				await refreshAccessToken()
				return await request(await getAuthHeaders())
			}
			catch (err) {
				if (__DEV__) console.error('Token refresh failed', err)
				await handleSignOut()
				handleError(err, 'You have been signed out because of an authentication failure. Please try again.')
        		throw new RefreshTokenFailedError()
			}
		}
		throw err
	}
}
