"use client";

import React, { useMemo } from "react";
import { COLOR_MAP } from "@/utils/flowerData";

interface FlowerCanvasProps {
  flowerType: string;
  flowerColor: string;
  bouquetStyle: string;
  wrappingStyle: string;
  ribbonStyle: string;
  decorations: string[];
  size: string;
  arrangementPosition: string;
  petalDensity: string;
  animated?: boolean;
}

// SVG petal path generators for each flower type
const flowerRenderer = {
  rose: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
        <ellipse
          key={i}
          cx={cx + Math.cos((angle * Math.PI) / 180) * r * 0.5}
          cy={cy + Math.sin((angle * Math.PI) / 180) * r * 0.5}
          rx={r * 0.45}
          ry={r * 0.6}
          fill={i % 2 === 0 ? color : secondary}
          opacity={0.85 + i * 0.01}
          transform={`rotate(${angle}, ${cx + Math.cos((angle * Math.PI) / 180) * r * 0.5}, ${cy + Math.sin((angle * Math.PI) / 180) * r * 0.5})`}
          style={{ filter: "url(#petalBlur)" }}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.3} fill={secondary} />
    </>
  ),

  sunflower: (cx: number, cy: number, r: number, color: string, _secondary: string) => (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(angle) * r * 0.55}
            cy={cy + Math.sin(angle) * r * 0.55}
            rx={r * 0.18}
            ry={r * 0.42}
            fill={color}
            transform={`rotate(${i * 22.5 + 90}, ${cx + Math.cos(angle) * r * 0.55}, ${cy + Math.sin(angle) * r * 0.55})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.28} fill="#3D2B1F" />
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#5C3D2E" />
    </>
  ),

  lily: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(rad) * r * 0.4}
            cy={cy + Math.sin(rad) * r * 0.4}
            rx={r * 0.22}
            ry={r * 0.65}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.9}
            transform={`rotate(${angle}, ${cx + Math.cos(rad) * r * 0.4}, ${cy + Math.sin(rad) * r * 0.4})`}
          />
        );
      })}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(rad) * r * 0.7}
            y2={cy + Math.sin(rad) * r * 0.7}
            stroke="#D4A017" strokeWidth={1.5} opacity={0.7}
          />
        );
      })}
    </>
  ),

  tulip: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      <ellipse cx={cx} cy={cy - r * 0.3} rx={r * 0.35} ry={r * 0.6} fill={color} />
      <ellipse cx={cx - r * 0.32} cy={cy - r * 0.05} rx={r * 0.28} ry={r * 0.5} fill={secondary} opacity={0.9} transform={`rotate(-25, ${cx - r * 0.32}, ${cy - r * 0.05})`} />
      <ellipse cx={cx + r * 0.32} cy={cy - r * 0.05} rx={r * 0.28} ry={r * 0.5} fill={secondary} opacity={0.9} transform={`rotate(25, ${cx + r * 0.32}, ${cy - r * 0.05})`} />
    </>
  ),

  daisy: (cx: number, cy: number, r: number, color: string, _secondary: string) => (
    <>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(angle) * r * 0.45}
            cy={cy + Math.sin(angle) * r * 0.45}
            rx={r * 0.15}
            ry={r * 0.42}
            fill={color}
            opacity={0.95}
            transform={`rotate(${i * 30 + 90}, ${cx + Math.cos(angle) * r * 0.45}, ${cy + Math.sin(angle) * r * 0.45})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#F9D23A" />
    </>
  ),

  orchid: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      <ellipse cx={cx} cy={cy - r * 0.4} rx={r * 0.42} ry={r * 0.55} fill={color} opacity={0.9} />
      <ellipse cx={cx - r * 0.45} cy={cy} rx={r * 0.28} ry={r * 0.45} fill={secondary} opacity={0.85} transform={`rotate(-35, ${cx - r * 0.45}, ${cy})`} />
      <ellipse cx={cx + r * 0.45} cy={cy} rx={r * 0.28} ry={r * 0.45} fill={secondary} opacity={0.85} transform={`rotate(35, ${cx + r * 0.45}, ${cy})`} />
      <ellipse cx={cx - r * 0.2} cy={cy + r * 0.35} rx={r * 0.2} ry={r * 0.35} fill={color} opacity={0.9} transform={`rotate(-15, ${cx - r * 0.2}, ${cy + r * 0.35})`} />
      <ellipse cx={cx + r * 0.2} cy={cy + r * 0.35} rx={r * 0.2} ry={r * 0.35} fill={color} opacity={0.9} transform={`rotate(15, ${cx + r * 0.2}, ${cy + r * 0.35})`} />
      <circle cx={cx} cy={cy + r * 0.05} r={r * 0.15} fill="#FFD700" />
    </>
  ),

  lotus: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(rad) * r * 0.38}
            cy={cy + Math.sin(rad) * r * 0.38}
            rx={r * 0.2}
            ry={r * 0.55}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.88}
            transform={`rotate(${angle}, ${cx + Math.cos(rad) * r * 0.38}, ${cy + Math.sin(rad) * r * 0.38})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.25} fill={secondary} opacity={0.9} />
    </>
  ),

  peony: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 18 * Math.PI) / 180;
        const distance = (0.2 + (i % 4) * 0.12) * r;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(angle) * distance}
            cy={cy + Math.sin(angle) * distance}
            rx={r * (0.18 - (i % 4) * 0.02)}
            ry={r * (0.35 - (i % 4) * 0.04)}
            fill={i % 3 === 0 ? secondary : color}
            opacity={0.85}
            transform={`rotate(${i * 18}, ${cx + Math.cos(angle) * distance}, ${cy + Math.sin(angle) * distance})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.18} fill={secondary} />
    </>
  ),

  marigold: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const distance = (i % 2 === 0 ? 0.35 : 0.55) * r;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(angle) * distance}
            cy={cy + Math.sin(angle) * distance}
            rx={r * 0.12}
            ry={r * (i % 2 === 0 ? 0.28 : 0.22)}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.9}
            transform={`rotate(${i * 15 + 90}, ${cx + Math.cos(angle) * distance}, ${cy + Math.sin(angle) * distance})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.18} fill={color} />
    </>
  ),

  lavender: (cx: number, cy: number, r: number, color: string, _secondary: string) => (
    <>
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse
          key={i}
          cx={cx + (i % 3 - 1) * r * 0.12}
          cy={cy - r * 0.15 - i * r * 0.08}
          rx={r * 0.1}
          ry={r * 0.16}
          fill={color}
          opacity={0.85}
        />
      ))}
      <rect x={cx - r * 0.05} y={cy + r * 0.1} width={r * 0.1} height={r * 0.6} fill="#4A7C59" rx="4" />
    </>
  ),

  hibiscus: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(rad) * r * 0.38}
            cy={cy + Math.sin(rad) * r * 0.38}
            rx={r * 0.3}
            ry={r * 0.6}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.88}
            transform={`rotate(${angle}, ${cx + Math.cos(rad) * r * 0.38}, ${cy + Math.sin(rad) * r * 0.38})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.12} fill="#FFD700" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.45} stroke="#FF69B4" strokeWidth={2} />
    </>
  ),

  carnation: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 20 * Math.PI) / 180;
        const wave = Math.sin(i * 0.7) * r * 0.08;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(angle) * (r * 0.4 + wave)}
            cy={cy + Math.sin(angle) * (r * 0.4 + wave)}
            rx={r * 0.15}
            ry={r * 0.32}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.88}
            transform={`rotate(${i * 20}, ${cx + Math.cos(angle) * (r * 0.4 + wave)}, ${cy + Math.sin(angle) * (r * 0.4 + wave)})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.15} fill={secondary} />
    </>
  ),

  hydrangea: (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 18 * Math.PI) / 180;
        const dist = (0.15 + (i % 4) * 0.15) * r;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(angle) * dist}
            cy={cy + Math.sin(angle) * dist}
            r={r * 0.14}
            fill={i % 3 === 0 ? secondary : color}
            opacity={0.85}
          />
        );
      })}
    </>
  ),

  "wildflower-mixed": (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const dist = (0.2 + Math.random() * 0.4) * r;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(angle) * dist}
            cy={cy + Math.sin(angle) * dist}
            r={r * (0.1 + (i % 3) * 0.05)}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.9}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.2} fill="#F9D23A" />
    </>
  ),

  "bridal-premium": (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(angle) * r * 0.5}
            cy={cy + Math.sin(angle) * r * 0.5}
            rx={r * 0.22}
            ry={r * 0.5}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.92}
            transform={`rotate(${i * 22.5}, ${cx + Math.cos(angle) * r * 0.5}, ${cy + Math.sin(angle) * r * 0.5})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.22} fill={secondary} />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={cx + (i - 3) * r * 0.15} cy={cy - r * 0.1} r={r * 0.05} fill="#FFD700" opacity={0.8} />
      ))}
    </>
  ),

  "single-stem": (cx: number, cy: number, r: number, color: string, secondary: string) => (
    <>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(rad) * r * 0.35}
            cy={cy + Math.sin(rad) * r * 0.35}
            rx={r * 0.2}
            ry={r * 0.5}
            fill={i % 2 === 0 ? color : secondary}
            opacity={0.9}
            transform={`rotate(${angle}, ${cx + Math.cos(rad) * r * 0.35}, ${cy + Math.sin(rad) * r * 0.35})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.18} fill={secondary} />
    </>
  ),
};

function getFlowerCount(bouquetStyle: string, petalDensity: string): number {
  const styleBase: Record<string, number> = {
    "single-flower": 1,
    "small-hand-tied": 3,
    "dense-luxury": 7,
    "layered": 5,
    "cascading": 6,
    "rounded": 5,
    "asymmetrical": 4,
    "modern-minimalist": 2,
    "rustic-wildflower": 6,
    "premium-gift": 7,
    "celebratory": 8,
    "apology": 4,
    "bridal-elegant": 8,
  };
  const densityMult: Record<string, number> = {
    "sparse": 0.7,
    "medium": 1,
    "dense": 1.3,
    "ultra-dense": 1.6,
  };
  return Math.round((styleBase[bouquetStyle] || 4) * (densityMult[petalDensity] || 1));
}

function getArrangementPositions(
  count: number,
  arrangement: string,
  centerX: number,
  centerY: number,
  radius: number
): Array<{ x: number; y: number; r: number; layer: number }> {
  const positions = [];
  switch (arrangement) {
    case "centered":
      positions.push({ x: centerX, y: centerY, r: radius, layer: 1 });
      for (let i = 1; i < count; i++) {
        const angle = (i * (360 / (count - 1)) * Math.PI) / 180;
        positions.push({ x: centerX + Math.cos(angle) * radius * 0.8, y: centerY + Math.sin(angle) * radius * 0.8, r: radius * 0.7, layer: 0 });
      }
      break;
    case "left-leaning":
      for (let i = 0; i < count; i++) {
        positions.push({ x: centerX - radius * 0.5 + i * radius * 0.35, y: centerY + (i % 2) * radius * 0.25, r: radius * (0.9 - i * 0.05), layer: count - i });
      }
      break;
    case "right-leaning":
      for (let i = 0; i < count; i++) {
        positions.push({ x: centerX + radius * 0.5 - i * radius * 0.35, y: centerY + (i % 2) * radius * 0.25, r: radius * (0.9 - i * 0.05), layer: count - i });
      }
      break;
    case "vertical-tall":
      for (let i = 0; i < count; i++) {
        positions.push({ x: centerX + (i % 3 - 1) * radius * 0.4, y: centerY - (count / 2 - i) * radius * 0.55, r: radius * (0.8 + (i % 2) * 0.1), layer: i });
      }
      break;
    case "wide-spread":
      for (let i = 0; i < count; i++) {
        positions.push({ x: centerX - radius * (count / 2) * 0.5 + i * radius * 0.65, y: centerY + Math.sin(i * 0.8) * radius * 0.3, r: radius * 0.75, layer: i % 2 });
      }
      break;
    case "fan-shaped": {
      const fanStart = -80, fanEnd = 80;
      for (let i = 0; i < count; i++) {
        const angle = ((fanStart + (i * (fanEnd - fanStart)) / Math.max(count - 1, 1)) * Math.PI) / 180;
        positions.push({ x: centerX + Math.sin(angle) * radius * 0.9, y: centerY - Math.cos(angle) * radius * 0.9, r: radius * 0.7, layer: i });
      }
      break;
    }
    case "compact-circular":
      for (let i = 0; i < count; i++) {
        const angle = (i * (360 / count) * Math.PI) / 180;
        const dist = i === 0 ? 0 : radius * 0.5;
        positions.push({ x: centerX + Math.cos(angle) * dist, y: centerY + Math.sin(angle) * dist, r: radius * 0.6, layer: i % 2 });
      }
      break;
    case "cascading-down":
      for (let i = 0; i < count; i++) {
        positions.push({ x: centerX + (i % 3 - 1) * radius * 0.45, y: centerY - radius * 0.5 + i * radius * 0.45, r: radius * (0.9 - i * 0.04), layer: i });
      }
      break;
    case "hero-front":
      positions.push({ x: centerX, y: centerY + radius * 0.2, r: radius, layer: 2 });
      for (let i = 1; i < count; i++) {
        const angle = (i * (360 / (count - 1)) * Math.PI) / 180;
        positions.push({ x: centerX + Math.cos(angle) * radius * 0.65, y: centerY - radius * 0.1 + Math.sin(angle) * radius * 0.4, r: radius * 0.55, layer: 0 });
      }
      break;
    default:
      for (let i = 0; i < count; i++) {
        const angle = (i * (360 / count) * Math.PI) / 180;
        const dist = i === 0 ? 0 : radius * (0.5 + (i % 2) * 0.2);
        positions.push({ x: centerX + Math.cos(angle) * dist, y: centerY + Math.sin(angle) * dist, r: radius * (0.8 - (i % 3) * 0.05), layer: i % 3 });
      }
  }
  return positions.slice(0, count);
}

function getWrapColor(wrappingStyle: string): { fill: string; stroke: string } {
  const wrapColors: Record<string, { fill: string; stroke: string }> = {
    "kraft-paper": { fill: "#C4954A", stroke: "#8B6914" },
    "satin-wrap": { fill: "#E8D5E8", stroke: "#B89CC8" },
    "translucent-floral": { fill: "rgba(200,220,255,0.4)", stroke: "#A8C8E8" },
    "luxury-matte": { fill: "#2C2C3E", stroke: "#4A4A6A" },
    "ribbon-bundle": { fill: "#F5E6C8", stroke: "#D4A017" },
    "gold-trimmed": { fill: "#FFF8E7", stroke: "#D4A017" },
    "pastel-paper": { fill: "#FFE4E8", stroke: "#F4A7B9" },
    "classic-cone": { fill: "#8B7355", stroke: "#6B5435" },
    "premium-box": { fill: "#F0F0F0", stroke: "#C0C0C0" },
    "vase-style": { fill: "rgba(200,235,255,0.3)", stroke: "#90CAF9" },
    "minimal-bundle": { fill: "#F5F5F0", stroke: "#D4D0C8" },
  };
  return wrapColors[wrappingStyle] || { fill: "#C4954A", stroke: "#8B6914" };
}

export default function FlowerCanvas({
  flowerType,
  flowerColor,
  bouquetStyle,
  wrappingStyle,
  ribbonStyle,
  decorations,
  size,
  arrangementPosition,
  petalDensity,
  animated = true,
}: FlowerCanvasProps) {
  const colors = COLOR_MAP[flowerColor] || COLOR_MAP["classic-red"];
  const sizeMultiplier = { mini: 0.6, small: 0.75, medium: 1, large: 1.2, xl: 1.35 }[size] || 1;

  const baseFlowerR = 28 * sizeMultiplier;
  const viewBoxSize = 320;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2 - 20;

  const flowerCount = useMemo(() => getFlowerCount(bouquetStyle, petalDensity), [bouquetStyle, petalDensity]);
  const positions = useMemo(
    () => getArrangementPositions(flowerCount, arrangementPosition, centerX, centerY, baseFlowerR * 1.5),
    [flowerCount, arrangementPosition, centerX, centerY, baseFlowerR]
  );

  const renderer = flowerRenderer[flowerType as keyof typeof flowerRenderer] || flowerRenderer.rose;
  const wrapColor = getWrapColor(wrappingStyle);

  const ribbonColors: Record<string, string> = {
    "gold-ribbon": "#D4A017",
    "silver-ribbon": "#C0C0C0",
    "white-satin": "#F8F4E8",
    "blush-pink": "#F4A7B9",
    "red-ribbon": "#C0392B",
    "cream-ribbon": "#FFF8E7",
    "lavender-ribbon": "#C084FC",
    "dual-tone": "#D4A017",
    "no-ribbon": "transparent",
  };
  const ribbonColor = ribbonColors[ribbonStyle] || "#D4A017";

  const hasSparkles = decorations.includes("sparkles");
  const hasPetals = decorations.includes("drifting-petals");
  const hasLeaves = decorations.includes("leafy-stems");
  const hasHearts = decorations.includes("heart-accents");
  const hasFrame = decorations.includes("elegant-frame");
  const hasGlow = decorations.includes("glow-particles");

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-full"
        style={{ maxHeight: "380px" }}
        aria-label={`${flowerType} bouquet in ${flowerColor}`}
      >
        <defs>
          <filter id="petalBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation={0.4} />
          </filter>
          <filter id="glowFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={3} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDFBF5" />
            <stop offset="100%" stopColor="#FEF9D7" stopOpacity={0.3} />
          </radialGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D6A2D" />
            <stop offset="100%" stopColor="#4A9E4A" />
          </linearGradient>
        </defs>

        {/* Background */}
        <circle cx={centerX} cy={centerY} r={viewBoxSize * 0.48} fill="url(#bgGrad)" opacity={0.4} />

        {/* Elegant frame decoration */}
        {hasFrame && (
          <rect x={8} y={8} width={viewBoxSize - 16} height={viewBoxSize - 16}
            rx={12} fill="none" stroke="#D4A017" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.5} />
        )}

        {/* Glow particles */}
        {hasGlow && Array.from({ length: 8 }).map((_, i) => (
          <circle key={i}
            cx={centerX + Math.cos((i * 45 * Math.PI) / 180) * 90}
            cy={centerY + Math.sin((i * 45 * Math.PI) / 180) * 90}
            r={3 + (i % 3) * 2}
            fill="#F9D23A" opacity={0.3}
            className={animated ? "animate-sparkle" : ""}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* Stems */}
        {wrappingStyle !== "no-wrap" && positions.slice(0, Math.min(5, positions.length)).map((pos, i) => (
          <line key={i}
            x1={pos.x} y1={pos.y + pos.r * 0.5}
            x2={centerX + (pos.x - centerX) * 0.3}
            y2={viewBoxSize - 60}
            stroke="url(#stemGrad)" strokeWidth={2.5 - i * 0.2} opacity={0.85}
          />
        ))}

        {/* Leaves */}
        {hasLeaves && positions.slice(0, 4).map((pos, i) => (
          <ellipse key={i}
            cx={pos.x + (i % 2 === 0 ? -16 : 16)}
            cy={pos.y + pos.r * 0.8}
            rx={10} ry={5}
            fill="#3A7A3A" opacity={0.7}
            transform={`rotate(${i % 2 === 0 ? -30 : 30}, ${pos.x + (i % 2 === 0 ? -16 : 16)}, ${pos.y + pos.r * 0.8})`}
          />
        ))}

        {/* Wrap base */}
        <path
          d={`M ${centerX - 45} ${viewBoxSize - 55} L ${centerX - 35} ${viewBoxSize - 30} L ${centerX + 35} ${viewBoxSize - 30} L ${centerX + 45} ${viewBoxSize - 55} Z`}
          fill={wrapColor.fill} stroke={wrapColor.stroke} strokeWidth={1.5} opacity={0.9}
        />
        <path
          d={`M ${centerX - 35} ${viewBoxSize - 30} Q ${centerX} ${viewBoxSize - 20} ${centerX + 35} ${viewBoxSize - 30}`}
          fill={wrapColor.fill} stroke={wrapColor.stroke} strokeWidth={1} opacity={0.85}
        />

        {/* Ribbon */}
        {ribbonStyle !== "no-ribbon" && (
          <>
            <path
              d={`M ${centerX - 20} ${viewBoxSize - 50} Q ${centerX} ${viewBoxSize - 58} ${centerX + 20} ${viewBoxSize - 50}`}
              stroke={ribbonColor} strokeWidth={4} fill="none" strokeLinecap="round"
            />
            <circle cx={centerX} cy={viewBoxSize - 58} r={6} fill={ribbonColor} opacity={0.9} />
          </>
        )}

        {/* Flowers (sorted by layer for depth) */}
        {[...positions]
          .sort((a, b) => a.layer - b.layer)
          .map((pos, i) => (
            <g
              key={i}
              className={animated ? "animate-bloom" : ""}
              style={{ animationDelay: animated ? `${i * 0.12}s` : "0s", animationFillMode: "both" }}
            >
              {renderer(pos.x, pos.y, pos.r, colors.primary, colors.secondary)}
            </g>
          ))}

        {/* Sparkles */}
        {hasSparkles && Array.from({ length: 6 }).map((_, i) => (
          <text key={i}
            x={centerX + Math.cos((i * 60 * Math.PI) / 180) * (80 + i * 8)}
            y={centerY + Math.sin((i * 60 * Math.PI) / 180) * (80 + i * 8)}
            fontSize={10 + (i % 3) * 4}
            className={animated ? "animate-sparkle" : ""}
            style={{ animationDelay: `${i * 0.25}s` }}
          >✦</text>
        ))}

        {/* Drifting petals */}
        {hasPetals && Array.from({ length: 5 }).map((_, i) => (
          <ellipse key={i}
            cx={50 + i * 55}
            cy={40 + (i % 3) * 30}
            rx={5} ry={3}
            fill={colors.primary}
            opacity={0.5}
            transform={`rotate(${i * 25})`}
            className={animated ? "animate-float" : ""}
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Heart accents */}
        {hasHearts && Array.from({ length: 4 }).map((_, i) => (
          <text key={i}
            x={centerX + Math.cos((i * 90 * Math.PI) / 180) * 100}
            y={centerY + Math.sin((i * 90 * Math.PI) / 180) * 100}
            fontSize={12}
            className={animated ? "animate-float" : ""}
            style={{ animationDelay: `${i * 0.3}s` }}
          >💕</text>
        ))}
      </svg>
    </div>
  );
}
