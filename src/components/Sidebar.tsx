//Sidebar.js
import React from 'react';
import { UseSiteContext } from '@/SiteContext/SiteContext'
//import { motion } from 'framer-motion';
//https://stackoverflow.com/questions/68372798/reactjs-showing-sidebar-menu-with-animation
//https://www.joshuawootonn.com/sidebar-animation-performance
//https://www.npmjs.com/package/framer-motion
export const Sidebar = () => {
  // State to manage the open/close state of the sidebar
 
const { open, sideBarToggle } = UseSiteContext();
  return (
   <div className="absolute top-0 right-0 z-40">
  
   {open?
   <div className='w-screen md:w-[400px] min-h-screen z-30 bg-[#B75A48] flex flex-col justify-start translate-full'>
    <div className='flex justify-end'>
 {/* <button onClick={()=>{sideBarToggle(!open)}} className='p-3 bg-red-200 rounded-xl m-3'>X</button> */}
</div>

   </div>:<></>
}
   </div>
  );
};

