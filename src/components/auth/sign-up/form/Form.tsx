import { Alert, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'

import { signUpSchema, SignUpFormFields } from './schema'
import SignUpButton from '../buttons/SignUpButton'
import Username from '../../inputs/Username'
import Password from '../../inputs/password/Password'
import PasswordConfirmation from '../../inputs/password/PasswordConfirmation'
import Error from '../../Error'
import AuthScreenLink from '../../AuthScreenLink'
import { signUpEndpoint } from '../../../../consts/api'

export default function SignUpForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormFields>({
		defaultValues: {
			username: '',
			password: '',
			passwordConfirmation: '',
		},
		resolver: zodResolver(signUpSchema),
	})

	const onSubmit = async (data: SignUpFormFields) => {
		try {
			const { username, password } = data
			const res = await axios.post(signUpEndpoint, { username, password })
			const { accessToken, refreshToken } = res.data

			await SecureStore.setItemAsync('accessToken', accessToken)
			await SecureStore.setItemAsync('refreshToken', refreshToken)

			Alert.alert('User successfully signed up!')
		} catch (err) {
			if (err instanceof AxiosError) {
				if (err.response && err.response.status === 409) {
					Alert.alert('Username already exists')
				}
				else {
					Alert.alert('There was an issue signing up')
				}
			}
		}
	}

	return (
		<View>
			<Username control={control} />
			<Error msg={errors.username?.message} />
			<Password control={control} />
			<Error msg={errors.password?.message} />
			<PasswordConfirmation control={control} />
			<Error msg={errors.passwordConfirmation?.message} />
			<AuthScreenLink text="Already have an account?" />
			<SignUpButton onPress={handleSubmit(onSubmit)} />
		</View>
	)
}