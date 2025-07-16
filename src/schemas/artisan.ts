import { z } from "zod";

export const artisanByAccount = z.object({
  accountId: z.string(),
});

export const artisanUpdatePortfolioSchema = z.object({
  images: z.string().array(),
  accountId: z.string(),
});

export const artisanStatusUpdateSchema = z.object({
  images: z.string().array(),
  accountId: z.string(),
});

export const createArtisanBookingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  additionalNote: z.string(),
  startDate: z.string(),
  endDate: z.string(),

  amount: z.number(),
  artisanId: z.string(),
  packageId: z.string(),
});
