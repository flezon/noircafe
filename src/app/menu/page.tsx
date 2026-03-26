"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const MENU_CATEGORIES = [
  {
    title: "Origen Único",
    items: [
      { name: "Etiopía Yirgacheffe", price: "5.50", desc: "Notas florales de jazmín y limón" },
      { name: "Colombia Huila", price: "4.80", desc: "Cuerpo medio con matices de caramelo" },
      { name: "Panama Gesha", price: "12.00", desc: "Rareza excepcional con notas de bergamota" },
    ]
  },
  {
    title: "Maison Noir (Espresso)",
    items: [
      { name: "Noir Americano", price: "3.50", desc: "Doble shot con agua purificada" },
      { name: "Cortado Noir", price: "4.00", desc: "Balance perfecto entre leche y café" },
      { name: "Flat White", price: "4.50", desc: "Textura sedosa para el purista" },
    ]
  },
  {
    title: "Artesanías Frías",
    items: [
      { name: "Cold Brew 24h", price: "5.00", desc: "Infusión en frío lenta para dulzura máxima" },
      { name: "Espresso Tonic", price: "6.00", desc: "Refrescante con notas cítricas" },
    ]
  }
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-noir-black text-white selection:bg-gold-primary/30">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-24"
        >
          <span className="text-gold-primary text-xs uppercase tracking-[0.4em] font-bold block mb-4">La Colección Nocturna</span>
          <h1 className="text-6xl md:text-8xl font-playfair font-bold tracking-tight">Menú <span className="text-gold-primary italic">Noir</span></h1>
        </motion.div>

        <div className="space-y-24">
          {MENU_CATEGORIES.map((category, catIdx) => (
            <section key={catIdx}>
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-4 mb-10 font-medium">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {category.items.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group cursor-default"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-playfair font-semibold text-white group-hover:text-gold-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-gold-secondary font-medium font-inter tracking-wider">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-10 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 text-center"
        >
          <h3 className="text-2xl font-playfair font-bold mb-4">¿Desea una experiencia privada?</h3>
          <p className="text-white/40 text-sm mb-8">Nuestras salas de degustación están abiertas para sesiones de cata guiada.</p>
          <a href="/reservas" className="inline-block px-10 py-4 bg-white text-noir-black font-bold rounded-full hover:scale-105 transition-transform">
            Reservar Sesión
          </a>
        </motion.div>
      </div>
    </main>
  );
}
