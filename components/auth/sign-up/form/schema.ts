import { z } from 'zod'

export const signUpSchema = z
	.object({
		username: z.string().min(3, 'Usernames must contain at least 3 characters')
			.max(13, 'Usernames must not be longer than 13 characters')
			.regex(/^[a-zA-Z0-9]+$/, 'Usernames cannot contain a symbol'),
		password: z.string().min(8, 'Passwords must contain at least 8 characters')
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, 'Passwords need a letter, number, and symbol'),
		passwordConfirmation: z.string().optional(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'Passwords must match',
		path: ['passwordConfirmation'],
	})

export const signInSchema = z.object({
	username: z.string().min(1, { message: 'Username cannot be empty' }),
	password: z.string().min(1, { message: 'Password cannot be empty' }),
})

export type SignUpFormFields = z.infer<typeof signUpSchema>
export type SignInFormFields = z.infer<typeof signInSchema>