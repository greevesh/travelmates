import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import * as SecureStore from 'expo-secure-store'

import { signUpSchema, SignUpFormFields } from './schema'
import SignUpButton from '../buttons/SignUpButton'
import Username from '../../inputs/Username'
import Password from '../../inputs/password/Password'
import PasswordConfirmation from '../../inputs/password/PasswordConfirmation'
import Error from '../../Error'
import { signUpEndpoint } from '../../../../consts/api'
import{ authenticate, storeAuthTokens } from '../../../../utils/auth'
import AuthLink from '@/components/auth/AuthLink'
import Spinner from '@/components/base/Spinner'
import { router } from 'expo-router'
import { handleError } from '@/utils/errorHandler'

export default function SignUpForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset
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

	const onSubmit = async (data: SignUpFormFields) => {
		try {
			setIsLoading(true)
			const { accessToken, refreshToken } = await authenticate(data, signUpEndpoint)
			await SecureStore.setItemAsync('username', data.username)
			await storeAuthTokens(accessToken, refreshToken)

			reset()
			router.push('/hub')
		} catch (err) {
			handleError(err, 'Error signing up. Please try again.')
		}
		finally {
			setIsLoading(false)
		}
	}

	return (
		<View style={{ marginTop: 55 }}>
			<Username control={control} />
			<Error msg={errors.username?.message} />
			<Password control={control} />
			<Error msg={errors.password?.message} />
			<PasswordConfirmation control={control} />
			<Error msg={errors.passwordConfirmation?.message} />
			<AuthLink path='./' text='Already have an account?' />
			<SignUpButton onPress={handleSubmit(onSubmit)}>
				{isLoading && <Spinner style={{ right: 15 }} color='#fff' />}
			</SignUpButton>
		</View>
	)
}