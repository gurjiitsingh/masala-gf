'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState, JSX } from 'react';
import { useLanguage } from '@/store/LanguageContext';

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

const fallbackText = {
  sidebar: {
    home: "Home",
    orders: "Orders",
    orders_realtime: "Orders Realtime",
    sale: "Sale",
    reservations: "Reservations",
    categories: "Categories",
    pickup_discount: "Pickup Discount",
    products: "Products",
    variants: "Variants",
    coupon: "Coupon",
    delivery: "Delivery",
    users: "Users",
    setting: "Setting",
    data_backup: "Data Backup",
    logout: "Logout",
  },
};

type Titem = {
  name: string;
  link: string;
  icon: JSX.Element;
};


const Sidebar = () => {

const { TEXT } = useLanguage() || { TEXT: fallbackText };
const menuList: Titem[] = [
  { name: TEXT.sidebar.home, link: '/', icon: <GoHome /> },
  { name: TEXT.sidebar.orders, link: '/admin', icon: <MdDashboard /> },
  { name: TEXT.sidebar.orders_realtime, link: '/admin/order-realtime', icon: <MdOutlineCrisisAlert /> },
  { name: TEXT.sidebar.sale, link: '/admin/sale', icon: <FaClipboardList /> },
  { name: TEXT.sidebar.reservations, link: '/admin/reservations', icon: <BsCardList /> },
  { name: TEXT.sidebar.categories, link: '/admin/categories', icon: <MdCategory /> },
  { name: TEXT.sidebar.pickup_discount, link: '/admin/pickupdiscount/pickup-discount', icon: <MdLocalOffer /> },
  { name: TEXT.sidebar.products, link: '/admin/productsbase', icon: <MdInventory /> },
  { name: TEXT.sidebar.variants, link: '/admin/flavorsProductG', icon: <MdRestaurantMenu /> },
  { name: TEXT.sidebar.coupon, link: '/admin/coupon', icon: <MdLocalOffer /> },
  { name: TEXT.sidebar.delivery, link: '/admin/delivery', icon: <TbTruckDelivery /> },
  { name: TEXT.sidebar.users, link: '/admin/users', icon: <FaUsers /> },
  { name: TEXT.sidebar.setting, link: '/admin/setting', icon: <MdSettings /> },
  { name: TEXT.sidebar.data_backup, link: '/admin/data-backup', icon: <MdOutlineBackup /> },
];

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
             {TEXT.sidebar.logout}
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
