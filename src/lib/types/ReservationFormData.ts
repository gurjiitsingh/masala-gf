import { z } from "zod";

export const reservationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  //numberOfPersons: z.enum(["1 Person", "2 Persons", "3 Persons", "4 Persons", "5+ Persons"]),
  numberOfPersons: z.string().min(1, "No of person needed"),
  reservationDate: z.string().min(1, "Reservation date is required"),
  reservationTime: z.string().min(1, "Reservation time is required"),
  message: z.string().optional(),
});

// Automatically create TypeScript type from schema
export type ReservationFormDataType = z.infer<typeof reservationSchema>;