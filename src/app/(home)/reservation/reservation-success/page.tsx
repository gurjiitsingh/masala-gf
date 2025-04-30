import Link from "next/link";

export default function ReservationSuccessPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0fdf4] px-6 text-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full border border-green-200">
          <div className="text-green-600 text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Reservation Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-4">
            Thank you for your reservation. You will receive a confirmation email with the details.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }