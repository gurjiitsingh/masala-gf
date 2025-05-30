import React from 'react'
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // only one weight
});

export default function HeroText() {
  return (
    <div>
         <h2 className={`${bebas.className} text-3xl w-full my-2 text-emerald-900`} >Abhol Rabatt 20%</h2>
         <div className='p-2 bg-amber-200 text-sky-600 font-semibold rounded-xl mb-2'>Lieferung ist ebenfalls verfügbar.</div>
                  <p className="text-sm text-slate-500">Das Essen kann vom Bild abweichen</p>
    </div>
  )
}
