import axios, { AxiosError } from 'axios'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'

import { signInEndpoint, signUpEndpoint, signOutEndpoint } from '../consts/api'

interface Credentials {
    username: string
    password: string
}

export const authenticate = async (data: Credentials, endpoint: string) => {
	try {
		const { username, password } = data
		const res = await axios.post(endpoint, { username, password })
		endpoint === signInEndpoint ? router.push('/hub') : router.push('/setup')
		return res.data
	} catch (err) {
		if (err instanceof AxiosError && err.response) {
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
			Alert.alert('There was an issue authenticating')
		}
		throw err
	} 
}

export const storeAuthTokens = async (accessToken: string, refreshToken: string) => {
	try {
		await SecureStore.setItemAsync('accessToken', accessToken)
		await SecureStore.setItemAsync('refreshToken', refreshToken)
	}
	catch {
		Alert.alert('There was an issue authenticating')
	}
}

export const signOut = async (username: string | null, refreshToken: string | null) => {
	try {
		const res = await axios.post(signOutEndpoint, { username, refreshToken })
		console.log('res data: ', res.data)
		return res.data
	}
	catch (err) {
		if (err instanceof AxiosError) {
			console.error('Error in signOut:', err.response ? err.response.data : err.message)
		}
	}
}

export const removeAuthTokens = async () => {
	try {
		await SecureStore.deleteItemAsync('accessToken')
		await SecureStore.deleteItemAsync('refreshToken')
	}
	catch (err) {
		Alert.alert('There was an issue signing out')
		console.log('err', err)
		throw err
	}
}
