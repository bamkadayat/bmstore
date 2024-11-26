"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { motion } from "framer-motion";
import Image from "next/image";

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
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <section className="bg-gray-100">
          <div className="md:container md:mx-auto py-4 px-4 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between py-[50px] space-y-6 md:space-y-0">
              {/* Left Content */}
              <div className="flex flex-col items-start space-y-4 text-center md:text-left">
                <motion.h1
                  className="md:text-5xl text-3xl font-bold text-gray-800 text-left"
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                >
                  Discover Stunning Art
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-600 text-left"
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  Explore a curated collection of unique paintings and posters
                  crafted by talented artists.
                </motion.p>
                <motion.button
                  className="bg-gray-600 text-white py-2 px-8 rounded hover:bg-gray-700 transition"
                  variants={heroVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  Shop Now
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
        <section className="md:container md:mx-auto py-4 px-4 w-full my-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Paintings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Painting 1 */}
            <div className="relative w-full h-0 pb-[75%]">
              {" "}
              {/* Aspect Ratio 4:3 */}
              <Image
                src="/assets/card-two.jpg"
                alt="Hero Art"
                fill
                className="rounded-lg"
                priority
              />
            </div>
            {/* Painting 2 */}
            <div className="relative w-full h-0 pb-[75%]">
              <Image
                src="/assets/card-three.jpg"
                alt="Hero Art"
                fill
                className="rounded-lg"
                priority
              />
            </div>
            {/* Painting 3 */}
            <div className="relative w-full h-0 pb-[75%]">
              <Image
                src="/assets/hero-main.jpg"
                alt="Hero Art"
                fill
                className="rounded-lg"
                priority
              />
            </div>
            {/* Painting 4 */}
            <div className="relative w-full h-0 pb-[75%]">
              <Image
                src="/assets/hero.jpg"
                alt="Hero Art"
                fill
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
