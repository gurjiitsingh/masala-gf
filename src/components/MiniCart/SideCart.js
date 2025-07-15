"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { IoClose } from "react-icons/io5";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import MiniCartContent from "./MiniCartcontent";
import { MiniCartSubtotal } from "./MiniSubtotal";
import ProccedWithEmail from "./components/ProccedWithEmail";
import { useCartContext } from "@/store/CartContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/store/LanguageContext";

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

export const SideCart = () => {
  const { TEXT } = useLanguage();

  const { open, sideBarToggle } = UseSiteContext();
  const { openEmailForm, emailFormToggle, customerEmail } = UseSiteContext();
  const { cartData } = useCartContext();
  const ref = useRef(null);
  const router = useRouter();
  useClickAway(ref, () => sideBarToggle());

  function pickUpHandle() {
    sideBarToggle();
    if (
      customerEmail === "" ||
      customerEmail === undefined ||
      customerEmail === null
    ) {
      emailFormToggle(true);
    } else {
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
    <div translate="no" className="z-50">
       {typeof window !== "undefined" && !openEmailForm && (
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
                  <div className="flex items-center pt-2 justify-between p-2 rounded-xl bg-slate-100">
                    <span>{TEXT.cart_sidebar_title}</span>
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

                  <div className="flex flex-col items-center justify-center gap-3">
                    {cartData.length ? (
                      <button
                        onClick={pickUpHandle}
                        className="w-full mt-5 py-1 text-center bg-red-600 rounded-xl text-white text-[1rem]"
                      >
                        {TEXT.checkout_button}
                      </button>
                    ) : null}

                    <div className="w-full flex flex-col gap-2 justify-center">
                      {cartData.length ? null : (
                        <div className="min-w-[200px] mt-5 py-1 text-center rounded-2xl text-[1rem] font-semibold">
                          {TEXT.empty_cart_message}
                        </div>
                      )}

                      <button
                        onClick={shopMoreHandle}
                        className="min-w-[200px] mt-5 py-1 text-center bg-slate-400 rounded-xl text-white text-[1rem]"
                      >
                        {TEXT.shop_more_button}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}
        {openEmailForm && <ProccedWithEmail />}
     
    </div>
  );
};
