import { Process } from "../components/Process";
import { Testimonials } from "../components/Testimonials";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, Users, Sparkles, Target } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "We're committed to delivering the highest quality visualizations that exceed expectations.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work closely with our clients, treating each project as a true partnership.",
  },
  {
    icon: Target,
    title: "Precision",
    description:
      "Every detail matters. We bring technical accuracy and artistic vision to every project.",
  },
  {
    icon: Award,
    title: "Innovation",
    description:
      "We stay at the forefront of visualization technology to deliver cutting-edge results.",
  },
];

export function AboutPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 bg-gradient-to-b from-[#474846] to-[#474846]/95">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white mb-6">About Vista Envision</h1>
            <p className="text-white/90 text-lg">
              We're a team of passionate artists, designers, and technologists
              dedicated to transforming ideas into stunning visual realities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#474846] mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-[#474846]/80">
              <p>
                Founded in 2015, Vista Envision emerged from a simple belief:
                that visualization should do more than just show what something
                looks like—it should bring visions to life and inspire action.
              </p>
              <p>
                What started as a small studio with a passion for architectural
                visualization has grown into a full-service creative agency
                serving clients across architecture, product design, and digital
                media. Our work has been featured in industry publications and
                has helped launch successful projects around the world.
              </p>
              <p>
                Today, we combine cutting-edge technology with timeless artistic
                principles to create visualizations that don't just meet
                expectations—they redefine them. Every project is an opportunity
                to push boundaries and explore new possibilities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#474846] mb-4">Our Values</h2>
            <p className="text-[#474846]/70 max-w-2xl mx-auto">
              These core principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-[#F4D854] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#474846]" />
                  </div>
                  <h3 className="text-[#474846] mb-3">{value.title}</h3>
                  <p className="text-[#474846]/70">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Stats */}
      <section className="py-24 bg-[#474846]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "150+", label: "Happy Clients" },
              { number: "10+", label: "Years of Excellence" },
              { number: "25+", label: "Industry Awards" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl text-[#F4D854] mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
