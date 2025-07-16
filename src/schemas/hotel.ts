import { z } from "zod";



export const PropertyCreationSchema = z.object({
    name: z.string({ required_error: "Hotel name is required" }),
    address: z.string({ required_error: "Address is required" }),
    longitude: z.number({ required_error: "Longitude is required" }),
    latitude: z.number({ required_error: "Latitude is required" }),
    description: z.string({ required_error: "Description is required" }),
    firstName: z.string({ required_error: "First name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
    phone: z.string({ required_error: "Phone number is required" }),
    checkIn: z.string({ required_error: "Check-in time is required" }),
    checkOut: z.string({ required_error: "Check-out time is required" }),
    images: z.array(z.string()).min(1, "At least one hotel image is required"),
    accountId:z.string({required_error:"Account Id is required"})
})


export const PropertyUpdateSchema = z.object({
    hotelId: z.string({ required_error: "Hotel id is required" }),
    name: z.string({ required_error: "Hotel name is required" }),
    address: z.string({ required_error: "Address is required" }),
    longitude: z.string({ required_error: "Longitude is required" }),
    latitude: z.string({ required_error: "Latitude is required" }),
    description: z.string({ required_error: "Description is required" }),
    firstName: z.string({ required_error: "First name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
    phone: z.string({ required_error: "Phone number is required" }),
    checkIn: z.string({ required_error: "Check-in time is required" }),
    checkOut: z.string({ required_error: "Check-out time is required" }),
    images: z.array(z.string()).min(1, "At least one hotel image is required"),
})