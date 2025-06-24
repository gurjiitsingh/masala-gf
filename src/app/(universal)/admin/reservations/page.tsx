'use client';

import { useEffect, useState } from 'react';
import { getReservations } from '../../action/reservations/dbOperations';


interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  numberOfPersons: string;
  reservationDate: string;
  reservationTime: string;
  createdAt: string;
}

export default function ReservationListPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getReservations();
      setReservations(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = reservations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        📝 All Reservations ({reservations.length})
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : currentData.length === 0 ? (
        <p className="text-gray-500">No reservations found.</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded shadow-sm mb-4">
            <table className="w-full border text-sm text-left">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="py-2 px-3 border">#</th>
                  <th className="py-2 px-3 border">Name</th>
                  <th className="py-2 px-3 border">Email</th>
                  <th className="py-2 px-3 border">Phone</th>
                  <th className="py-2 px-3 border">Date</th>
                  <th className="py-2 px-3 border">Time</th>
                  <th className="py-2 px-3 border">Guests</th>
                  <th className="py-2 px-3 border">Message</th>
                  <th className="py-2 px-3 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((rsv, index) => (
                  <tr key={rsv.id} className="hover:bg-indigo-50">
                    <td className="py-2 px-3 border">{startIndex + index + 1}</td>
                    <td className="py-2 px-3 border">{rsv.firstName} {rsv.lastName}</td>
                    <td className="py-2 px-3 border">{rsv.email}</td>
                    <td className="py-2 px-3 border">{rsv.phone}</td>
                    <td className="py-2 px-3 border">{rsv.reservationDate}</td>
                    <td className="py-2 px-3 border">{rsv.reservationTime}</td>
                    <td className="py-2 px-3 border">{rsv.numberOfPersons}</td>
                    <td className="py-2 px-3 border">{rsv.message}</td>
                    <td className="py-2 px-3 border text-gray-500">
                      {new Date(rsv.createdAt).toLocaleString('de-DE', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
