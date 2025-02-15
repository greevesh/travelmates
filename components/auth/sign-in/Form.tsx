import { Alert, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as SecureStore from 'expo-secure-store'

import Username from '../inputs/Username'
import Password from '../inputs/password/Password'
import Error from '../Error'
import SignInButton from './buttons/SignInButton'
import { SignInFormFields, signInSchema } from '../sign-up/form/schema'
import { authenticate, storeAuthTokens } from '../../../utils/auth'
import { signInEndpoint } from '../../../consts/api'
import AuthLink from '../AuthLink'

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
			const { accessToken, refreshToken } = await authenticate(data, signInEndpoint)
			await SecureStore.setItemAsync('username', data.username)
			storeAuthTokens(accessToken, refreshToken)

			Alert.alert('User successfully signed in!')
		} catch {
			// error scenarios handled in authenticate()
			return
		}
	}

	return (
		<View style={{ marginTop: 55 }}>
			<Username control={control} />
			<Error msg={errors.username?.message} />
			<Password control={control} />
			<Error msg={errors.password?.message} />
			<AuthLink path='./signup' text='Not a member?' />
			<SignInButton onPress={handleSubmit(onSubmit)} />
		</View>
	)
}