import { z } from 'zod'

export const CraftCreationSchema = z.object({
    craftName: z.string().min(2, 'Craft name can not be empty'),
})

export const CraftUpdateSchema = z.object({
    craftId: z.string().min(1,'Craft Id is required.'),
    craftName: z.string().min(2, 'Craft name can not be empty'),
})

export const SubCraftCreationSchema = z.object({
    subCraftName: z.string().min(2, 'Craft name can not be empty'),
    craftId: z.string().min(1,'Craft Id is required.')
})

export const SubCraftUpdateSchema = z.object({
    subCraftId: z.string().min(1,'SubCraft Id is required.'),
    subCraftName: z.string().min(2, 'SubCraft name can not be empty'),
})

