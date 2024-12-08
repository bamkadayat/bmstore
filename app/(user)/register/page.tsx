import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import RegisterUser from "@/components/user/register/RegisterUser";
export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <section>
          <div className="md:container md:mx-auto py-4 md:px-8 px-6 w-full">
            <RegisterUser />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
