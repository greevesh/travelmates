import { z } from 'zod'

export const schema = z
	.object({
		username: z.string().min(3, 'Usernames must contain at least 3 characters')
			.regex(/^[a-zA-Z0-9]+$/, 'Usernames cannot contain a symbol'),
		password: z.string().min(8, 'Passwords must contain at least 8 characters')
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, 'Passwords need a letter, number, and symbol'),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'Passwords must match',
		path: ['passwordConfirmation'],
	})

export type FormFields = z.infer<typeof schema>