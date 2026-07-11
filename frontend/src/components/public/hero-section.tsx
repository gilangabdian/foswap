"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { RandomCubeSpark } from "@/components/shared/random-cube-spark";
export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[91vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-tight">
          Satukan Foto Jadi <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Video Estetik.
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
          Tinggal upload foto, pilih gaya transisinya, dan biarkan FoSwap otomatis ngerjain sisanya buat kamu. Simpel
          banget!
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/login"
            className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2">
            Mulai Bikin Video - Gratis <Icon icon="lucide:arrow-right" className="text-xl" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Static Cubes Background (Faint) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        {/* Masked Single Flowing Spark */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            maskImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
            WebkitMaskImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
            maskRepeat: "repeat",
            WebkitMaskRepeat: "repeat",
          }}>
          {/* Rendering the single spark logic */}
          <RandomCubeSpark />
        </div>

        {/* Existing Purple Glowing Orb (Static/Slow pulsing) for aesthetic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-secondary/10 rounded-full blur-[120px] -z-10" />
      </div>
    </section>
  );
}
