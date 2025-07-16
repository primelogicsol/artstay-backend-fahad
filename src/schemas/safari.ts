import { z } from "zod"


export const SafariTourSchema = z.object({
    title: z.string(),
    duration: z.string(),
    fee: z.number(),
    operator: z.string(),
    description: z.string(),
    features: z.string().array(),
    accountId: z.string()
})