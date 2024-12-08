import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function OverviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <section className="bg-gray-100">
          <div className="md:container md:mx-auto py-4 md:px-8 px-6 w-full">
            <h1>Welcome to overview page</h1>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
