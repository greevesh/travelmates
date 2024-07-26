import { Alert, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

import Username from '../inputs/Username'
import Password from '../inputs/password/Password'
import Error from '../Error'
import AuthScreenLink from '../AuthScreenLink'
import { SignInFormFields, signInSchema } from '../sign-up/form/schema'
import { signInEndpoint } from '../../../consts/api'
import SignInButton from './buttons/SignInButton'

export default function SignInForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormFields>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(signInSchema),
	})

	const onSubmit = async (data: SignInFormFields) => {
		try {
			const { username, password } = data
			const res = await axios.post(signInEndpoint, { username, password })
			const { accessToken, refreshToken } = res.data

			await SecureStore.setItemAsync('accessToken', accessToken)
			await SecureStore.setItemAsync('refreshToken', refreshToken)

			Alert.alert('User successfully signed in!')
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response) {
					if (err.response.status === 404) {
						Alert.alert('User does not exist')
					}
					if (err.response.status === 401) {
						Alert.alert('Incorrect password')
					}
				}
			}
			else {
				Alert.alert('There was an issue signing in')
			}
		}
	}

	return (
		<View style={{ marginTop: 20 }}>
			<Username control={control} />
			<Error msg={errors.username?.message} />
			<Password control={control} />
			<Error msg={errors.password?.message} />
			<AuthScreenLink text="Not a member?" />
			<SignInButton onPress={handleSubmit(onSubmit)} />
		</View>
	)
}