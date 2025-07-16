import { z } from "zod";

export const languageCreationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profileName: z.string(),
  location: z.string(),
  description: z.string(),
  experience: z.string(),
  qualification: z.string(),
  languages: z.array(z.string()),
  specialization: z.array(z.string()),
  serviceMode: z.array(z.string()),
  certification: z.array(z.string()),
  availability: z.array(z.string()),
  hourlyRate: z.number(),
  minBookingHours: z.number(),
  maxBookingHours: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  profileImage: z.string(),
  portfolio: z.array(z.string()),
});

export const LanguageServiceUpdateSchema = languageCreationSchema.partial();
