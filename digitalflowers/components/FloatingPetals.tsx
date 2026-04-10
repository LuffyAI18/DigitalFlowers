"use client";

import React from "react";

const petals = [
  { left: "10%", top: "20%", size: 10, delay: 0, duration: 6 },
  { left: "80%", top: "10%", size: 8, delay: 1, duration: 8 },
  { left: "30%", top: "70%", size: 12, delay: 2, duration: 7 },
  { left: "60%", top: "40%", size: 7, delay: 0.5, duration: 9 },
  { left: "90%", top: "60%", size: 9, delay: 3, duration: 6 },
  { left: "15%", top: "85%", size: 11, delay: 1.5, duration: 8 },
  { left: "50%", top: "5%", size: 8, delay: 2.5, duration: 7 },
  { left: "70%", top: "80%", size: 10, delay: 0.8, duration: 9 },
];

export default function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {petals.map((petal, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: petal.size,
            background: `radial-gradient(circle, rgba(249,210,58,0.4), rgba(244,167,185,0.3))`,
            "--duration": `${petal.duration}s`,
            "--delay": `${petal.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
