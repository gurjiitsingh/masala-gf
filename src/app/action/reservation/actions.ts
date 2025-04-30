"use server";


import { z } from "zod";
import { ReservationFormDataType, reservationSchema } from "../../../../types/ReservationFormData";
//const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const BASE_URL =  'http://localhost:3000';
export async function submitReservation(formData: FormData) {
  // Validate using Zod
  console.log("formData-------------", formData)
  const data: ReservationFormDataType = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    numberOfPersons: formData.get("numberOfPersons") as string,
    reservationDate: formData.get("reservationDate") as string,
    reservationTime: formData.get("reservationTime") as string,
    message: formData.get("message") as string || undefined,
  };

  const parsed = reservationSchema.safeParse(data);

  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Validation failed");
  }

  const validatedData = parsed.data;
  
  
  console.log("Reservation Data:", validatedData);


await sendReservationConfirmationEmail(data)





  return { success: true };
}







async function sendReservationConfirmationEmail(reservationData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfPersons: string;
    reservationDate: string;
    reservationTime: string;
    message?: string;
  }) {


const response = await fetch(`${BASE_URL}/api/book-table-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'gagurjiitsingh@gmail.com',
        subject: 'Reservation Confirmation',
        text: `
        <h3>New Reservation Details:</h3>
        <p><b>Name:</b> ${reservationData.firstName} ${reservationData.lastName}</p>
        <p><b>Email:</b> ${reservationData.email}</p>
        <p><b>Phone:</b> ${reservationData.phone}</p>
        <p><b>Number of Persons:</b> ${reservationData.numberOfPersons}</p>
        <p><b>Reservation Date:</b> ${reservationData.reservationDate}</p>
        <p><b>Reservation Time:</b> ${reservationData.reservationTime}</p>
        <p><b>Message:</b> ${reservationData.message || 'No message provided.'}</p>
      `,
      }),
    });
  
    console.log(await response.json());
  }