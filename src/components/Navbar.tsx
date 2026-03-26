"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Fade in nav background after 50px of scroll
  const navBgOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 50], [0, 12]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Story", "Craft", "Menu", "Roasts", "Visit"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 h-14 flex items-center",
        scrolled ? "border-b border-white/5" : "bg-transparent"
      )}
    >
      <motion.div 
        style={{ 
          backgroundColor: `rgba(8, 6, 10, ${navBgOpacity.get() * 0.8})`,
          backdropFilter: `blur(${navBlur.get()}px)`,
          WebkitBackdropFilter: `blur(${navBlur.get()}px)`,
        }}
        className="absolute inset-0 -z-10"
      />
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1 group cursor-pointer">
          <span className="text-xl font-playfair font-bold tracking-tight text-white/90">
            NOIR
          </span>
          <span className="w-1 h-1 rounded-full bg-gold-primary mt-2 group-hover:bg-gold-secondary transition-colors" />
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Historia", "Arte", "Carta", "Tostados", "Visita"].map((link) => (
            <a
              key={link}
              href={link === "Carta" ? "/menu" : `#${link.toLowerCase()}`}
              className="text-sm font-medium text-white/50 hover:text-gold-secondary transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="/reservas" className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-gold-primary to-gold-secondary rounded-full opacity-70 group-hover:opacity-100 blur-[2px] transition duration-300" />
          <div className="relative bg-noir-black px-5 py-2 rounded-full leading-none flex items-center">
            <span className="text-sm font-semibold text-white/90 group-hover:text-white transition duration-200">
              Reservar Mesa
            </span>
          </div>
        </a>
      </div>
    </motion.nav>
  );
}
