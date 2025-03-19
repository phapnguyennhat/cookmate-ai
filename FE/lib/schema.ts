import {z} from 'zod'


export const loginSchema = z.object({
    account: z.string({message: 'Account is required'}).min(1, 'Account is required'),
    password: z.string({message: 'Password is required'}).min(1, 'Password is required'),
});

export type LoginForm = z.infer<typeof loginSchema>;