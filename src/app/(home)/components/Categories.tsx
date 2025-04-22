import { fetchCategories } from '@/app/action/category/dbOperations';
import { categoryType } from '@/lib/types/categoryType';
import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import { UseSiteContext } from '@/SiteContext/SiteContext';


export default function Categories() {
  const { productCategoryIdG } = UseSiteContext();

    const [categoryData, setCategoryData] = useState<categoryType[]>([]);
      useEffect(() => {
        async function fetchcate() {
          try {
          
          const categories = await fetchCategories()
          categories.sort((a, b) => a.sortOrder! - b.sortOrder!);
            setCategoryData(categories);
          } catch (error) {
            console.log(error);
          }
        }
        fetchcate();
        
      }, []);

  return (
   <div className='flex flex-wrap py-2 gap-2 -mt-12 md:mt-0 rounded-2xl justify-between  w-full'>
    {productCategoryIdG===""&&<div className='flex items-center'><div className='flex items-start justify-center text-nowrap text-center px-2 py-1 bg-red-600 w-fit h-fit  rounded-2xl border-amber-400 text-white'>All</div></div>}
    {categoryData.map((category,i) => {
                return <CategoryList key={category.name} pos={i} category={category} />;
              })}
   
   </div>
  )
}
