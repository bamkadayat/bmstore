"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ListLatestPaintings from "@/components/products/listLatestProducts";

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-gray-50">
        <section className="relative md:container md:mx-auto py-4 px-4 w-full mt-5">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-800 text-left mb-6">
              Search
            </h1>
            <div className="flex w-full flex-col md:flex-row md:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search for paintings..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* Filter by Price */}
              <div>
                <select className="px-4 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Filter by Price</option>
                  <option value="low-high">Low to High</option>
                  <option value="high-low">High to Low</option>
                </select>
              </div>
              {/* Filter by Rating */}
              <div>
                <select className="px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Filter by Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars & Up</option>
                  <option value="3">3 Stars & Up</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <ListLatestPaintings />
      </main>
      <Footer />
    </div>
  );
}
