'use client';

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

import { sendQuoteRequest } from "@/actions/emailActions";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const result = await sendQuoteRequest(formData);
      if (result.success) {
        alert("Thank you! We'll be in touch soon.");
        e.target.reset();
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#474846]" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Get in Touch</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's start a conversation about
            your next project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F4D854] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#474846]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Email</p>
                    <p className="text-white">info@vistaenvision.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F4D854] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#474846]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Phone</p>
                    <p className="text-white">+91-90233-56008</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F4D854] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#474846]" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Address</p>
                    <p className="text-white">
                      4, Deep Nagar,
                      <br />
                      Patialaa (Punjab)-147001
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/20">
              <h4 className="text-white mb-4">Why Choose Vista Envision?</h4>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#F4D854] mt-1">•</span>
                  <span>Photorealistic quality and attention to detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F4D854] mt-1">•</span>
                  <span>Fast turnaround without compromising quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F4D854] mt-1">•</span>
                  <span>Collaborative approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F4D854] mt-1">•</span>
                  <span>Trusted by leading architects and brands</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-xl space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-[#474846] mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-gray-50 border-gray-200 focus:border-[#F4D854] focus:ring-[#F4D854]"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[#474846] mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-gray-50 border-gray-200 focus:border-[#F4D854] focus:ring-[#F4D854]"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-[#474846] mb-2"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full bg-gray-50 border-gray-200 focus:border-[#F4D854] focus:ring-[#F4D854]"
                  placeholder="Your company name (optional)"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[#474846] mb-2"
                >
                  Project Details
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-gray-50 border-gray-200 focus:border-[#F4D854] focus:ring-[#F4D854] resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F4D854] text-[#474846] hover:bg-[#F4D854]/90 hover:scale-[1.02] transition-all duration-300 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Request a Quote'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
