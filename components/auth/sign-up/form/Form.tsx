import { View } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, FormFields } from './schema'
import AlreadyHaveAccount from '../already-have-account/AlreadyHaveAccount'
import SignUpButton from '../buttons/traditional/SignUpButton'
import Email from '../inputs/email/Email'
import Password from '../inputs/password/Password'
import PasswordConfirmation from '../inputs/password/password-confirmation/PasswordConfirmation'
import Error from '../../errors/Error'

export default function SignUpForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirmation: '',
		},
		resolver: zodResolver(schema),
	})

	const onSubmit = (data: FormFields) => console.log(data)

	return (
		<View>
			<Email control={control} />
			<Error msg={errors.email?.message} />
			<Password control={control} />
			<Error msg={errors.password?.message} />
			<PasswordConfirmation control={control} />
			<Error msg={errors.passwordConfirmation?.message} />
			<AlreadyHaveAccount />
			<SignUpButton onPress={handleSubmit(onSubmit)} />
		</View>
	)
}