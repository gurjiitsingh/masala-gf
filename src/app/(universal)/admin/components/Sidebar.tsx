'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState, JSX } from 'react';

import { GoHome } from 'react-icons/go';
import {
  MdDashboard,
  MdCategory,
  MdLocalOffer,
  MdInventory,
  MdRestaurantMenu,
  MdSettings,
  MdOutlineCrisisAlert,
  MdOutlineBackup,
} from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { BsCardList } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoIosLogOut } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import { UseSiteContext } from '@/SiteContext/SiteContext';
import { FaClipboardList } from 'react-icons/fa6';

type Titem = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const menuList: Titem[] = [
  { name: 'Home', link: '/', icon: <GoHome /> },
  { name: 'Orders', link: '/admin', icon: <MdDashboard /> },
    { name: 'Orders Realtime', link: '/admin/order-realtime', icon: <MdOutlineCrisisAlert /> },
     { name: 'Sale', link: '/admin/sale', icon: <FaClipboardList /> },
  { name: 'Reservations', link: '/admin/reservations', icon: <BsCardList /> },
  { name: 'Categories', link: '/admin/categories', icon: <MdCategory /> },
  {
    name: 'Pickup Discount',
    link: '/admin/pickupdiscount/pickup-discount',
    icon: <MdLocalOffer />,
  },
  { name: 'Products', link: '/admin/productsbase', icon: <MdInventory /> },
  {
    name: 'Variants',
    link: '/admin/flavorsProductG',
    icon: <MdRestaurantMenu />,
  },
  { name: 'Coupon', link: '/admin/coupon', icon: <MdLocalOffer /> },
  { name: 'Delivery', link: '/admin/delivery', icon: <TbTruckDelivery /> },
  { name: 'Users', link: '/admin/users', icon: <FaUsers /> },
  { name: 'Setting', link: '/admin/setting', icon: <MdSettings /> },
  { name: 'Data Backup', link: '/admin/data-backup', icon: <MdOutlineBackup /> }, // Add icon to top

];

const Sidebar = () => {
  const { setAdminSideBarToggleG } = UseSiteContext();

  return (
    <>
      {/* Mobile close button */}
      <div className="flex items-center pt-4 px-4 justify-between lg:hidden">
        <div></div>
        <button
          onClick={() => setAdminSideBarToggleG(false)}
          className="p-2 rounded-full hover:bg-gray-700 transition"
          aria-label="close sidebar"
        >
          <IoClose size={24} className="text-white" />
        </button>
      </div>

      {/* Sidebar container */}
      <div className="pt-6 h-screen w-[260px] flex flex-col justify-between px-3 py-6 sb-bg shadow-md">
        {/* Navigation */}
        <ul className="flex flex-col gap-1">
          {menuList.map((item) => (
            <Tab key={item.name} item={item} />
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-6 pt-4">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium rounded-md bg-amber-600 text-white hover:bg-rose-700 transition"
          >
            <IoIosLogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

function Tab({ item }: { item: Titem }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isSelected = pathname === item.link;
  const baseClasses = isSelected ? 'sb-tab-active' : 'sb-tab';

  return (
    <Link
      href={item.link}
      className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-all ${baseClasses}`}
    >
      <span className="text-lg">{item.icon}</span>
      <span>{item.name}</span>
    </Link>
  );
}

export default Sidebar;
