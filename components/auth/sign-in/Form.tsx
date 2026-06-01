import { View } from 'react-native'
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
import Spinner from '@/components/base/Spinner'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { useCurrentUserStore } from '@/stores/useProfilePhotoStore'
import fetchCurrentUser from '@/utils/fetchCurrentUser'
import { useTableStore } from '@/stores/useTableStore'
import { DEV_CREDENTIALS, DEV_META } from '@/consts/env'

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
	const [isLoading, setIsLoading] = useState(false)
	const { setUsername, setUploaded, setPhoto } = useCurrentUserStore((state) => ({
		setUsername: state.setUsername,
		setUploaded: state.setUploaded,
		setPhoto: state.setPhoto,
	}))

	const addFriend = useTableStore((s) => s.addFriend)

	const onSubmit = async (data: SignInFormFields) => {
		try {
			setIsLoading(true)
			const { accessToken, refreshToken } = await authenticate(data, signInEndpoint)
			await SecureStore.setItemAsync('username', data.username)
			await storeAuthTokens(accessToken, refreshToken)
			try {
				const { username, pic } = await fetchCurrentUser()
				setUsername(username)
				if (pic) {
					setUploaded(true)
					setPhoto(pic)
				}
			}
			catch (err) {
				console.error('Error setting photo: ', err)
			}
			router.push('/hub')
		} catch {
			// error scenarios handled in authenticate()
			return
		}
		finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (__DEV__) {
			onSubmit(DEV_CREDENTIALS)
			addFriend(DEV_META)
		}
	}, [])

	return (
		<View style={{ marginTop: 55 }}>
			<Username control={control} />
			<Error msg={errors.username?.message} />
			<Password control={control} />
			<Error msg={errors.password?.message} />
			<AuthLink path='./signup' text='Not a member?' />
			<SignInButton onPress={handleSubmit(onSubmit)} >
				{isLoading && <Spinner />}
			</SignInButton>
		</View>
	)
}