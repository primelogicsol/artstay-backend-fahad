import { z } from 'zod'

export const AccountCreationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    accountType: z.string()
})

export const LoginSchema = z.object({
    email:z.string().email(),
    password:z.string()
})
