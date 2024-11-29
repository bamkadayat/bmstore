"use client";
import { useState } from "react";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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

  const [rating, setRating] = useState(4);
  const handleRating = (value: number) => {
    setRating(value); 
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
        <section className="md:container md:mx-auto py-4 px-4 w-full my-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Latest paintings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Painting 1 */}
            <div>
              <div className="relative w-full h-0 pb-[75%]">
                {" "}
                {/* Aspect Ratio 4:3 */}
                <Image
                  src="/assets/card-two.jpg"
                  alt="Hero Art"
                  fill
                  priority
                  style={{ borderTopLeftRadius: "5px", borderTopRightRadius:"5px" }}
                />
              </div>
              <div className="descriptions bg-gray-100 p-4">
                <h3 className="font-semibold">One-of-a-Kind Art</h3>
                <div>NOK 500</div>
                <div className="rating flex items-center space-x-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleRating(index + 1)}
                        className="cursor-pointer"
                      >
                        {index < rating ? (
                          <AiFillStar className="text-orange-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-400" />
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            {/* Painting 2 */}
            <div>
              <div className="relative w-full h-0 pb-[75%]">
                <Image
                  src="/assets/card-three.jpg"
                  alt="Hero Art"
                  fill
                  priority
                  style={{ borderTopLeftRadius: "5px", borderTopRightRadius:"5px" }}
                />
              </div>
              <div className="descriptions bg-gray-100 p-4 rounded-b">
                <h3 className="font-semibold">Curated Gift Guide</h3>
                <div>NOK 500</div>
                <div className="rating flex items-center space-x-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleRating(index + 1)}
                        className="cursor-pointer"
                      >
                        {index < rating ? (
                          <AiFillStar className="text-orange-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-400" />
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            {/* Painting 3 */}
            <div>
              <div className="relative w-full h-0 pb-[75%]">
                <Image
                  src="/assets/hero-main.jpg"
                  alt="Hero Art"
                  fill
                  priority
                  style={{ borderTopLeftRadius: "5px", borderTopRightRadius:"5px" }}
                />
              </div>
              <div className="descriptions bg-gray-100 p-4 rounded-md">
                <h3 className="font-semibold">Truly Special Art</h3>
                <div>NOK 500</div>
                <div className="rating flex items-center space-x-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleRating(index + 1)}
                        className="cursor-pointer"
                      >
                        {index < rating ? (
                          <AiFillStar className="text-orange-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-400" />
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            {/* Painting 4 */}
            <div>
              <div className="relative w-full h-0 pb-[75%]">
                <Image src="/assets/hero.jpg" alt="Hero Art" fill priority style={{ borderTopLeftRadius: "5px", borderTopRightRadius:"5px" }} />
              </div>
              <div className="descriptions bg-gray-100 p-4">
                <h3 className="font-semibold">Truly Special Art</h3>
                <div>NOK 500</div>
                <div className="rating flex items-center space-x-1">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        onClick={() => handleRating(index + 1)}
                        className="cursor-pointer"
                      >
                        {index < rating ? (
                          <AiFillStar className="text-orange-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-400" />
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
