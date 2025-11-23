'use client';

import { motion } from "motion/react";
import { Building2, Home, Box, MonitorPlay } from "lucide-react";

const services = [
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Architectural Visualization",
    description:
      "Photorealistic 3D renderings that bring architectural designs to life before construction begins.",
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Interior Design",
    description:
      "We create timeless, harmonious interiors with personalized designs that turn your ideas into beautiful, livable spaces.",
  },
  {
    icon: <Box className="h-8 w-8" />,
    title: "Product Visualization",
    description:
      "High-end product rendering for marketing and e-commerce with perfect studio setups.",
  },
  {
    icon: <MonitorPlay className="h-8 w-8" />,
    title: "3D Animation",
    description:
      "Cinematic walkthroughs and product animations that tell a story and engage your audience.",
  },
];

export function Services() {
  return (
    <section className="py-24 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
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
            We provide a comprehensive range of 3D visualization services to
            meet all your design needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-[#F4D854] mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-[#474846] mb-4">
                {service.title}
              </h3>
              <p className="text-[#474846]/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
