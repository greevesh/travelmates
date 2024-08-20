import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { signUpSchema, SignUpFormFields } from './schema'
import SignUpButton from '../buttons/SignUpButton'
import Username from '../../inputs/Username'
import Password from '../../inputs/password/Password'
import PasswordConfirmation from '../../inputs/password/PasswordConfirmation'
import Error from '../../Error'
import AuthScreenLink from '../../AuthScreenLink'
import { signUpEndpoint } from '../../../../consts/api'
import{ authenticate, storeAuthTokens } from '../../../../utils/auth'
import { SetupScreenNavProp } from '../../../../types'
import Spinner from '../../../Spinner'
import { useAuthStore } from '../../../../stores/useAuthStore'

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
		mode: 'onChange'
	})
	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<SetupScreenNavProp>()

	const onSubmit = async (data: SignUpFormFields) => {
		try {
			setIsLoading(true)
			const { accessToken, refreshToken } = await authenticate(data, signUpEndpoint)
			storeAuthTokens(accessToken, refreshToken)

			useAuthStore.getState().setIsSignedIn(true)
			navigation.navigate('Setup')
		} catch {
			// error scenarios handled in authenticate()
			return
		}
		finally {
			setIsLoading(false)
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
			<SignUpButton onPress={handleSubmit(onSubmit)}>
				{isLoading && <Spinner />}
			</SignUpButton>
		</View>
	)
}