"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ShaderImage } from "@/components/canvas/ShaderImage";

const categories = ["All", "Websites", "Web Apps", "Marketing"];

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web Apps",
    image: "/images/project1.png",
    tags: ["React", "WebGL", "Data Viz"],
  },
  {
    id: 2,
    title: "Luxury Real Estate",
    category: "Websites",
    image: "/images/project2.png",
    tags: ["Next.js", "Three.js", "GSAP"],
  },
  {
    id: 3,
    title: "E-commerce Growth",
    category: "Marketing",
    image: "/images/project3.png",
    tags: ["SEO", "Analytics", "Conversion"],
  },
  {
    id: 4,
    title: "SaaS Landing Page",
    category: "Websites",
    image: "/images/project4.png",
    tags: ["Next.js", "Tailwind", "Framer"],
  },
  {
    id: 5,
    title: "Healthcare Portal",
    category: "Web Apps",
    image: "/images/project5.png",
    tags: ["Angular", "Security", "UX"],
  },
  {
    id: 6,
    title: "Brand Identity Revamp",
    category: "Marketing",
    image: "/images/project6.png",
    tags: ["Strategy", "Design", "Identity"],
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Our <span className="text-gradient">Featured Work</span>
          </h1>
          <p className="text-xl text-gray-400">
            A selection of our premium projects showcasing our expertise in high-end design, WebGL development, and digital strategy.
          </p>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all hover-target ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-md"
              }`}
            >
              {category}
            </button>
          ))}
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/50 border border-white/10"
              >
                {/* WebGL Shader Image */}
                <ShaderImage url={project.image} />
                
                {/* Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 pointer-events-none" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                  <div>
                    <p className="text-primary font-bold text-sm mb-2 drop-shadow-md">{project.category}</p>
                    <h3 className="text-2xl font-black text-white mb-3 drop-shadow-lg">{project.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-semibold px-2 py-1 bg-black/50 border border-white/20 rounded backdrop-blur-md text-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
