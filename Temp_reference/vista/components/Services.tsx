import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Building2, Package, Video } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  {
    title: "Architecture Visualization",
    description:
      "Transform blueprints into stunning photorealistic renders. We help architects and developers communicate their vision with precision and artistry.",
    image:
      "https://images.unsplash.com/photo-1760802136542-0cefb143f1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcmVuZGVyJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYzMjI4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Building2,
  },
  {
    title: "Product Visualization",
    description:
      "Showcase your products in their best light. From concept to final render, we create visuals that drive engagement and sales.",
    image:
      "https://images.unsplash.com/photo-1719176010035-17729577d496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBsdXh1cnl8ZW58MXx8fHwxNzYzMjI4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Package,
  },
  {
    title: "3D Animation",
    description:
      "Bring your ideas to life with captivating animations. Perfect for marketing campaigns, product launches, and architectural walkthroughs.",
    image:
      "https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxMjQ0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Video,
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#474846]/90 via-[#474846]/40 to-transparent" />

        {/* Icon */}
        <div className="absolute top-6 left-6 w-14 h-14 bg-[#F4D854] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-7 h-7 text-[#474846]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-[#474846] mb-3">{service.title}</h3>
        <p className="text-[#474846]/70">{service.description}</p>
      </div>

      {/* Hover Accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-[#F4D854]"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#474846] mb-4">Our Services</h2>
          <p className="text-[#474846]/70 max-w-2xl mx-auto">
            We help architects, designers, and brands communicate their ideas
            through world-class visual storytelling.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
