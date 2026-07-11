"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full h-16 flex items-center justify-between px-6 md:px-12 bg-primary/80 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
        <div className="text-2xl font-extrabold tracking-tighter text-white">
          <Link href="/">Fo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Swap.</span></Link>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link href="#how-it-works" className="text-sm font-medium text-gray-300 hover:text-white transition">Cara Kerja</Link>
          <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition">Fitur</Link>
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/login" className="px-5 py-2 rounded-full text-white font-semibold hover:text-purple-300 transition-all text-sm">
            Masuk
          </Link>
          <Link href="/register" className="px-5 py-2 rounded-full bg-secondary text-white font-semibold hover:bg-secondary/80 hover:scale-105 transition-all text-sm">
            Daftar
          </Link>
        </div>

        {/* Mobile View */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/login" className="px-4 py-1.5 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all text-sm border border-white/10">
            Masuk
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition"
          >
            <Icon icon="lucide:menu" className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-extrabold tracking-tighter text-white">
                Fo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Swap.</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition"
              >
                <Icon icon="lucide:x" className="text-2xl" />
              </button>
            </div>

            <div className="flex flex-col gap-8 items-center text-xl">
              <Link 
                href="#how-it-works" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-gray-200 hover:text-white transition"
              >
                Cara Kerja
              </Link>
              <Link 
                href="#features" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-gray-200 hover:text-white transition"
              >
                Fitur
              </Link>
              <div className="w-full h-[1px] bg-white/10 my-4"></div>
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-secondary text-white font-bold text-lg hover:bg-secondary/80 transition-all shadow-[0_0_20px_rgba(48,27,63,0.5)]"
              >
                Daftar Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
