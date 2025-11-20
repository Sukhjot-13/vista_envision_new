'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Lightbulb, Palette, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Concept",
    description:
      "We start by understanding your vision, goals, and requirements. Through collaborative discussions, we define the project scope and creative direction.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Design & Development",
    description:
      "Our team creates initial concepts and draft renders. We iterate based on your feedback to ensure every detail aligns with your vision.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Refinement & Rendering",
    description:
      "We polish every aspect, from lighting and materials to camera angles. High-resolution renders are produced with meticulous attention to detail.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Delivery & Support",
    description:
      "Final assets are delivered in your preferred format. We provide ongoing support and revisions to ensure your complete satisfaction.",
    icon: CheckCircle,
  },
];

function ProcessStep({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        {/* Number and Icon */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-20 h-20 bg-[#F4D854] rounded-full flex items-center justify-center">
              <Icon className="w-9 h-9 text-[#474846]" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#474846] rounded-full flex items-center justify-center">
              <span className="text-[#F4D854] text-sm">{step.number}</span>
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="w-0.5 h-24 bg-[#F4D854]/30 mx-auto mt-4" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-12">
          <h3 className="text-[#474846] mb-3">{step.title}</h3>
          <p className="text-[#474846]/70">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-gray-50" id="process">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#474846] mb-4">Our Process</h2>
          <p className="text-[#474846]/70 max-w-2xl mx-auto">
            From concept to completion, we follow a proven workflow that ensures
            exceptional results every time.
          </p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
