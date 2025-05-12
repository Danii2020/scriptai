import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2f2f32] to-[#1a1a2e] text-white p-6">
      <header className="flex flex-col items-center gap-4 mb-12">
        <Image src="/favicon.ico" alt="ScriptAI Logo" width={48} height={48} />
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          Welcome to <span className="bg-font-gradient-theme">ScriptAI</span>
        </h1>
        <p className="text-lg sm:text-xl text-center max-w-xl text-[#e0e0e0]">
          Effortlessly generate engaging, long-form YouTube video scripts. Focus on your creativity—let AI handle the words!
        </p>
      </header>
      <main className="flex flex-col items-center gap-8">
        <Link href="/generate">
          <button className="bg-gradient-theme text-white font-semibold px-8 py-4 rounded-full shadow-lg text-lg
          hover:scale-105 transition-transform cursor-pointer">
            Start Generating Scripts
          </button>
        </Link>
      </main>
      <footer className="mt-16 text-sm text-[#b0b0b0] text-center">
        © {new Date().getFullYear()} ScriptAI. Made for content creators.
      </footer>
    </div>
  );
}
