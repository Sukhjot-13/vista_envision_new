import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { Building2, Package, Video, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjMxNzQ4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#474846]/70 via-[#474846]/50 to-[#474846]/80" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
              Bringing Visions to Life Through Stunning 3D Visualization
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            High-fidelity architectural renders, product visuals, and animations
            that tell your story.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/portfolio">
              <Button
                size="lg"
                className="bg-[#F4D854] text-[#474846] hover:bg-[#F4D854]/90 hover:scale-105 transition-all duration-300 px-8 py-6"
              >
                See Our Work
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#474846] hover:scale-105 transition-all duration-300 px-8 py-6"
              >
                Get a Quote
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-[#F4D854] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#474846] mb-4">What We Do</h2>
            <p className="text-[#474846]/70 max-w-2xl mx-auto">
              We specialize in three core areas of visualization excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Architecture Visualization",
                description:
                  "Transform blueprints into stunning photorealistic renders",
              },
              {
                icon: Package,
                title: "Product Visualization",
                description:
                  "Showcase your products in their best light with captivating visuals",
              },
              {
                icon: Video,
                title: "3D Animation",
                description:
                  "Bring your ideas to life with engaging animations",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-[#F4D854] rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#474846]" />
                </div>
                <h3 className="text-[#474846] mb-3">{service.title}</h3>
                <p className="text-[#474846]/70 mb-4">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button className="bg-[#474846] text-white hover:bg-[#474846]/90 group">
                View All Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#474846] mb-4">Featured Work</h2>
            <p className="text-[#474846]/70 max-w-2xl mx-auto">
              A glimpse of our latest visualization projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1667375721269-448f78e68022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGFyY2hpdGVjdHVyZSUyMG1vZGVybnxlbnwxfHx8fDE3NjMxMTc2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Skyline Residence",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1639145044835-ec083afa6ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzMTkwNzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
                title: "Minimalist Interior",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg group cursor-pointer aspect-[4/3]"
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#474846]/80 to-transparent flex items-end p-8">
                  <h3 className="text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/portfolio">
              <Button className="bg-[#F4D854] text-[#474846] hover:bg-[#F4D854]/90 group">
                View Full Portfolio
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#474846]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Heading & Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-6">
                Ready to Bring Your Vision to Life?
              </h2>
              <p className="text-white/80 mb-6 text-lg">
                Let's discuss your project and create something extraordinary
                together. Fill out the form and we'll get back to you within 24
                hours.
              </p>
              <div className="space-y-4 text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#F4D854] rounded-full"></div>
                  <span>Fast response time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#F4D854] rounded-full"></div>
                  <span>Free project consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#F4D854] rounded-full"></div>
                  <span>Custom quote for your needs</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-xl space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-[#474846] mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#F4D854] focus:ring-2 focus:ring-[#F4D854]/20 outline-none transition-all"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-[#474846] mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#F4D854] focus:ring-2 focus:ring-[#F4D854]/20 outline-none transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-[#474846] mb-2">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#F4D854] focus:ring-2 focus:ring-[#F4D854]/20 outline-none transition-all"
          placeholder="Your company name (optional)"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[#474846] mb-2">
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#F4D854] focus:ring-2 focus:ring-[#F4D854]/20 outline-none transition-all resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#F4D854] text-[#474846] hover:bg-[#F4D854]/90 hover:scale-[1.02] transition-all duration-300 py-6"
      >
        Request a Quote
      </Button>
    </form>
  );
}