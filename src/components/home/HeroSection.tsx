// "use client";

// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, ChevronDown } from "lucide-react";
// import Button from "@/components/ui/Button";
// import { BadgeCheck, Wallet, Gift, Truck } from "lucide-react";

// export default function HeroSection() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 0.6;
//     }
//   }, []);

//   const scrollDown = () => {
//     const next = document.getElementById("featured");
//     next?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
//       {/* Background gradient (fallback / overlay) */}
//       <div className="absolute inset-0 bg-luxury-radial" />

//       {/* Decorative grid lines */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(201,161,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,161,74,1) 1px, transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />

//       {/* Large decorative text */}
//       <div
//         className="absolute right-0 bottom-12 text-[clamp(80px,18vw,220px)] font-display text-white/[0.02] leading-none select-none pointer-events-none"
//         aria-hidden
//       >
//         AUTO VIBE
//       </div>

//       {/* Gold accent lines */}
//       <div className="absolute top-1/2 -translate-y-1/2 right-0 w-px h-2/3 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
//       <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="max-w-3xl">
//           {/* Eyebrow */}

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.8,
//               delay: 0.3,
//               ease: [0.25, 0.46, 0.45, 0.94],
//             }}
//             className="font-display text-[clamp(48px,5vw,96px)] leading-[0.95] text-ivory mb-6"
//           >
//             Define Your
//             <br />
//             <span className="text-gold italic">Drive</span>
//             <br />
//             <span className="text-smoke/60">In Luxury</span>
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="text-ash font-body text-lg leading-relaxed mb-10 max-w-xl"
//           >
//             Luxurious accessories for the modern motorist. Where engineering
//             precision meets aesthetic mastery.
//           </motion.p>

//           {/* CTAs */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.65 }}
//             className="flex flex-wrap items-center gap-4"
//           >
//             <Link href="/store/products">
//               <Button
//                 variant="gold"
//                 size="lg"
//                 rightIcon={<ArrowRight className="w-4 h-4" />}
//               >
//                 Explore Collection
//               </Button>
//             </Link>
//             <Link href="/store/products?featured=true">
//               <Button variant="outline" size="lg">
//                 Featured Pieces
//               </Button>
//             </Link>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.9 }}
//             className="flex gap-10 mt-16 pt-8 border-t border-white/5"
//           >
//             {[
//               { num: "500+", label: "Premium Products" },
//               { num: "15K+", label: "Happy Customers" },
//               { num: "100%", label: "Authentic Quality" },
//             ].map(({ num, label }) => (
//               <div key={label}>
//                 <p className="text-gold font-display text-2xl">{num}</p>
//                 <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mt-0.5">
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.button
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//         onClick={scrollDown}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ash hover:text-gold transition-colors group"
//       >
//         <span className="text-[9px] font-sans tracking-[0.3em] uppercase">
//           Scroll
//         </span>
//         <ChevronDown className="w-4 h-4 animate-bounce" />
//       </motion.button>

//       {/* Marquee strip — sits flush under the navbar */}
//       <div className="absolute top-16 left-0 right-0 border-y border-gold/10 py-3 overflow-hidden z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
//           {Array(4)
//             .fill(null)
//             .map((_, i) => (
//               <span
//                 key={i}
//                 className="flex items-center gap-8 text-gold text-[10px] font-sans tracking-[0.3em] uppercase"
//               >
//                 <span className="flex items-center gap-1.5">
//                   <BadgeCheck className="w-5 h-5 text-gold" />
//                   Premium Quality
//                 </span>
//                 <span className="w-1 h-1 rounded-full bg-gold/30" />
//                 <span className="flex items-center gap-1.5">
//                   <Wallet className="w-5 h-5 text-amber-900" />
//                   COD Available
//                 </span>
//                 <span className="w-1 h-1 rounded-full bg-gold/30" />
//                 <span className="flex items-center gap-1.5">
//                   <Gift className="w-7 h-7 text-red-600" />
//                   Get Free Gift On Order Above ₹999
//                 </span>
//                 <span className="w-1 h-1 rounded-full bg-gold/30" />
//                 <span className="flex items-center gap-1.5">
//                   <Truck className="w-5 h-5 text-green-500" />
//                   Free Shipping Above ₹399
//                 </span>
//                 <span className="w-1 h-1 rounded-full bg-gold/30" />
//               </span>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// }













// 2nd animated 




// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, ChevronDown, BadgeCheck, Wallet, Gift, Truck } from "lucide-react";
// import Button from "@/components/ui/Button";

// /* ─────────────────────────────────────────
//    Types
// ───────────────────────────────────────── */
// interface SpeedLine {
//   id: number;
//   top: number;
//   width: number;
//   dur: number;
//   opacity: number;
//   gold: boolean;
// }

// interface Spark {
//   id: number;
//   x: number;
//   y: number;
//   dx: number;
//   dy: number;
//   dur: number;
//   delay: number;
// }

// /* ─────────────────────────────────────────
//    Car SVG builders
// ───────────────────────────────────────── */
// function SuvCar({ color, accent }: { color: string; accent: string }) {
//   return (
//     <svg width="240" height="65" viewBox="0 0 240 65" xmlns="http://www.w3.org/2000/svg">
//       <ellipse cx="60"  cy="56" rx="17" ry="9" fill="#111" opacity=".55" />
//       <ellipse cx="178" cy="56" rx="17" ry="9" fill="#111" opacity=".55" />
//       <path d="M6 47 L15 47 L20 32 L55 20 L90 16 L145 14 L175 16 L198 24 L212 34 L218 44 L220 47 L6 47Z" fill={color} />
//       <path d="M22 31 L32 20 L88 15 L143 14 L172 16 L194 23 L207 34 L207 42 L20 42Z" fill={accent} opacity=".1" />
//       <rect x="36"  y="17" width="52" height="22" rx="3" fill="rgba(120,200,255,.14)" stroke="rgba(120,200,255,.22)" strokeWidth=".5" />
//       <rect x="98"  y="16" width="62" height="22" rx="3" fill="rgba(120,200,255,.12)" stroke="rgba(120,200,255,.18)" strokeWidth=".5" />
//       <rect x="170" y="18" width="28" height="20" rx="2" fill="rgba(120,200,255,.08)" stroke="rgba(120,200,255,.13)" strokeWidth=".5" />
//       <circle cx="60"  cy="49" r="10" fill="#181818" stroke={accent} strokeWidth="1.5" />
//       <circle cx="60"  cy="49" r="6"  fill="#222" />
//       <circle cx="60"  cy="49" r="2.5" fill={accent} />
//       <circle cx="178" cy="49" r="10" fill="#181818" stroke={accent} strokeWidth="1.5" />
//       <circle cx="178" cy="49" r="6"  fill="#222" />
//       <circle cx="178" cy="49" r="2.5" fill={accent} />
//       <rect x="210" y="36" width="16" height="7" rx="2" fill={accent} opacity=".9" />
//       <rect x="212" y="37" width="12" height="5" rx="1" fill="rgba(255,245,160,.85)" />
//       <rect x="4"   y="40" width="7"  height="5" rx="1" fill="rgba(255,50,50,.75)" />
//       <line x1="2" y1="47" x2="6" y2="47" stroke={accent} strokeWidth=".5" opacity=".4" />
//     </svg>
//   );
// }

// function SportsCar({ color, accent }: { color: string; accent: string }) {
//   return (
//     <svg width="220" height="60" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
//       <ellipse cx="56"  cy="52" rx="16" ry="8" fill="#111" opacity=".6" />
//       <ellipse cx="164" cy="52" rx="16" ry="8" fill="#111" opacity=".6" />
//       <path d="M8 44 L20 44 L28 22 L80 16 L130 14 L165 20 L185 28 L200 36 L205 44 L8 44Z" fill={color} />
//       <path d="M30 22 L40 16 L120 14 L155 18 L175 26 L175 38 L28 38Z" fill={accent} opacity=".18" />
//       <path d="M42 22 L52 15 L118 13 L150 17 L166 23" fill="none" stroke={accent} strokeWidth="1" opacity=".5" />
//       <rect x="50"  y="16" width="55" height="20" rx="3" fill="rgba(120,200,255,.12)" stroke="rgba(120,200,255,.2)"  strokeWidth=".5" />
//       <rect x="115" y="17" width="40" height="18" rx="3" fill="rgba(120,200,255,.1)"  stroke="rgba(120,200,255,.15)" strokeWidth=".5" />
//       <circle cx="56"  cy="46" r="9" fill="#1a1a1a" stroke={accent} strokeWidth="1.5" />
//       <circle cx="56"  cy="46" r="5" fill="#2a2a2a" />
//       <circle cx="56"  cy="46" r="2" fill={accent} />
//       <circle cx="164" cy="46" r="9" fill="#1a1a1a" stroke={accent} strokeWidth="1.5" />
//       <circle cx="164" cy="46" r="5" fill="#2a2a2a" />
//       <circle cx="164" cy="46" r="2" fill={accent} />
//       <rect x="196" y="32" width="14" height="6" rx="2" fill={accent} opacity=".9" />
//       <rect x="198" y="33" width="10" height="4" rx="1" fill="rgba(255,240,150,.8)" />
//       <rect x="6"   y="36" width="6"  height="4" rx="1" fill="rgba(255,60,60,.7)" />
//     </svg>
//   );
// }

// function SedanCar({ color, accent }: { color: string; accent: string }) {
//   return (
//     <svg width="200" height="58" viewBox="0 0 200 58" xmlns="http://www.w3.org/2000/svg">
//       <ellipse cx="52"  cy="51" rx="14" ry="7" fill="#111" opacity=".5" />
//       <ellipse cx="150" cy="51" rx="14" ry="7" fill="#111" opacity=".5" />
//       <path d="M10 43 L18 43 L26 26 L72 18 L128 16 L158 20 L176 30 L186 40 L188 43 L10 43Z" fill={color} />
//       <path d="M28 26 L36 18 L126 16 L155 20 L172 30 L172 38 L26 38Z" fill={accent} opacity=".12" />
//       <rect x="38" y="18" width="50" height="18" rx="2" fill="rgba(120,200,255,.13)" stroke="rgba(120,200,255,.2)"  strokeWidth=".5" />
//       <rect x="98" y="19" width="45" height="17" rx="2" fill="rgba(120,200,255,.1)"  stroke="rgba(120,200,255,.15)" strokeWidth=".5" />
//       <path d="M30 26 L40 18 L124 16" fill="none" stroke={accent} strokeWidth=".8" opacity=".4" />
//       <circle cx="52"  cy="45" r="9" fill="#1a1a1a" stroke={accent} strokeWidth="1.5" />
//       <circle cx="52"  cy="45" r="5" fill="#222" />
//       <circle cx="52"  cy="45" r="2" fill={accent} />
//       <circle cx="150" cy="45" r="9" fill="#1a1a1a" stroke={accent} strokeWidth="1.5" />
//       <circle cx="150" cy="45" r="5" fill="#222" />
//       <circle cx="150" cy="45" r="2" fill={accent} />
//       <rect x="178" y="34" width="12" height="5" rx="2" fill={accent} opacity=".85" />
//       <rect x="180" y="35" width="8"  height="3" rx="1" fill="rgba(255,240,150,.75)" />
//       <rect x="8"   y="37" width="5"  height="3" rx="1" fill="rgba(255,60,60,.7)" />
//     </svg>
//   );
// }

// /* ─────────────────────────────────────────
//    Car definitions
// ───────────────────────────────────────── */
// const CAR_DEFS = [
//   { color: "#1a1a2e", accent: "#C9A14A", type: "suv",    bottom: 0,  dur: 9,   delay: 0,    scale: 1.0,  zIndex: 5 },
//   { color: "#1c0a0a", accent: "#e05555", type: "sports", bottom: 5,  dur: 7,   delay: -3.5, scale: 0.85, zIndex: 4 },
//   { color: "#0a1520", accent: "#4ab3e0", type: "sedan",  bottom: 2,  dur: 11,  delay: -6,   scale: 0.9,  zIndex: 3 },
//   { color: "#14140a", accent: "#b8e04a", type: "sports", bottom: 6,  dur: 8,   delay: -1.5, scale: 0.78, zIndex: 4 },
//   { color: "#0f0f1c", accent: "#9b4ae0", type: "suv",    bottom: 0,  dur: 10,  delay: -8,   scale: 0.95, zIndex: 5 },
//   { color: "#0a1a0f", accent: "#4ae09b", type: "sedan",  bottom: 3,  dur: 8.5, delay: -4.5, scale: 0.82, zIndex: 3 },
// ] as const;

// /* ─────────────────────────────────────────
//    Marquee items
// ───────────────────────────────────────── */
// const MARQUEE_ITEMS = [
//   { icon: <BadgeCheck className="w-5 h-5 text-[#C9A14A]" />, label: "Premium Quality" },
//   { icon: <Wallet     className="w-5 h-5 text-amber-700" />, label: "COD Available" },
//   { icon: <Gift       className="w-7 h-7 text-red-500" />,   label: "Free Gift On Orders Above ₹999" },
//   { icon: <Truck      className="w-5 h-5 text-green-500" />, label: "Free Shipping Above ₹399" },
//   { icon: <BadgeCheck className="w-5 h-5 text-[#C9A14A]" />, label: "15,000+ Happy Customers" },
//   { icon: <BadgeCheck className="w-5 h-5 text-[#C9A14A]" />, label: "100% Authentic Products" },
// ];

// /* ─────────────────────────────────────────
//    Main component
// ───────────────────────────────────────── */
// export default function HeroSection() {
//   const [stat1, setStat1] = useState(0);
//   const [stat2, setStat2] = useState(0);
//   const [stat3, setStat3] = useState(0);
//   const [lines, setLines] = useState<SpeedLine[]>([]);
//   const [sparks, setSparks] = useState<Spark[]>([]);
//   const lineId  = useRef(0);
//   const sparkId = useRef(0);

//   /* counter animation */
//   useEffect(() => {
//     const t = setTimeout(() => {
//       animateCount(setStat1, 500, 1500);
//       animateCount(setStat2, 15,  1500);
//       animateCount(setStat3, 100, 1200);
//     }, 1100);
//     return () => clearTimeout(t);
//   }, []);

//   function animateCount(setter: (n: number) => void, target: number, duration: number) {
//     const start = Date.now();
//     const tick = () => {
//       const p = Math.min((Date.now() - start) / duration, 1);
//       setter(Math.round(target * (1 - Math.pow(1 - p, 3))));
//       if (p < 1) requestAnimationFrame(tick);
//     };
//     tick();
//   }

//   /* speed lines */
//   useEffect(() => {
//     const iv = setInterval(() => {
//       const id  = lineId.current++;
//       const dur = 0.9 + Math.random() * 1.1;
//       setLines(prev => [
//         ...prev.slice(-35),
//         { id, top: Math.random() * 95, width: 60 + Math.random() * 160, dur, opacity: 0.3 + Math.random() * 0.4, gold: Math.random() > 0.5 },
//       ]);
//       setTimeout(() => setLines(p => p.filter(l => l.id !== id)), (dur + 0.5) * 1000);
//     }, 180);
//     return () => clearInterval(iv);
//   }, []);

//   /* sparks */
//   useEffect(() => {
//     const iv = setInterval(() => {
//       const id  = sparkId.current++;
//       const dur = 0.7 + Math.random() * 1.1;
//       setSparks(prev => [
//         ...prev.slice(-60),
//         { id, x: Math.random() * 100, y: Math.random() * 100, dx: (Math.random() - 0.5) * 50, dy: (Math.random() - 0.5) * 50, dur, delay: Math.random() * 0.8 },
//       ]);
//       setTimeout(() => setSparks(p => p.filter(s => s.id !== id)), (dur + 1) * 1000);
//     }, 100);
//     return () => clearInterval(iv);
//   }, []);

//   const scrollDown = () =>
//     document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });

//   return (
//     <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100vh" }}>
//     {/* // <section className="relative flex flex-col justify-start md:justify-center overflow-hidden min-h-[90vh] md:min-h-screen pt-16 md:pt-0"> */}

//       {/* ── Global keyframes ── */}
//       <style>{`
//         @keyframes carDrive    { 0%{transform:translateX(110%)} 100%{transform:translateX(-150%)} }
//         @keyframes rotateSlow  { from{transform:translateY(-50%) rotate(0)} to{transform:translateY(-50%) rotate(360deg)} }
//         @keyframes scanBeam    { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
//         @keyframes speedLine   { 0%{transform:scaleX(0) translateX(-100%);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:scaleX(1) translateX(200%);opacity:0} }
//         @keyframes sparkAnim   { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0} }
//         @keyframes roadLine    { 0%{transform:translateX(0)} 100%{transform:translateX(-120px)} }
//         @keyframes exhaustPuff { 0%{transform:translateX(0) scaleX(1);opacity:.55} 100%{transform:translateX(-28px) scaleX(2);opacity:0} }
//         @keyframes hlPulse     { 0%,100%{opacity:.5} 50%{opacity:.92} }
//         @keyframes marqueeAnim { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
//         @keyframes needleSwing { 0%{transform:rotate(-120deg)} 100%{transform:rotate(28deg)} }
//         @keyframes arcFill     { to{stroke-dashoffset:0} }
//         @keyframes pulseRing   { 0%{transform:scale(.8);opacity:.7} 100%{transform:scale(1.7);opacity:0} }
//         @keyframes fadeUp      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes lineGrow    { to{width:32px} }
//       `}</style>

//       {/* ══════════════════════════════════════
//           MARQUEE — TOP
//       ══════════════════════════════════════ */}
//       <div
//         className="relative z-30 overflow-hidden flex items-center top-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
//         style={{ height: 42, borderBottom: "1px solid rgba(201,161,74,.18)", background: "rgba(8,6,4,.94)" }}
//       >
//         <div
//           className="flex whitespace-nowrap"
//           style={{ animation: "marqueeAnim 40s linear infinite" }}
//         >
//           {[...Array(4)].fill(MARQUEE_ITEMS).flat().map((item: typeof MARQUEE_ITEMS[number], i: number) => (
//             <span
//               key={i}
//               className="inline-flex items-center gap-2 px-7"
//               style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,161,74,.72)" }}
//             >
//               {item.icon}
//               {item.label}
//               <span style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: "rgba(201,161,74,.3)", marginLeft: 8 }} />
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* ══════════════════════════════════════
//           HERO BODY
//       ══════════════════════════════════════ */}
//       <div
//         className="relative flex-1 flex items-center overflow-hidden " 
//         style={{ background: "#080604", minHeight: "calc(100vh - 42px)" }}
//       >
//         {/* grid overlay */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             opacity: 0.022,
//             backgroundImage: "linear-gradient(rgba(201,161,74,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,161,74,1) 1px,transparent 1px)",
//             backgroundSize: "55px 55px",
//           }}
//         />

//         {/* scan beam */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: "linear-gradient(90deg,transparent 0%,rgba(201,161,74,.035) 45%,rgba(201,161,74,.065) 50%,rgba(201,161,74,.035) 55%,transparent 100%)",
//             animation: "scanBeam 5s ease-in-out infinite",
//           }}
//         />

//         {/* speed lines */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {lines.map(l => (
//             <div
//               key={l.id}
//               className="absolute h-px"
//               style={{
//                 top: `${l.top}%`, width: l.width, left: 0,
//                 background: l.gold
//                   ? "linear-gradient(90deg,transparent,rgba(201,161,74,.35),transparent)"
//                   : "linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent)",
//                 animation: `speedLine ${l.dur}s linear forwards`,
//                 opacity: l.opacity,
//               }}
//             />
//           ))}
//         </div>

//         {/* sparks */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           {sparks.map(s => (
//             <div
//               key={s.id}
//               className="absolute w-0.5 h-0.5 rounded-full"
//               style={{
//                 left: `${s.x}%`, top: `${s.y}%`,
//                 background: "#C9A14A",
//                 ["--dx" as string]: `${s.dx}px`,
//                 ["--dy" as string]: `${s.dy}px`,
//                 animation: `sparkAnim ${s.dur}s ${s.delay}s linear forwards`,
//               }}
//             />
//           ))}
//         </div>

//         {/* gear rings */}
//         {[
//           { size: 320, right: -70, dur: "22s",  opacity: "rgba(201,161,74,.07)",  bw: "1px" },
//           { size: 220, right: -40, dur: "13s",  opacity: "rgba(201,161,74,.11)",  bw: "1px",   reverse: true },
//           { size: 130, right: -10, dur: "7s",   opacity: "rgba(201,161,74,.17)",  bw: "1.5px" },
//         ].map((g, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full pointer-events-none"
//             style={{
//               width: g.size, height: g.size, right: g.right, top: "50%",
//               border: `${g.bw} solid ${g.opacity}`,
//               transform: "translateY(-50%)",
//               animation: `rotateSlow ${g.dur} linear infinite${"reverse" in g ? " reverse" : ""}`,
//             }}
//           />
//         ))}

//         {/* corner brackets */}
//         {(["tl","tr","bl","br"] as const).map(pos => (
//           <div
//             key={pos}
//             className="absolute w-5 h-5 pointer-events-none"
//             style={{
//               top:    pos.startsWith("t") ? 14 : undefined,
//               bottom: pos.startsWith("b") ? 14 : undefined,
//               left:   pos.endsWith("l")   ? 14 : undefined,
//               right:  pos.endsWith("r")   ? 14 : undefined,
//               borderTop:    pos.startsWith("t") ? "1px solid rgba(201,161,74,.4)" : undefined,
//               borderBottom: pos.startsWith("b") ? "1px solid rgba(201,161,74,.4)" : undefined,
//               borderLeft:   pos.endsWith("l")   ? "1px solid rgba(201,161,74,.4)" : undefined,
//               borderRight:  pos.endsWith("r")   ? "1px solid rgba(201,161,74,.4)" : undefined,
//             }}
//           />
//         ))}

//         {/* ── ROAD ── */}
//         <div
//           className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
//           style={{ height: 110, background: "#0e0c08", borderTop: "1px solid rgba(201,161,74,.14)", zIndex: 2 }}
//         >
//           {Array.from({ length: 14 }).map((_, i) => (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 height: 2, top: "50%", left: i * 120, width: 80,
//                 background: "rgba(201,161,74,.2)",
//                 animation: `roadLine 0.6s linear infinite`,
//                 animationDelay: `${-i * 0.05}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* fog — top */}
//         <div
//           className="absolute top-0 left-0 right-0 pointer-events-none"
//           style={{ height: 120, background: "linear-gradient(to bottom,rgba(8,6,4,.88),transparent)", zIndex: 4 }}
//         />

//         {/* fog — bottom (above road) */}
//         <div
//           className="absolute pointer-events-none"
//           style={{ bottom: 96, left: 0, right: 0, height: 60, background: "linear-gradient(to top,rgba(8,6,4,.92),transparent)", zIndex: 4 }}
//         />

//         {/* ── CARS ── */}
//         <div className="absolute bottom-4 left-0 w-full pointer-events-none" style={{ height: 80, zIndex: 3 }}>
//           {CAR_DEFS.map((def, i) => (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 bottom: def.bottom,
//                 animation: `carDrive ${def.dur}s linear infinite`,
//                 animationDelay: `${def.delay}s`,
//                 transform: `scale(${def.scale})`,
//                 transformOrigin: "center bottom",
//                 zIndex: def.zIndex,
//               }}
//             >
//               {def.type === "suv"    && <SuvCar    color={def.color} accent={def.accent} />}
//               {def.type === "sports" && <SportsCar color={def.color} accent={def.accent} />}
//               {def.type === "sedan"  && <SedanCar  color={def.color} accent={def.accent} />}

//               {/* exhaust puff */}
//               <div
//                 className="absolute rounded-full"
//                 style={{
//                   left: -2, bottom: 16, width: 18, height: 6,
//                   background: "rgba(180,180,160,.22)",
//                   animation: `exhaustPuff ${def.dur * 0.15}s ease-out infinite`,
//                   animationDelay: `${def.delay}s`,
//                 }}
//               />

//               {/* headlight beam */}
//               <div
//                 className="absolute"
//                 style={{
//                   right: -55, bottom: 14, width: 55, height: 8,
//                   background: "linear-gradient(90deg,rgba(255,245,180,.55),transparent)",
//                   filter: "blur(3px)",
//                   animation: `hlPulse 2s ease-in-out infinite`,
//                   animationDelay: `${i * 0.3}s`,
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* ── RPM GAUGE ── */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none"
//           style={{ zIndex: 6 }}
//         >
//           <div className="relative w-40 h-40">
//             <div
//               className="absolute rounded-full"
//               style={{ width: 96, height: 96, top: 22, left: 22, border: "1px solid rgba(201,161,74,.2)", animation: "pulseRing 2.5s ease-out infinite" }}
//             />
//             <svg width="160" height="160" viewBox="0 0 160 160">
//               <defs>
//                 <filter id="gl">
//                   <feGaussianBlur stdDeviation="2.5" result="b" />
//                   <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
//                 </filter>
//               </defs>
//               <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(201,161,74,.07)" strokeWidth="1" />
//               <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(201,161,74,.1)"  strokeWidth=".5" />
//               <path d="M22 118 A60 60 0 1 1 138 118" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="7" strokeLinecap="round" />
//               <path
//                 d="M22 118 A60 60 0 1 1 138 118" fill="none" stroke="#C9A14A"
//                 strokeWidth="7" strokeLinecap="round"
//                 strokeDasharray="251" strokeDashoffset="251"
//                 filter="url(#gl)"
//                 style={{ animation: "arcFill 2.5s ease forwards 1.3s" }}
//               />
//               {[-130,-104,-78,-52,-26,0,26,52,78,104,130].map(a => (
//                 <line key={a} x1="80" y1="13" x2="80" y2="23" stroke="rgba(201,161,74,.3)" strokeWidth="1" transform={`rotate(${a} 80 80)`} />
//               ))}
//               <g style={{ animation: "needleSwing 3s ease-in-out infinite alternate", transformOrigin: "80px 80px" }}>
//                 <line x1="80" y1="80" x2="80" y2="27" stroke="#C9A14A" strokeWidth="1.5" strokeLinecap="round" filter="url(#gl)" />
//                 <line x1="80" y1="80" x2="80" y2="92" stroke="rgba(201,161,74,.35)" strokeWidth="1"   strokeLinecap="round" />
//               </g>
//               <circle cx="80" cy="80" r="5" fill="#C9A14A" filter="url(#gl)" />
//               <circle cx="80" cy="80" r="2" fill="#080604" />
//               <text x="80" y="108" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" letterSpacing="3" fill="rgba(201,161,74,.45)">RPM</text>
//             </svg>
//           </div>
//         </motion.div>

//         {/* ── MAIN CONTENT ── */}
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <div className="max-w-lg">

//             {/* eyebrow */}
//             <div
//               className="flex items-center gap-3 mb-6"
//               style={{ animation: "fadeUp .6s ease both", animationDelay: ".2s", opacity: 0 }}
//             >
//               {/* <div style={{ height: 1, width: 0, background: "#C9A14A", animation: "lineGrow .7s ease forwards .4s" }} /> */}
//               {/* <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,161,74,.8)", fontFamily: "Inter,sans-serif" }}>
//                 Auto Vibe — Est. 2024
//               </span> */}
//             </div>

//             {/* headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
//               className="font-display pt-0 sm:pt-1 md:pt-10 leading-[0.92] mb-5"
//               style={{ fontSize: "clamp(60px,6.5vw,88px)", color: "#F5F0E8", fontWeight: 700 }}
//             >
//               Define Your
//               <br />
//               <span style={{ color: "#C9A14A", fontStyle: "italic" }}>Drive</span>
//               <br />
//               <span style={{ color: "rgba(245,240,232,.3)" }}>In Luxury</span>
//             </motion.h1>

//             {/* subtitle */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.55 }}
//               className="font-body text-base leading-relaxed mb-8"
//               style={{ color: "rgba(245,240,232,.42)", maxWidth: 310 }}
//             >
//               Luxurious accessories for the modern motorist. Where engineering
//               precision meets aesthetic mastery.
//             </motion.p>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.7 }}
//               className="flex flex-wrap items-center gap-4"
//             >
//               <Link href="/store/products">
//                 <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
//                   Explore Collection
//                 </Button>
//               </Link>
//               <Link href="/store/products?featured=true">
//                 <Button variant="outline" size="lg">
//                   Featured Pieces
//                 </Button>
//               </Link>
//             </motion.div>

//             {/* stats */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.9 }}
//               className="flex gap-10 mt-12 pt-6"
//               style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}
//             >
//               {[
//                 { num: `${stat1}+`,  label: "Premium Products" },
//                 { num: `${stat2}K+`, label: "Happy Customers"  },
//                 { num: `${stat3}%`,  label: "Authentic Quality" },
//               ].map(({ num, label }) => (
//                 <div key={label}>
//                   <p className="font-display text-2xl" style={{ color: "#C9A14A" }}>{num}</p>
//                   <p className="font-sans mt-1" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,.28)" }}>
//                     {label}
//                   </p>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         {/* scroll indicator */}
//         <motion.button
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.4 }}
//           onClick={scrollDown}
//           className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors"
//           style={{ color: "rgba(245,240,232,.4)", zIndex: 10 }}
//         >
//           <span style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "sans-serif" }}>Scroll</span>
//           <ChevronDown className="w-4 h-4 animate-bounce" />
//         </motion.button>
//       </div>
//     </section>
//   );
// }
















// 3rd campus 





"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BadgeCheck, Wallet, Gift, Truck } from "lucide-react";

// ─── animation helpers ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

const headlineVariants = {
  initial: { y: "105%" },
  animate: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ─── marquee items ────────────────────────────────────────────────────────────

const marqueeItems = [
  { icon: <BadgeCheck className="w-[13px] h-[13px]" />, text: "Premium Quality" },
  { icon: <Wallet className="w-[13px] h-[13px]" />, text: "COD Available" },
  { icon: <Gift className="w-[13px] h-[13px]" />, text: "Free Gift on Orders ₹999+" },
  { icon: <Truck className="w-[13px] h-[13px]" />, text: "Free Shipping Above ₹399" },
];

// ─── slideshow images ─────────────────────────────────────────────────────────
// 👇 Replace these with your actual offer banners / product images from /public/

const slides = [
  {
    id: 1,
    image: "/hero/image3.png",
  },
  {
    id: 2,
    image: "/hero/image4.png",
  },
  {
    id: 3,
    image: "/hero/image7.jpg",
  },
  {
    id: 4,
    image: "/hero/image5.jpg",
  },
  {
    id: 5,
    image: "/hero/image6.jpg",
  },
];

// Ken Burns drift directions — cycles through for variety
const driftVariants = [
  // scale up + drift top-left → bottom-right
  {
    initial: { scale: 1.18, x: "3%", y: "3%" },
    animate: { scale: 1.0, x: "0%", y: "0%" },
  },
  // scale up + drift bottom-right → top-left
  {
    initial: { scale: 1.18, x: "-3%", y: "-3%" },
    animate: { scale: 1.0, x: "0%", y: "0%" },
  },
  // scale up + drift right → left
  {
    initial: { scale: 1.15, x: "4%", y: "0%" },
    animate: { scale: 1.0, x: "-1%", y: "0%" },
  },
  // scale up + slight vertical drift
  {
    initial: { scale: 1.14, x: "0%", y: "-4%" },
    animate: { scale: 1.0, x: "0%", y: "1%" },
  },
  // zoom in slowly from centre
  {
    initial: { scale: 1.22, x: "0%", y: "0%" },
    animate: { scale: 1.0, x: "0%", y: "0%" },
  },
];

const INTERVAL = 4200;

// ─── ProductShowcase → now pure cinematic slideshow ──────────────────────────

function ImageSlideshow() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const drift = driftVariants[current % driftVariants.length];

  return (
    <motion.div
      className="relative"
      style={{
        width: "min(520px, 84vw)",
        height: "min(300px, 100vw)",
        maxWidth: 520,
        maxHeight: 300,
      }}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── IMAGES — stacked, crossfade ── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {slides.map((slide, i) =>
            i === current ? (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              >
                {/* Ken Burns motion wrapper */}
                <motion.div
                  className="absolute inset-0"
                  initial={drift.initial}
                  animate={drift.animate}
                  transition={{ duration: INTERVAL / 1000 + 0.6, ease: "easeOut" }}
                >
                  <img
                    src={slide.image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ filter: "brightness(0.78) saturate(0.9)" }}
                  />
                </motion.div>

                {/* very subtle gold bloom at bottom edge — pure atmosphere */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: "38%",
                    background:
                      "linear-gradient(to top, rgba(12,15,7,0.72) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* ── thin gold line — top entrance accent ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: 1.5, background: "linear-gradient(90deg, #B99444 0%, transparent 65%)" }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── vertical line — left edge ── */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 z-20 pointer-events-none"
        style={{ width: 1.5, background: "linear-gradient(to bottom, #B99444 0%, transparent 70%)" }}
        initial={{ scaleY: 0, transformOrigin: "top" }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.3, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── slide counter — minimal, bottom-right ── */}
      <div
        className="absolute bottom-4 right-4 z-30 pointer-events-none"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: "0.18em",
          color: "rgba(185,148,68,0.45)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {String(current + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span style={{ opacity: 0.25 }}>&thinsp;/&thinsp;{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* ── progress line — bottom edge, no dots ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30"
        style={{ height: 2, background: "rgba(185,148,68,0.1)" }}
      >
        <motion.div
          key={current}
          className="h-full"
          style={{ background: "#B99444" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTERVAL / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  const scrollDown = () => {
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "#0F1109" }}>

      {/* bg atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 30%, rgba(185,148,68,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 0% 80%, rgba(50,60,30,0.15) 0%, transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,148,68,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(185,148,68,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── MARQUEE ── */}
      <div
        className="relative z-20 overflow-hidden border-b top-16"
        style={{ background: "rgba(30,36,16,0.7)", borderColor: "rgba(185,148,68,0.15)", padding: "8px 0" }}
      >
        <div className="flex w-max whitespace-nowrap" style={{ animation: "av-marquee 28s linear infinite" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2"
              style={{
                padding: "0 28px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(185,148,68,0.65)",
              }}
            >
              <span style={{ color: "rgba(185,148,68,0.5)" }}>{item.icon}</span>
              {item.text}
              <span style={{ display: "inline-block", width: 3, height: 3, borderRadius: "50%", background: "rgba(185,148,68,0.2)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-10 px-6 pt-10 sm:grid-cols-2 sm:gap-8 sm:px-11 sm:pt-14 lg:px-16 xl:px-20">

        {/* LEFT */}
        <div className="flex flex-col">

          {/* eyebrow */}
          <motion.div className="mb-6 flex items-center gap-3" {...fadeUp(0.2)}>
            <div style={{ width: 28, height: 1, background: "#B99444" }} />
            {/* <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 10, fontWeight: 400,
              letterSpacing: "0.32em", textTransform: "uppercase",
              color: "#B99444",
            }}>
              Auto Vibe · Premium Collection
            </span> */}
          </motion.div>

          {/* headline */}
          <div className="mb-6">
            {[
              { text: "Define", extraStyle: {} },
              { text: "Your Drive", extraStyle: { color: "#C9A84C", fontStyle: "italic" as const, paddingLeft: "1.5rem" } },
              { text: "In Luxury", extraStyle: { color: "rgba(237,230,214,0.22)" } },
            ].map(({ text, extraStyle }, i) => (
              <div key={text} className="overflow-hidden">
                <motion.span
                  className="block leading-[0.93]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(58px, 11vw, 92px)",
                    fontWeight: 300,
                    color: "#EDE6D6",
                    ...extraStyle,
                  }}
                  custom={0.38 + i * 0.14}
                  variants={headlineVariants}
                  initial="initial"
                  animate="animate"
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </div>

          {/* subtitle */}
          <motion.p
            className="mb-8 max-w-sm"
            style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(237,230,214,0.45)", lineHeight: 1.85 }}
            {...fadeUp(0.95)}
          >
            Luxurious accessories for the modern motorist — where engineering precision meets aesthetic mastery.
          </motion.p>

          {/* CTAs */}
          <motion.div className="mb-9 flex flex-wrap gap-3" {...fadeUp(1.1)}>
            <Link href="/store/products">
              <button
                className="group relative inline-flex items-center gap-3 overflow-hidden border px-6 py-[14px]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "#EDE6D6", borderColor: "rgba(237,230,214,0.25)", background: "transparent",
                }}
              >
                <span
                  className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
                  style={{ background: "#B99444", transitionTimingFunction: "cubic-bezier(.16,1,.3,1)" }}
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0F1109]">Explore Collection</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0F1109]" />
              </button>
            </Link>
            <Link href="/store/products?featured=true">
              <button
                className="inline-flex items-center gap-3 border px-6 py-[14px] transition-colors duration-300 hover:text-[#C9A84C]"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 400,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(237,230,214,0.4)", borderColor: "rgba(237,230,214,0.1)", background: "transparent",
                }}
              >
                Featured Pieces
              </button>
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div
            className="flex border-t pb-10 pt-6 sm:pb-14"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
            {...fadeUp(1.3)}
          >
            {[
              { num: "500+", label: "Premium Products" },
              { num: "15K+", label: "Happy Customers" },
              { num: "100%", label: "Authentic Quality" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="border-r pr-6 mr-6 last:border-none last:pr-0 last:mr-0"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                <span className="block leading-none" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: "#C9A84C" }}>
                  {num}
                </span>
                <span className="mt-1 block" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(237,230,214,0.3)" }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — cinematic image slideshow */}
        <div className="flex items-center justify-center pb-10 sm:justify-end sm:pb-14">
          <ImageSlideshow />
        </div>
      </div>

      {/* scroll cue — mobile only */}
      <motion.button
        onClick={scrollDown}
        className="mx-auto mb-7 flex flex-col items-center gap-2 sm:hidden"
        {...fadeUp(1.8)}
      >
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 9, fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(237,230,214,0.2)" }}>
          Scroll
        </span>
        <ChevronDown className="h-3 w-3 animate-bounce" style={{ color: "rgba(185,148,68,0.4)" }} />
      </motion.button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Barlow:wght@300;400&family=Barlow+Condensed:wght@300;400;500;600&display=swap');
        @keyframes av-marquee { to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
