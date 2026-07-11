"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function RandomCubeSpark() {
  const [spark, setSpark] = useState({ id: 0, color: "#fff", pathX: ["0%"], pathY: ["0%"] });

  useEffect(() => {
    const colors = ["#ec4899", "#8b5cf6", "#06b6d4", "#a855f7", "#10b981", "#fbbf24", "#ef4444"];
    
    const spawn = () => {
      const edge = Math.floor(Math.random() * 4); // 0: Kiri, 1: Kanan, 2: Atas, 3: Bawah
      
      let startX = 50, startY = 50;
      if (edge === 0) { startX = -10; startY = Math.random() * 80 + 10; }
      else if (edge === 1) { startX = 110; startY = Math.random() * 80 + 10; }
      else if (edge === 2) { startY = -10; startX = Math.random() * 80 + 10; }
      else if (edge === 3) { startY = 110; startX = Math.random() * 80 + 10; }

      let currX = startX;
      let currY = startY;
      const pX = [`${currX}%`];
      const pY = [`${currY}%`];

      // Vektor pergerakan ISOMETRIK (Sudut 30 derajat untuk diagonal & vertikal lurus)
      const vectors = [
          { dx: 0, dy: 15 },           // Lurus ke Bawah
          { dx: 0, dy: -15 },          // Lurus ke Atas
          { dx: 15, dy: 8.66 },        // Diagonal Kanan-Bawah
          { dx: 15, dy: -8.66 },       // Diagonal Kanan-Atas
          { dx: -15, dy: 8.66 },       // Diagonal Kiri-Bawah
          { dx: -15, dy: -8.66 },      // Diagonal Kiri-Atas
      ];

      const steps = 20; // Perpanjang jalan alirannya agar mencapai ujung layar
      for (let i = 0; i < steps; i++) {
          let validVectors = vectors;
          if (edge === 0) validVectors = [vectors[0], vectors[1], vectors[2], vectors[3]];
          if (edge === 1) validVectors = [vectors[0], vectors[1], vectors[4], vectors[5]];
          if (edge === 2) validVectors = [vectors[0], vectors[2], vectors[4]];
          if (edge === 3) validVectors = [vectors[1], vectors[3], vectors[5]];

          const v = validVectors[Math.floor(Math.random() * validVectors.length)];
          currX += v.dx;
          currY += v.dy;
          pX.push(`${currX}%`);
          pY.push(`${currY}%`);
      }

      // Generate opacity array (0 at start, 1 in middle, 0 at end)
      const opacities = [0, ...Array(steps - 1).fill(1), 0];

      setSpark({
        id: Date.now(),
        color: colors[Math.floor(Math.random() * colors.length)],
        pathX: pX,
        pathY: pY,
        opacities: opacities
      });
    };
    
    spawn();
    const interval = setInterval(spawn, 15000); // 15 detik agar tidak menumpuk
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {spark.id !== 0 && (
        <motion.div
          key={spark.id}
          initial={{ opacity: 0, left: spark.pathX[0], top: spark.pathY[0] }}
          animate={{ 
            opacity: spark.opacities,
            left: spark.pathX,
            top: spark.pathY
          }}
          transition={{ duration: 20, ease: "linear" }}
          className="absolute w-[25px] h-[25px] rounded-full blur-[4px] -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: spark.color, boxShadow: `0 0 15px 4px ${spark.color}` }}
        />
      )}
    </AnimatePresence>
  );
}
