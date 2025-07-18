// src/actions/reservationsActions.ts
import { db } from '@/lib/firebaseConfig';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

export interface Reservation {
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

export async function getReservations(): Promise<Reservation[]> {
  const snapshot = await getDocs(query(collection(db, 'reservations'), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      message: data.message || '',
      numberOfPersons: data.numberOfPersons || '',
      reservationDate: data.reservationDate || '',
      reservationTime: data.reservationTime || '',
      createdAt: data.createdAt || '',
    };
  });
}


export async function deleteReservation(id: string): Promise<void> {
  const reservationRef = doc(db, 'reservations', id);
  await deleteDoc(reservationRef);
}