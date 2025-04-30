import ReservationForm from './components/ReservationForm';

export default function ReservationPage() {
  return (
    <main className=" min-h-screen bg-[#fadb5e] flex items-center justify-center p-6">
      <div className='container w-full md:w-[70%] lg:w-[60%] mx-auto'>
      <ReservationForm />
      </div> 
    </main>
  );
}