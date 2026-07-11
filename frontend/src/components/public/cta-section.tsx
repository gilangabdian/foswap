"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="w-full py-32 px-6 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Mulai Gunakan FoSwap</h2>
        <p className="text-xl text-white/80 mb-12">
          Ubah kumpulan foto Anda menjadi video transisi yang menawan hanya dalam hitungan detik.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-secondary rounded-full font-bold text-xl shadow-2xl"
          >
            Mulai Sekarang <Icon icon="lucide:arrow-right" className="text-2xl" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
