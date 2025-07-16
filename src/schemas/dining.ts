import { z } from "zod";


export const createMenuItemSchema = z.object({
    menuItem: z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
        isVegetarian: z.boolean(),
        isVegan: z.boolean(),
        isGlutenFree: z.boolean(),
        spicyLevel: z.number(),
        image: z.string(),
        accountId: z.string(),

    })
})

export const updateMenuItemSchema = z.object({
    menuItem: z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
        isVegetarian: z.boolean(),
        isVegan: z.boolean(),
        isGlutenFree: z.boolean(),
        spicyLevel: z.number(),
        image: z.string(),
    })
})


    
