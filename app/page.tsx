import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow md:container md:mx-auto py-4 px-4 w-full">
        <h1 className="text-2xl ml-2">Welcome home</h1>
      </main>
      <Footer />
    </div>
  );
}