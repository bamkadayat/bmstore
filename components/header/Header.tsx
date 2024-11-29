"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Navlist } from "@/lib/constant/Navlist";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Framer Motion Variants
  const navContainer = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const navItem = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 },
  };

  return (
    <header className="bg-black shadow-md">
      <div className="md:container md:mx-auto flex items-center justify-between py-4 px-4 w-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" aria-label="Homepage">
            <Image
              src="/assets/logo.svg"
              width={50}
              height={50}
              alt="bm store logo"
              priority
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <button
            className="text-white focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="relative">
          <NavigationMenuList className="hidden md:flex space-x-2 ml-auto">
            {Navlist?.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-white hover:text-gray-300 active:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors text-[17px]`}
                    tabIndex={0}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute z-50 top-20 left-0 w-full h-full bg-black text-white shadow-md md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={navContainer}
          >
            <ul className="flex flex-col space-y-10 p-4 text-center text-2xl">
              {Navlist?.map((item, index) => (
                <motion.li
                  key={index}
                  className="block px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded transition-colors"
                  variants={navItem}
                >
                  <Link
                    href={item.link}
                    tabIndex={0}
                    aria-label={item.title}
                  >
                    {item.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}