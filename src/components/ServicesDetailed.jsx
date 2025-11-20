'use client';

import { motion } from "motion/react";
import { ImageWithFallback } from "./ui/image-with-fallback";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Architectural Visualization",
    description:
      "Photorealistic 3D renderings that bring architectural designs to life before construction begins. We focus on lighting, texture, and atmosphere to create compelling visuals.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
    features: ["Exterior Rendering", "Interior Rendering", "3D Floor Plans", "Virtual Tours"]
  },
  {
    title: "Interior Design",
    description:
      "Detailed interior visualizations helping clients visualize space, furniture, and lighting. Perfect for marketing materials and design approval.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
    features: ["Residential Interiors", "Commercial Spaces", "Furniture Layout", "Lighting Studies"]
  },
  {
    title: "Product Visualization",
    description:
      "High-end product rendering for marketing and e-commerce. Show your products in the best light with perfect studio setups or lifestyle environments.",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=2000",
    features: ["Studio Rendering", "Lifestyle Shots", "360° Views", "Technical Illustrations"]
  },
  {
    title: "3D Animation",
    description:
      "Cinematic walkthroughs and product animations that tell a story. Engage your audience with dynamic motion and compelling narratives.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
    features: ["Architectural Walkthroughs", "Product Demos", "Construction Phasing", "Marketing Reels"]
  },
];

export function ServicesDetailed() {
  return (
    <section className="py-24 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#474846] mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#474846]/70 max-w-2xl mx-auto text-lg"
          >
            We combine artistic vision with technical excellence to deliver
            stunning visualizations that exceed expectations.
          </motion.p>
        </div>

        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-8">
                <h3 className="text-3xl font-bold text-[#474846]">
                  {service.title}
                </h3>
                <p className="text-[#474846]/80 text-lg leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-[#474846]/90">
                            <CheckCircle2 className="h-5 w-5 text-[#F4D854] mr-3 flex-shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
