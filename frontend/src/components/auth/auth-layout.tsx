"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { RandomCubeSpark } from "@/components/shared/random-cube-spark";

export default function AuthSplitLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#151515] relative px-6">
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {/* Masked Single Flowing Spark (same as Hero) */}
      <div 
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{
          maskImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          WebkitMaskImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          maskRepeat: "repeat",
          WebkitMaskRepeat: "repeat",
        }}
      >
        <RandomCubeSpark />
      </div>

      <div className="absolute w-[400px] h-[400px] bg-[#301B3F] blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl p-8 md:p-10 relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-black text-white hover:opacity-80 transition-opacity mb-8">
            Fo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Swap.</span>
          </Link>
          
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h1>
          <p className="text-gray-400 text-xs leading-relaxed">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
