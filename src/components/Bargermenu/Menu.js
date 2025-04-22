'use client'

import { useRef} from 'react';
//import { GiHamburgerMenu } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';
//import { AiOutlineRollback } from 'react-icons/ai';
import { BiHomeSmile, BiUser } from 'react-icons/bi';
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
//import { FiSettings, FiShoppingCart } from 'react-icons/fi';
import { UseSiteContext } from '@/SiteContext/SiteContext';
import { IoClose } from "react-icons/io5";
export const BargerMenu = () => {
  const { openBargerMenu, bargerMenuToggle } = UseSiteContext();
  const ref = useRef(null)
  useClickAway(ref, () => bargerMenuToggle)
 // const bargerMenuToggle = () => setOpen(prev => !prev)

  return (
    <>
    
      <AnimatePresence mode="wait" initial={false}>
        {openBargerMenu && (
          <>
            <motion.div
              {...framerMenuBackground}
              aria-hidden="true"
              className="fixed  mx-auto   rounded-b-3xl top-28 z-50  backdrop-blur-sm"
            ></motion.div>
            <motion.div
              {...framerMenuPanel}
              className="fixed   mx-auto right-5 left-5 rounded-b-3xl top-0 px-6 pt-12 pb-3  z-50   primary"
              ref={ref}
              aria-label="Menu"
            >
              <div className="flex w-full items-center justify-end  border-b-2 border-zinc-50">
               
                <button
                  onClick={bargerMenuToggle}
                  className="p-2 mb-2 border-2 border-zinc-100 rounded-xl"
                  aria-label="close Menu"
                >
                  <IoClose />
                </button>
              </div>

          
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item
                  return (
                    <li key={title}>
                      <a
                        onClick={bargerMenuToggle}
                        href={href}
                        className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-400 border-zinc-100"
                      >
                        <motion.span {...framerText(idx)} className='text-white bg-red-400 rounded-2xl py-1 px-2'>{title}</motion.span>
                        <motion.div {...framerIcon}>
                          <Icon className="text-2xl" />
                        </motion.div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const items = [
  { title: 'Heim', Icon: BiHomeSmile, href: '/' },
  { title: 'Über Uns', Icon: BiUser,href:'/about' },
  { title: 'Kontakt', Icon: HiOutlineChatBubbleBottomCenterText, href: '/contact' },
 
]

const framerMenuBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
}

const framerMenuPanel = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
  transition: { duration: 0.3 },
}

const framerText = delay => {
  return {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  }
}

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
}