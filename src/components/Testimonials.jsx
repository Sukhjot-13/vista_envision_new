'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Vista Envision transformed our architectural concepts into breathtaking visualizations. Their attention to detail and professionalism exceeded our expectations.",
    author: "Sarah Chen",
    role: "Principal Architect",
    company: "Chen & Associates",
  },
  {
    id: 2,
    quote:
      "The product renders they created for our new line were instrumental in our successful launch. Absolutely stunning work that drove real results.",
    author: "Michael Rodriguez",
    role: "Marketing Director",
    company: "Luxe Goods Co.",
  },
  {
    id: 3,
    quote:
      "Working with Vista Envision was a seamless experience. They understood our vision immediately and delivered animations that truly brought our project to life.",
    author: "Emily Thompson",
    role: "Creative Director",
    company: "Studio Eleven",
  },
];

const clients = [
  "Chen & Associates",
  "Luxe Goods Co.",
  "Studio Eleven",
  "Urban Developers",
  "Design House",
  "Premier Properties",
];

function TestimonialCard({ testimonial, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white p-8 rounded-lg shadow-lg relative"
    >
      {/* Gold Accent */}
      <div className="absolute top-0 left-8 w-16 h-1 bg-[#F4D854] -translate-y-1/2" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-[#F4D854] text-[#F4D854]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[#474846] mb-6 italic">"{testimonial.quote}"</p>

      {/* Author */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-[#474846]">{testimonial.author}</p>
        <p className="text-[#474846]/60 text-sm">
          {testimonial.role} at {testimonial.company}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonials({ showClients = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const clientsRef = useRef(null);
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        {/* Testimonials */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#474846] mb-4">What Our Clients Say</h2>
          <p className="text-[#474846]/70 max-w-2xl mx-auto">
            We're proud to partner with leading architects, designers, and
            brands who trust us to bring their visions to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Clients */}
        {/* Clients */}
        {showClients && (
        <motion.div
          ref={clientsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            clientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-[#474846] mb-8">Trusted by Industry Leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  clientsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-[#474846]/50 hover:text-[#474846] transition-colors duration-300"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
