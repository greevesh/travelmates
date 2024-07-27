import axios, { AxiosError } from 'axios'
import { Alert } from 'react-native'

import { signInEndpoint, signUpEndpoint } from '../../consts/api'

interface Credentials {
    username: string
    password: string
}

const authenticate = async (data: Credentials, endpoint: string) => {
	try {
		const { username, password } = data
		const res = await axios.post(endpoint, { username, password })
		return res.data
	} catch (err) {
		if (err instanceof AxiosError) {
			if (err.response && endpoint === signInEndpoint) {
				if (err.response.status === 404) {
					Alert.alert('User does not exist')
				}
				if (err.response.status === 401) {
					Alert.alert('Incorrect password')
				}
			}
			else if (err.response && endpoint === signUpEndpoint) {
				if (err.response && err.response.status === 409) {
					Alert.alert('Username already exists')
				}
			}
		}
		else {
			Alert.alert('There was an issue authenticating')
		}
	}
}

export default authenticate