import { categoryType } from '@/lib/types/categoryType'
import { UseSiteContext } from '@/SiteContext/SiteContext'
import React, { useEffect } from 'react'

export default function CategoryList({category,pos}:{category:categoryType,pos:number}) {
const { productCategoryIdG, setProductCategoryIdG } = UseSiteContext();
//let productCategoryId = productCategoryIdG;
//console.log("acitve id --------",typeof(pos),pos)

// useEffect(()=>{
//   if(productCategoryIdG === ""){
//     if(pos===0){
//       productCategoryId = category.id;
//       setProductCategoryIdG(category.id)
//     }
  
//   }
// },[productCategoryIdG])

  return (
    <>
    <button onClick={()=>{setProductCategoryIdG(category.id)}}>
    {productCategoryIdG === category.id ?  <div className='flex items-start justify-center text-nowrap text-center px-2 py-1 bg-red-600 w-fit  rounded-2xl border-amber-400 text-white'>{category.name}</div>
  :
  <div className='flex items-start justify-center text-nowrap text-center px-2 py-1  w-fit text-slate-50 bg-slate-500 rounded-2xl border-amber-300 '>{category.name}</div>
}
  </button>

  
{/* bg-amber-300 */}

    </>  )
}
//bg-[#89AC46]