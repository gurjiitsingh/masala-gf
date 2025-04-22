"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";

import { BiHomeSmile, BiUser } from "react-icons/bi";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { FiSettings, FiShoppingCart } from "react-icons/fi";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import MiniCartContent from "./MiniCartcontent";
import { MiniCartSubtotal } from "./MiniSubtotal";
import ProccedWithEmail from "./components/ProccedWithEmail";
import { SessionProvider } from "next-auth/react";
import { useCartContext } from "@/store/CartContext";
import { useRouter } from "next/navigation";
//import Link from "next/link";
export const SideCart = () => {
  //const [ showEmailForm, setShowEmailForm ] = UseSiteContext();
  const { open, sideBarToggle } = UseSiteContext();
  const { openEmailForm, emailFormToggle, customerEmail } = UseSiteContext();
  const { cartData } = useCartContext();
  const ref = useRef(null);
  const router = useRouter();
  useClickAway(ref, () => sideBarToggle());
 

  function pickUpHandle() {
    /// setShowEmailForm((state)=>!state)
    // chageDeliveryType("pickup")
   // console.log("cutomer email in cart mini----------",customerEmail)
    sideBarToggle();
    if(customerEmail === "" || customerEmail === undefined || customerEmail === null){
      emailFormToggle(true);
    }else{
      router.push(`/checkout`);
    }
   
   
  }

  function shopMoreHandle() {
    // setShowEmailForm((state)=>!state)
    sideBarToggle();
    router.push("/");
    // chageDeliveryType("pickup")
    // emailFormToggle()
  }
  return (
    <div className="z-50">
      <SessionProvider>
        {!openEmailForm && (
          <AnimatePresence mode="wait" initial={false}>
            {open && (
              <>
                <motion.div
                  {...framerSidebarBackground}
                  aria-hidden="true"
                  className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(244,243,243,0.1)] backdrop-blur-sm "
                ></motion.div>
                <motion.div
                  {...framerSidebarPanel}
                  className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-lg border-r-2 border-zinc-50 bg-white p-2"
                  ref={ref}
                  aria-label="Sidebar"
                >
                  <div className="flex items-center  pt-2 justify-between p-2  rounded-xl  bg-slate-100 ">
                    <span>Dein Warenkorb</span>
                    <button
                      onClick={sideBarToggle}
                      className="p-1 border-zinc-800 rounded-xl"
                      aria-label="close sidebar"
                    >
                      <IoClose size={30} />
                    </button>
                  </div>

                  <MiniCartContent />
                  <MiniCartSubtotal />
                  <div className=" flex flex-col items-center justify-center gap-3 ">
                    {cartData.length ? (
                      <button
                        onClick={() => {
                          pickUpHandle();
                        }}
                        className="w-full mt-5 py-1 text-center bg-red-600 rounded-xl text-white text-[1rem]"
                      >
                        {/* Pickup */}
                        Kasse
                      </button>
                    ) : (
                      <></>
                    )}
                    <div className="w-full flex flex-col gap-2 justify-center">
                      {cartData.length ? (
                        <></>
                      ) : (
                        <div className="min-w-[200px] mt-5 py-1 text-center  rounded-2xl text-[1rem] font-semibold">
                          Warenkorb ist leer
                        </div>
                      )}
                      <button
                        onClick={() => {
                          shopMoreHandle();
                        }}
                        className="min-w-[200px] mt-5 py-1 text-center bg-slate-400 rounded-xl text-white text-[1rem]"
                      >
                        Mehr einkaufen
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
        {openEmailForm && <ProccedWithEmail />}
      </SessionProvider>
    </div>
  );
};
//console.log("llllllllllllll", cartData)
const items = [
  { title: "Home", Icon: BiHomeSmile, href: "#" },
  { title: "About", Icon: BiUser },
  { title: "Contact", Icon: HiOutlineChatBubbleBottomCenterText, href: "#" },
  { title: "Settings", Icon: FiSettings, href: "#" },
  { title: "Shop", Icon: FiShoppingCart, href: "#" },
];

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};
