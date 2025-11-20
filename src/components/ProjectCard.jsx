'use client';

import { motion } from "motion/react";
import { ImageWithFallback } from "./ui/image-with-fallback";

export function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 z-10" />
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xl font-bold text-[#474846] mb-1 group-hover:text-[#F4D854] transition-colors">
        {project.title}
      </h3>
      <p className="text-[#474846]/60 text-sm">{project.category}</p>
    </motion.div>
  );
}
