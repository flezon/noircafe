"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const DAYS = [
  { day: "Lun", date: 27 },
  { day: "Mar", date: 28 },
  { day: "Mie", date: 29 },
  { day: "Jue", date: 30 },
  { day: "Vie", date: 31, holiday: true },
  { day: "Sab", date: 1 },
  { day: "Dom", date: 2 },
];

const TIME_SLOTS = [
  { time: "08:00 AM", status: "available" },
  { time: "09:30 AM", status: "reserved" },
  { time: "11:00 AM", status: "available" },
  { time: "01:00 PM", status: "reserved" },
  { time: "03:00 PM", status: "available" },
  { time: "05:00 PM", status: "available" },
  { time: "07:00 PM", status: "reserved" },
  { time: "08:30 PM", status: "available" },
];

export default function ReservasPage() {
  const [selectedDay, setSelectedDay] = useState(2); // Mie 29
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (isConfirmed) {
    return (
      <main className="min-h-screen bg-noir-black text-white flex items-center justify-center p-6">
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <div className="w-20 h-20 bg-gold-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-playfair font-bold mb-4">¡Reserva Confirmada!</h2>
          <p className="text-white/60 mb-8">
            Hemos registrado tu mesa para el <span className="text-white font-medium">{DAYS[selectedDay].day} {DAYS[selectedDay].date} de Mayo</span> a las <span className="text-gold-primary font-bold">{selectedTime}</span>.
          </p>
          <a 
            href="/"
            className="inline-block px-8 py-3 bg-white/10 border border-white/10 rounded-full text-sm font-bold hover:bg-white/20 transition-all"
          >
            Volver al Inicio
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-noir-black text-white selection:bg-gold-primary/30">
      <Navbar />

      <div className="pt-32 pb-20 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 tracking-tight">
            Guárdanos un <span className="text-gold-primary italic">sitio</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto font-light">
            Nuestra barra es pequeña y el café vuela. Elige cuándo vienes y nosotros nos encargamos de que tu taza esté lista.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-zinc-100">
          {/* Left Column: Date & Time Selection */}
          <div className="lg:col-span-2 space-y-12">

            {/* Date Selection */}
            <section>
              <h3 className="text-sm uppercase tracking-[0.3em] text-gold-secondary mb-6 font-semibold">1. Seleccionar Fecha</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {DAYS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${selectedDay === idx
                      ? "bg-gold-primary border-gold-primary text-noir-black shadow-[0_0_20px_rgba(197,163,115,0.4)]"
                      : "bg-white/5 border-white/10 hover:border-white/30"
                      }`}
                  >
                    <span className={`text-xs uppercase font-bold tracking-wider mb-1 ${selectedDay === idx ? "text-noir-black/70" : "text-white/40"}`}>
                      {item.day}
                    </span>
                    <span className="text-2xl font-playfair font-black">
                      {item.date}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Time Selection */}
            <section>
              <h3 className="text-sm uppercase tracking-[0.3em] text-gold-secondary mb-6 font-semibold">2. Horarios Disponibles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TIME_SLOTS.map((slot, idx) => (
                  <button
                    key={idx}
                    disabled={slot.status === "reserved"}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-4 rounded-xl text-sm font-bold transition-all duration-300 border ${slot.status === "reserved"
                      ? "bg-noir-black border-white/5 text-white/20 cursor-not-allowed opacity-50 line-through"
                      : selectedTime === slot.time
                        ? "bg-white text-noir-black border-white shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/40"
                      }`}
                  >
                    {slot.time}
                    {slot.status === "reserved" && (
                      <span className="block text-[10px] mt-1 uppercase tracking-tighter opacity-50">Reservado</span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Details Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-playfair font-bold mb-6">Detalles de Reserva</h3>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-primary transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Comensales</label>
                  <select className="w-full bg-noir-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold-primary transition-colors text-white appearance-none cursor-pointer">
                    <option className="bg-noir-black text-white">1 Persona</option>
                    <option className="bg-noir-black text-white">2 Personas</option>
                    <option className="bg-noir-black text-white">3 Personas</option>
                    <option className="bg-noir-black text-white">4 Personas</option>
                    <option className="bg-noir-black text-white">Más de 4 (Contacto Directo)</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/40">Fecha:</span>
                    <span className="font-medium">{DAYS[selectedDay].day} {DAYS[selectedDay].date} de Mayo</span>
                  </div>
                  <div className="flex justify-between text-sm mb-6">
                    <span className="text-white/40">Hora:</span>
                    <span className="font-medium text-gold-primary">{selectedTime || "No seleccionada"}</span>
                  </div>

                  <button
                    disabled={!selectedTime}
                    onClick={() => setIsConfirmed(true)}
                    className="w-full py-4 bg-gradient-to-r from-gold-primary to-gold-secondary rounded-xl text-noir-black font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:grayscale transition-all duration-300"
                  >
                    Confirmar Reserva
                  </button>
                  <p className="text-[10px] text-center text-white/20 mt-4 leading-relaxed">
                    15 minutos de cortesía. Después de eso, el café se enfría y tu mesa pasa al siguiente. No es nada personal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
