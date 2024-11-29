"use client";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { products } from "@/lib/constant/ProductList";
import { usePathname } from "next/navigation";

export default function ListLatestPaintings() {
  const productList = products;

  const [ratings, setRatings] = useState(
    products.map((product) => product.rating)
  );

  const handleRating = (productId: number, value: number) => {
    setRatings((prevRatings) =>
      prevRatings.map((rating, index) =>
        index === productId - 1 ? value : rating
      )
    );
  };

  const pathname = usePathname();
  const title =
    pathname === "/"
      ? "Latest Paintings"
      : pathname === "/shop"
      ? "Paintings"
      : "Products";

  return (
    <div>
    <section className="md:container md:mx-auto py-4 px-4 w-full my-10 ">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productList.map((product) => (
          <div key={product.id}>
            <div className="relative w-full h-0 pb-[75%]">
              {" "}
              <Image
                src={product.img}
                alt={product.title}
                fill
                priority
                style={{
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              />
            </div>
            <div
              className="bg-gray-100 p-4"
              style={{
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <h3 className="font-semibold">{product.title}</h3>
              <div className="font-semibold mb-1">NOK {product.price}</div>
              <div className="rating flex items-center space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleRating(product.id, index + 1)}
                      className="cursor-pointer"
                    >
                      {index < ratings[product.id - 1] ? (
                        <AiFillStar className="text-orange-500" />
                      ) : (
                        <AiOutlineStar className="text-gray-400" />
                      )}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
