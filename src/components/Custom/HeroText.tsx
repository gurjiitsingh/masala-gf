import React from 'react'
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // only one weight
});

export default function HeroText() {
  return (
    <div>
         <h2 className={`${bebas.className} text-3xl w-full my-4 text-emerald-900`} >Abhol Rabatt 20%</h2>
                  <p className="text-sm text-slate-500">Das Essen kann vom Bild abweichen</p>
    </div>
  )
}
