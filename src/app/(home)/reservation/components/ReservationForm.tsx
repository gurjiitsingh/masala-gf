"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationFormDataType, reservationSchema } from "../../../../../types/ReservationFormData";
import { submitReservation } from "@/app/action/reservation/actions";
//import { reservationSchema, ReservationFormData } from "@/lib/reservationSchema";

export default function ReservationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormDataType>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormDataType) => {
    console.log(data);
    // You can call your Server Action or API here

    const formData = new FormData();

    formData.append("firstName", data.firstName); // value from input or state
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("numberOfPersons", data.numberOfPersons);
    formData.append("reservationDate", data.reservationDate);
    formData.append("reservationTime", data.reservationTime);
    formData.append("message", data.message || ""); // optional message field
    
    // Now call your server action or function
    await submitReservation(formData);


  
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-y-5 p-6 bg-gray-50 rounded-xl"
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#64870d] bg-[#fadb5e] p-4 rounded-xl text-center shadow">
        Reserve Your Table
      </h1>

      {/* Personal Information */}
      <div className="flex flex-col gap-3 bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-[#64870d]">Reserved by</h2>
        <div className="flex flex-col gap-2 my-2">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">First Name</label>
            <input {...register("firstName")} className="input-style2" placeholder="First Name" />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Last Name</label>
            <input {...register("lastName")} className="input-style2" placeholder="Last Name" />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input {...register("email")} className="input-style2" placeholder="Email Address" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Phone</label>
            <input {...register("phone")} className="input-style2" placeholder="Phone Number" />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="flex flex-col gap-3 bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-[#64870d]">Reservation Details</h2>
        <div className="flex flex-col gap-2 my-2">
          {/* Number of Persons */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Number of Persons</label>
            <select {...register("numberOfPersons")} className="input-style2">
              <option value="">Select...</option>
              <option value="1 Person">1 Person</option>
              <option value="2 Persons">2 Persons</option>
              <option value="3 Persons">3 Persons</option>
              <option value="4 Persons">4 Persons</option>
              <option value="5+ Persons">5+ Persons</option>
            </select>
            {errors.numberOfPersons && <span className="text-red-500 text-sm">{errors.numberOfPersons.message}</span>}
          </div>

          {/* Reservation Date */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Reservation Date</label>
            <input {...register("reservationDate")} type="date" className="input-style2" />
            {errors.reservationDate && <span className="text-red-500 text-sm">{errors.reservationDate.message}</span>}
          </div>

          {/* Reservation Time */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Reservation Time</label>
            <input {...register("reservationTime")} type="time" className="input-style2" />
            {errors.reservationTime && <span className="text-red-500 text-sm">{errors.reservationTime.message}</span>}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="flex flex-col gap-3 bg-white rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-[#64870d]">Additional Information</h2>
        <div className="flex flex-col gap-2 my-2">
          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Your Message (Optional)</label>
            <textarea {...register("message")} className="input-style2" placeholder="Any special requests?"></textarea>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#64870d] hover:bg-[#53700a] text-white font-bold py-3 rounded-lg shadow mt-4"
      >
        Submit Reservation
      </button>
    </form>
  );
}