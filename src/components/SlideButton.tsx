//import { UseSiteContext } from '@/SiteContext/SiteContext';
import { UseButtonContext } from '@/ButtonContext/ButtonContext';
import React, { useEffect, useState } from 'react'



export default function SlideButton({value,name,setTargetValue}:{value:string, name:string,setTargetValue:(e:string)=>void}) {
const [ on, setOn ] = useState<boolean>(false);
//const { paymentType, setPaymentType } = UseSiteContext();
const { discountType , setdiscountType} = UseButtonContext();
//const [valueL, setValue ] = useState<string>("");

useEffect(()=>{
    if(discountType !== value){
        setOn(false);
    }
},[discountType,on])

function clickHandler(){
  setdiscountType(value)
  setTargetValue(value)
     setOn(true)
}
  return (<div className='flex gap-3'>
    <div onClick={() => {clickHandler()
       }
             
        }>
    <div className=' w-[70px]   border-zinc-300 border-1 rounded-2xl '>
        <div className='w-full  rounded-2xl '>
        {!on ?
     <div className='w-full flex justify-start'>  <div className='w-4 h-4 bg-slate-300 rounded-2xl px-1 py-1'></div></div>
     :
     <div className='w-full flex justify-end'>   <div className='w-4 h-4 bg-green-500 rounded-2xl px-1 py-1'></div></div>
        }
    </div></div>
    </div>
<div className=''>{name}</div>
    </div>
  )
}


{/* <div className='mt-8 w-[100px] bg-slate-400 border border-zinc-500 rounded-3xl px-1 py-1'>
        <div className='w-full bg-slate-300 rounded-3xl shadow-2xl'>
        {!on ?
     <div className='w-full flex justify-start'>  <div className='w-5 h-5 bg-slate-400 rounded-3xl px-1 py-1'></div></div>
     :
     <div className='w-full flex justify-end'>   <div className='w-5 h-5 bg-slate-600 rounded-3xl px-1 py-1'></div></div>
        }
        </div> */}