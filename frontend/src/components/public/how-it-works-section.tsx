"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";

function UploadMockup() {
  return (
    <div className="relative w-24 h-24 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-xl" />
      <Icon icon="lucide:cloud-upload" className="text-2xl text-purple-400/50 absolute top-4" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [50, 0, 0, -50],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [Math.random() * 20 - 10, Math.random() * 20 - 10, 0, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className="absolute w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded shadow-lg border border-white/20"
        />
      ))}
    </div>
  );
}

function StyleMockup() {
  return (
    <div className="relative w-24 h-24 bg-black/40 rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center gap-2">
      <motion.div 
        animate={{
          backgroundColor: ["#3b82f6", "#ef4444", "#10b981", "#8b5cf6", "#3b82f6"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-12 h-10 rounded-lg shadow-inner border border-white/20"
      />
      <div className="flex gap-1.5">
        {["#3b82f6", "#ef4444", "#10b981", "#8b5cf6"].map((color, i) => (
          <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </div>
      <motion.div
        animate={{
          x: [-15, 0, 15, 0, -15],
          y: [10, 5, 10, 5, 10],
          scale: [1, 0.8, 1, 0.8, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1 text-white drop-shadow-md z-10"
      >
        <Icon icon="lucide:mouse-pointer-2" className="text-xl fill-white/20" />
      </motion.div>
    </div>
  );
}

function DownloadMockup() {
  return (
    <div className="relative w-24 h-24 bg-black/40 rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mb-1 shadow-lg"
      >
        <Icon icon="lucide:play" className="text-white text-sm" />
      </motion.div>
      <div className="w-12 h-1 bg-white/20 rounded-full mt-2 relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-green-400"
        />
      </div>
      <motion.div
        animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-1"
      >
        <Icon icon="lucide:downloadCloud" className="text-purple-400 text-lg" />
      </motion.div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-28 px-6 bg-[#111]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Gampang Banget Pakainya</h2>
          <p className="text-gray-400 text-lg">Cuma butuh 3 langkah simpel buat pamer hasil videomu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              mockup: <UploadMockup />,
              title: "1. Upload",
              desc: "Pilih foto-foto terbaikmu dari galeri (bisa 5 sampai 16 foto).",
            },
            {
              mockup: <StyleMockup />,
              title: "2. Pilih Gaya",
              desc: "Tentukan efek transisi dan background kesukaanmu di template yang disediain.",
            },
            {
              mockup: <DownloadMockup />,
              title: "3. Download",
              desc: "Tunggu bentar doang, dan video kamu siap dipamerin ke sosmed!",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-primary/50 p-10 rounded-3xl border border-white/5 hover:border-white/10 hover:bg-primary transition-all group flex flex-col items-center text-center"
            >
              <div className="mb-8">
                {step.mockup}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
