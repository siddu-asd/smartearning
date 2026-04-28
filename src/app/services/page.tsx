"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { Globe, Server, TrendingUp, Search, PenTool, BarChart } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Custom Website Development",
    description: "Tailor-made websites built with React, Next.js, and modern CSS frameworks. Fast, responsive, and designed to convert.",
    features: ["Responsive Design", "SEO Optimization", "Performance Focused"]
  },
  {
    icon: <Server className="w-8 h-8 text-accent" />,
    title: "Web Applications",
    description: "Complex, scalable web applications that solve real business problems and provide seamless user experiences.",
    features: ["Custom Dashboards", "API Integrations", "Database Architecture"]
  },
  {
    icon: <PenTool className="w-8 h-8 text-blue-400" />,
    title: "UI/UX Design",
    description: "Premium, Awwwards-level interface design focused on user journey, accessibility, and high-end aesthetics.",
    features: ["Wireframing", "Prototyping", "Interaction Design"]
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-green-400" />,
    title: "Digital Marketing",
    description: "Data-driven marketing campaigns that increase your brand visibility and drive qualified leads to your business.",
    features: ["Social Media Marketing", "PPC Campaigns", "Content Strategy"]
  },
  {
    icon: <Search className="w-8 h-8 text-purple-400" />,
    title: "SEO Optimization",
    description: "Comprehensive search engine optimization to help your business rank higher on Google and attract organic traffic.",
    features: ["On-page SEO", "Technical SEO", "Keyword Research"]
  },
  {
    icon: <BarChart className="w-8 h-8 text-yellow-400" />,
    title: "Analytics & Conversion",
    description: "Deep dive into user data to understand behavior and optimize your funnel for maximum conversion rates.",
    features: ["Google Analytics", "A/B Testing", "Heatmaps"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-card border border-card-border text-sm font-medium mb-6 text-primary"
          >
            Our Expertise
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Services that <span className="text-gradient">Deliver Results</span>
          </h1>
          <p className="text-xl text-gray-400">
            We offer end-to-end digital solutions designed to elevate your brand, engage your audience, and drive sustainable growth.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <GlassCard className="h-full flex flex-col p-8 group hover:scale-[1.02] transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-8 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-3 mt-auto">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4} className="mt-32 text-center">
          <div className="glass p-12 rounded-3xl relative overflow-hidden border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
              Not sure what you need?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">
              Book a free consultation and let's discuss how we can help your business grow.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors relative z-10"
            >
              Get Free Consultation
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
