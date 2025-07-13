'use client';

import { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { IoClose } from "react-icons/io5";
import { TEXT } from "@/config/languages";
import { framerIcon, framerMenuBackground, framerMenuPanel, framerText } from "./BargerMenuConfig";

export const BargerMenu = () => {
  const { openBargerMenu, bargerMenuToggle } = UseSiteContext();
  const ref = useRef(null);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  useClickAway(ref, () => bargerMenuToggle(false));

  if (!hasMounted) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {typeof window !== "undefined" && openBargerMenu && (
        <>
          <motion.div
            {...framerMenuBackground}
            className="fixed mx-auto rounded-b-3xl top-28 z-50 backdrop-blur-sm"
          />
          <motion.div
            {...framerMenuPanel}
            className="fixed mx-auto right-5 left-5 rounded-b-3xl top-0 px-6 pt-12 pb-3 z-50 bg-dark"
            ref={ref}
          >
            <div className="flex w-full items-center justify-end border-b-2 border-zinc-50">
              <button
                onClick={() => bargerMenuToggle(false)}
                className="p-2 mb-2 border-2 border-zinc-100 rounded-xl"
                aria-label="close Menu"
              >
                <IoClose />
              </button>
            </div>

            <ul>
              {TEXT.menu.map((item, idx) => {
               // const Icon = iconMap[item.link] || iconMap["/"];
                return (
                  <li key={item.name}>
                    <a
                      onClick={() => bargerMenuToggle(false)}
                      href={item.link}
                      className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-400 border-zinc-100"
                    >
                      <motion.span
                        {...framerText(idx)}
                        className="text-white bg-red-400 rounded-2xl py-1 px-2"
                      >
                        {item.name}
                      </motion.span>
                      <motion.div {...framerIcon}>
                        <Icon className="text-2xl" />
                      </motion.div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
