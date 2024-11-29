"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ListLatestPaintings from "@/components/products/listLatestProducts";

export default function Home() {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.1 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <section className="bg-gray-100">
          <div className="md:container md:mx-auto py-4 md:px-8 px-6 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between py-[20px]  space-y-6 md:space-y-0">
              {/* Left Content */}
              <div className="flex flex-col items-start space-y-4 md:space-y-6">
                <motion.h1
                  className="md:text-7xl text-5xl font-bold text-gray-800 text-left"
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Discover <br /> Stunning Art
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-700 text-left max-w-[540px]"
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Explore a curated collection of unique paintings and posters
                  crafted by talented artists.
                </motion.p>
                <motion.button
                  className="bg-gray-800 text-white py-3 px-10 flex justify-items-center items-center font-bold rounded hover:bg-gray-700"
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Shop Now <ChevronRight />
                </motion.button>
              </div>

              {/* Right Image */}
              <motion.div
                className="w-full md:w-1/3 flex justify-center"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src="/assets/hero.svg"
                  alt="Hero Art"
                  width={400}
                  height={300}
                  layout="responsive"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>
        <ListLatestPaintings />
      </main>
      <Footer />
    </div>
  );
}
