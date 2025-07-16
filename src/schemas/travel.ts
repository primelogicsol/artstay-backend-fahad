import { z } from "zod";



export const TravelTourCreationSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  duration: z.number(),
  isPricePerPerson: z.boolean(),
  maxGroupSize: z.number(),
  price: z.number(),
  languages: z.array(z.string()),
  features: z.array(z.string()),
  isActive: z.boolean(),
  accountId: z.string(),
});

export const TravelTourUpdateSchema = z.object({
  tourId: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  duration: z.number(),
  isPricePerPerson: z.boolean(),
  maxGroupSize: z.number(),
  price: z.number(),
  languages: z.array(z.string()),
  features: z.array(z.string()),
  isActive: z.boolean(),
});
