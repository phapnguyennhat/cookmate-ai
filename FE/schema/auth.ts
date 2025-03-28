import {z} from 'zod'


export const loginSchema = z.object({
    account: z.string({message: 'Account is required'}).min(1, 'Account is required'),
    password: z.string({message: 'Password is required'}).min(1, 'Password is required'),
});

export type LoginForm = z.infer<typeof loginSchema>;


export const registerSchema = z
	.object({
		username: z
			.string({ message: 'Username is require' })
			.min(3, 'Username must be at least 3 characters long')
			.max(50),
		name: z
			.string({ message: 'Name is required' })
			.min(3, 'Username must be at least 3 characters long')
			.max(50),
		email: z
			.string({ message: 'Email is required' })
			.email('Email is invalid')
			.max(50),
		password: z
			.string({ message: 'Password is required' })
			.min(8, 'Password must be at least 8 characters long')
			.max(50),
		confirmPassword: z
			.string({message: 'Confirm Password is required'})
			.min(8, 'The password must be at least 8 characters long.')
			.max(50),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Confirm password must match password',
		path: ['confirmPassword'], // Chỉ định lỗi hiển thị cho trường confirmPassword
	});

export type RegisterForm = z.infer<typeof registerSchema>

