import { z } from 'zod'

export const schema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8, 'Passwords must contain at least 8 characters')
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, 'Passwords need a letter, number, and symbol'),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'Passwords must match',
		path: ['passwordConfirmation'],
	})

export type FormFields = z.infer<typeof schema>