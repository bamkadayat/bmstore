export default function Footer() {
  return (
    <footer className="bg-black row-start-3 flex gap-6 text-white w-full">
      <div className="md:container md:mx-auto flex justify-between items-center w-full py-4 px-4 ">
      <div>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          BM store © 2024 -{new Date().getFullYear()}
        </a>
      </div>
      <div>
        {" "}
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy →
        </a>
      </div>
      </div>
    </footer>
  );
}
