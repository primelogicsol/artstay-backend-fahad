import { z } from "zod";


export const artisanPackageCreationSchema = z.object({
    accountId: z.string(),
    title: z.string(),
    price: z.number(),
    duration: z.number(),
    features: z.string().array(),
    experience: z.string()
})

export const artisanPackageUpdationSchema = z.object({
    packageId: z.string(),
    title: z.string(),
    price: z.number(),
    duration: z.number(),
    features: z.string().array(),
    experience: z.string()
})