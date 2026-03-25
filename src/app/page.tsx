import Navbar from "@/components/Navbar";
import ScrollCanvas from "@/components/ScrollCanvas";
import NarrativeSection from "@/components/NarrativeSection";

export default function Home() {
  return (
    <main className="relative bg-noir-black">
      <Navbar />

      {/* The Scrollytelling Engine */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ScrollCanvas baseUrl="/images/sequence/frames" />
      </div>

      {/* Content Layers */}
      <div className="relative z-10">
        {/* 1. HERO (0-15%) */}
        <section className="h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--noir-accent)_0%,_transparent_70%)] opacity-10 pointer-events-none" />
          <div className="text-center relative z-10 px-4">
            <h1 className="text-7xl md:text-9xl font-playfair font-bold text-white tracking-tighter mb-4 text-glow filter drop-shadow-[0_0_40px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
              NOIR CAFÉ
            </h1>
            <p className="text-xl md:text-3xl font-playfair font-bold text-gold-secondary mb-8 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              Darkness, perfected.
            </p>
            <p className="max-w-md mx-auto text-white/70 text-sm font-medium tracking-[0.2em] uppercase bg-black/40 py-2 rounded-full border border-white/5">
              Specialty coffee, crafted for those who demand more than ordinary.
            </p>
          </div>
        </section>

        {/* Space for the explosion to happen */}
        <div className="h-[50vh]" />

        {/* 2. CRAFT REVEAL (15-40%) */}
        <NarrativeSection align="left">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
            Obsessively crafted, <br />
            <span className="text-gold-primary">from origin to cup.</span>
          </h2>
          <div className="space-y-4 text-white/55 text-lg max-w-lg">
            <p>
              Single-origin beans, sourced from high altitude. Roasted in small batches for depth, sweetness, and complexity.
            </p>
            <p className="font-medium text-white/80">
              Every gram measured. Every variable controlled. Every cup, a statement.
            </p>
          </div>
        </NarrativeSection>

        {/* 3. ROAST & PROCESS (40-65%) */}
        <NarrativeSection align="right">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
            The roast is where <br />
            <span className="text-gold-secondary">the magic lives.</span>
          </h2>
          <div className="space-y-4 text-white/55 text-lg max-w-lg ml-auto">
            <p>
              Precision roasting unlocks complexity—caramel, citrus, dark chocolate, and beyond.
            </p>
            <p>
              Small-batch discipline means every bag is traceable, fresh, and intentional.
            </p>
          </div>
        </NarrativeSection>

        {/* 4. EXTRACTION & SENSORY (65-85%) */}
        <NarrativeSection align="left">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
            Nine bars of pressure. <br />
            <span className="text-gold-primary">Infinite layers of flavor.</span>
          </h2>
          <p className="text-white/55 text-lg max-w-lg">
            Precision extraction preserves every note—sweet, bitter, complex, and alive.
            Temperature-controlled brewing unlocks what lesser methods leave behind.
          </p>
        </NarrativeSection>

        {/* 5. REASSEMBLY & CTA (85-100%) */}
        <section className="h-[150vh] flex items-center justify-center">
          <div className="text-center sticky top-[40%] translate-y-[-50%]">
            <h2 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-8">
              Taste the obsession.
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="px-10 py-4 bg-gradient-to-r from-gold-primary to-gold-secondary rounded-full text-noir-black font-bold text-lg hover:scale-105 transition-transform duration-300">
                Reserve Your Table
              </button>
              <button className="px-10 py-4 border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/5 transition-colors duration-300">
                Explore the Menu
              </button>
            </div>
            <p className="mt-8 text-white/30 text-sm uppercase tracking-[0.3em]">
              Crafted for mornings, afternoons, and every quiet moment between.
            </p>
          </div>
        </section>
      </div>

      {/* Footer-like placeholder for scroll depth */}
      <div className="h-[20vh] bg-noir-black" />
    </main>
  );
}
