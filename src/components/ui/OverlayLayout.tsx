"use client";

import { motion } from "framer-motion";

// Extreme Text Splitting Component
const SplitText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const chars = text.split("");
  return (
    <span className="inline-block overflow-hidden">
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "150%", rotateZ: 20, opacity: 0 }}
          whileInView={{ y: "0%", rotateZ: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 200,
            delay: delay + index * 0.02,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Aggressive Parallax Image Reveal
const ParallaxImage = ({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) => {
  return (
    <div className="relative overflow-hidden aspect-[16/9] w-full rounded-sm group">
      {/* Intense mask reveal */}
      <motion.div
        className="absolute inset-0 z-10 bg-[#ff0055]"
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1], delay }}
      />
      {/* Aggressive scale-down on reveal */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
        initial={{ scale: 1.5 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.2 }}
      />
    </div>
  );
};

const fadeUpExtreme = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } }
};

export function OverlayLayout() {
  return (
    <div className="w-full text-white selection:bg-[#ff0055] selection:text-white font-sans pointer-events-none">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full flex flex-col justify-center px-6 md:px-16 lg:px-32 relative pointer-events-auto">
        <div className="max-w-6xl z-10">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-1 w-24 bg-[#00ffcc] mb-8 origin-left"
          />
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.9] mb-8 uppercase mix-blend-difference">
            <SplitText text="Absolute" /> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#00ffcc]">
              <SplitText text="Limit." delay={0.2} />
            </span>
          </h1>
          <motion.p variants={fadeUpExtreme} initial="hidden" whileInView="visible" className="text-xl md:text-3xl text-gray-300 max-w-3xl font-medium leading-relaxed mix-blend-difference">
            Pushing the boundaries of what the web can do. Pure WebGL. Intense Shaders. Extreme Physics.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY */}
      <section className="h-screen w-full flex flex-col justify-center px-6 md:px-32 relative pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
              <SplitText text="No More" /> <br />
              <SplitText text="Boring." delay={0.2} />
            </h2>
          </div>
          <motion.div variants={fadeUpExtreme} initial="hidden" whileInView="visible" className="md:col-span-7 bg-black/40 backdrop-blur-xl p-10 border border-white/10 rounded-3xl">
            <p className="text-white font-bold leading-relaxed text-2xl mb-6">
              We build high-octane digital experiences for brands that refuse to blend in. 
            </p>
            <p className="text-gray-400 font-medium leading-relaxed text-lg">
              This is not a template. This is a custom-engineered WebGL environment featuring aggressive post-processing pipelines, thousands of particles, and frame-perfect DOM animations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: COMPREHENSIVE EXPERTISE */}
      <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-32 py-32 relative pointer-events-auto">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-20 uppercase">
          <SplitText text="The Stack" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-20">
          {[
            { num: "01", title: "React Three Fiber", desc: "GPU-accelerated rendering utilizing the raw power of Three.js within the React ecosystem." },
            { num: "02", title: "Post-Processing", desc: "Cinematic Bloom, Chromatic Aberration, and dynamic Noise injected directly into the WebGL pipeline." },
            { num: "03", title: "Framer Motion", desc: "Aggressive, hardware-accelerated DOM physics for text splitting and extreme parallax masking." },
            { num: "04", title: "Next.js App Router", desc: "Blazing fast server-side rendering architecture supporting our heavy graphical frontend." }
          ].map((item, i) => (
            <motion.div key={item.num} variants={fadeUpExtreme} initial="hidden" whileInView="visible" className="group">
              <h3 className="text-7xl font-black text-white/10 group-hover:text-[#ff0055] transition-colors duration-500 mb-2">{item.num}</h3>
              <h4 className="text-3xl font-bold mb-4 uppercase">{item.title}</h4>
              <p className="text-gray-400 font-medium leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: EXTREME PORTFOLIO */}
      <section className="w-full flex flex-col justify-center px-6 md:px-32 py-32 relative pointer-events-auto min-h-[150vh]">
        <div className="mb-20">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 uppercase">
            <SplitText text="Work" />
          </h2>
        </div>

        <div className="space-y-40">
          {/* Project 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
              <ParallaxImage src="/images/project1.png" alt="Fintech" />
            </div>
            <motion.div variants={fadeUpExtreme} initial="hidden" whileInView="visible" className="md:col-span-4 space-y-6">
              <h3 className="text-5xl font-black uppercase">FinTech</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Zero-latency global trading dashboard engineered for extreme data loads.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#ff0055]/20 text-[#ff0055] text-sm font-bold uppercase rounded-full">WebSockets</span>
                <span className="px-4 py-2 bg-[#00ffcc]/20 text-[#00ffcc] text-sm font-bold uppercase rounded-full">Next.js</span>
              </div>
            </motion.div>
          </div>

          {/* Project 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div variants={fadeUpExtreme} initial="hidden" whileInView="visible" className="md:col-span-4 space-y-6 order-2 md:order-1 text-right">
              <h3 className="text-5xl font-black uppercase">Real Estate</h3>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Immersive 3D property viewer directly inside the browser. Sell villas before they exist.
              </p>
              <div className="flex flex-wrap gap-2 justify-end">
                <span className="px-4 py-2 bg-[#00ffcc]/20 text-[#00ffcc] text-sm font-bold uppercase rounded-full">WebGL</span>
                <span className="px-4 py-2 bg-[#ff0055]/20 text-[#ff0055] text-sm font-bold uppercase rounded-full">Three.js</span>
              </div>
            </motion.div>
            <div className="md:col-span-8 order-1 md:order-2">
              <ParallaxImage src="/images/project2.png" alt="Real Estate" delay={0.2} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section className="h-screen w-full flex flex-col justify-center px-6 md:px-32 bg-black/90 relative pointer-events-auto border-t-[20px] border-[#ff0055]">
        <div className="max-w-5xl">
          <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter mb-12 uppercase leading-[0.8]">
            <SplitText text="Ignite" /> <br />
            <span className="text-[#00ffcc]"><SplitText text="It." delay={0.2} /></span>
          </h2>
          <motion.div variants={fadeUpExtreme} initial="hidden" whileInView="visible">
            <a 
              href="https://wa.me/918096749003" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#ff0055] text-white font-black text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-sm hover:scale-105"
            >
              Start Project
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
