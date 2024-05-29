import { View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import SignInButton from '../sign-in/buttons/SignInButton'
import Username from '../inputs/Username'
import Password from '../inputs/password/Password'
import Error from '../Error'
import AuthScreenLink from '../AuthScreenLink'
import { FormFields, schema } from '../sign-up/form/schema'

export default function SignInForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit = (data: FormFields) => console.log(data)

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