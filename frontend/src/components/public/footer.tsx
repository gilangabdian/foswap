import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/10 mt-auto bg-[#111]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold tracking-tighter text-white mb-2">
            Fo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Swap.</span>
          </div>
          <p className="text-sm text-gray-500">
            Bikin video seru tanpa ribet.
          </p>
        </div>
        
        <div className="flex gap-6">
          <Link href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
          <Link href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
        </div>
        
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} FoSwap. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
