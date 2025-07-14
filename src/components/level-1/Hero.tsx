'use client'

import HeroText from "@/components/level-2/HeroText";
import Title from "@/components/level-2/Title";
import SearchForm from "@/components/level-2/SearchForm";


export default function Hero() {
  return (
   <>
     <div className="flex flex-col md:flex-row md:justify-between">
              <div>
               <Title />
                <div className="flex items-center gap-2 w-full">
                  <SearchForm />
                </div>
              </div>
              <div>
                <HeroText />
              </div>
            </div>
   </>
  )
}
