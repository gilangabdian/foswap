"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

const shuffleImages = [
  "https://picsum.photos/id/1015/600/800",
  "https://picsum.photos/id/1016/600/800",
  "https://picsum.photos/id/1018/600/800",
  "https://picsum.photos/id/1019/600/800",
];

export default function FeaturesSection() {
  const [cards, setCards] = useState([0, 1, 2, 3]);
  const [swipeDir, setSwipeDir] = useState(-1);
  const stackRotations = [0, -12, 10, -20];

  useEffect(() => {
    const interval = setInterval(() => {
      setSwipeDir(Math.random() > 0.5 ? 1 : -1);
      setCards((prev) => {
        const next = [...prev];
        const front = next.pop();
        if (front !== undefined) {
          next.unshift(front);
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="w-full py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Fitur Andalan FoSwap</h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed">
              Kita bikin aplikasi ini biar kamu yang awam editing pun bisa bikin video keren tanpa harus pusing belajar dari nol.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: "lucide:zap",
                  title: "Sat-Set (Cepat & Otomatis)",
                  desc: "Semua proses render jalan otomatis di server, kamu gak perlu mantengin layar terus.",
                },
                {
                  icon: "lucide:shield-check",
                  title: "Privasi Super Aman",
                  desc: "Foto kamu murni cuma dipake buat generate video, privasi sangat terjamin.",
                },
                {
                  icon: "lucide:sliders-horizontal",
                  title: "Custom Suka-suka",
                  desc: "Bisa atur warna background, efek blur, dan durasi transisi sesukamu.",
                },
                {
                  icon: "lucide:code-2",
                  title: "Developer Friendly",
                  desc: "Buat kamu yang jago coding, FoSwap nyediain API yang bisa langsung diintegrasiin.",
                },
              ].map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="mt-1 w-12 h-12 shrink-0 bg-secondary/30 rounded-full flex items-center justify-center text-purple-300">
                    <Icon icon={feature.icon} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-square md:aspect-[4/5] flex items-center justify-center">
            {/* Card Shuffle Animation */}
            <div className="relative w-[240px] h-[320px] md:w-[280px] md:h-[380px] perspective-1000 z-10 flex items-center justify-center">
              {cards.map((cardIndex, i) => {
                const depth = cards.length - 1 - i;
                return (
                  <motion.div
                    key={cardIndex}
                    layout 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1 - depth * 0.06, 
                      y: depth * -20, 
                      x: depth === 3 ? [0, 250 * swipeDir, 0] : 0,
                      rotate: depth === 3 ? [0, 40 * swipeDir, stackRotations[3]] : stackRotations[depth],
                      zIndex: 10 - depth,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute w-full h-full rounded-3xl shadow-2xl border-4 border-[#111] flex items-center justify-center overflow-hidden bg-[#222] bg-cover bg-center"
                    style={{ backgroundImage: `url(${shuffleImages[cardIndex]})` }}>
                    <div className="w-full h-full bg-gradient-to-tr from-black/60 to-black/10" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
