import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Building2, Package, Video, Check } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const services = [
  {
    title: "Architecture Visualization",
    description:
      "Transform blueprints into stunning photorealistic renders. We help architects and developers communicate their vision with precision and artistry.",
    image:
      "https://images.unsplash.com/photo-1760802136542-0cefb143f1f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwcmVuZGVyJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYzMjI4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Building2,
    features: [
      "Exterior & interior renders",
      "Aerial & street-level views",
      "Day & night visualizations",
      "Virtual reality walkthroughs",
      "Material & lighting studies",
    ],
  },
  {
    title: "Product Visualization",
    description:
      "Showcase your products in their best light. From concept to final render, we create visuals that drive engagement and sales.",
    image:
      "https://images.unsplash.com/photo-1719176010035-17729577d496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBsdXh1cnl8ZW58MXx8fHwxNzYzMjI4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Package,
    features: [
      "Product photography replacement",
      "Lifestyle & contextual renders",
      "360° product spins",
      "Exploded views & cutaways",
      "Packaging visualization",
    ],
  },
  {
    title: "3D Animation",
    description:
      "Bring your ideas to life with captivating animations. Perfect for marketing campaigns, product launches, and architectural walkthroughs.",
    image:
      "https://images.unsplash.com/photo-1581784878214-8d5596b98a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxMjQ0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Video,
    features: [
      "Architectural walkthroughs",
      "Product demonstrations",
      "Kinetic typography",
      "Character animation",
      "Motion graphics",
    ],
  },
];

export function ServicesPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

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
            <h1 className="text-white mb-6">Our Services</h1>
            <p className="text-white/90 text-lg">
              We help architects, designers, and brands communicate their ideas
              through world-class visual storytelling. Our team combines
              technical expertise with artistic vision to deliver exceptional
              results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => {
        const Icon = service.icon;
        const isEven = index % 2 === 0;

        return (
          <ServiceDetail
            key={service.title}
            service={service}
            icon={Icon}
            reverse={!isEven}
            index={index}
          />
        );
      })}

      {/* CTA Section */}
      <section className="py-24 bg-[#F4D854]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#474846] mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-[#474846]/80 mb-8 text-lg">
              Get in touch to discuss your visualization needs and receive a
              custom quote.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-[#474846] text-white hover:bg-[#474846]/90 hover:scale-105 transition-all duration-300 px-8 py-6"
              >
                Request a Quote
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServiceDetail({
  service,
  icon: Icon,
  reverse,
  index,
}: {
  service: (typeof services)[0];
  icon: any;
  reverse: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      className={`py-24 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: reverse ? 30 : -30 }
            }
            transition={{ duration: 0.6 }}
            className={reverse ? "md:order-2" : ""}
          >
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 w-16 h-16 bg-[#F4D854] rounded-lg flex items-center justify-center">
                <Icon className="w-8 h-8 text-[#474846]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: reverse ? -30 : 30 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className={reverse ? "md:order-1" : ""}
          >
            <h2 className="text-[#474846] mb-4">{service.title}</h2>
            <p className="text-[#474846]/70 mb-6">{service.description}</p>

            <div className="space-y-3">
              {service.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-[#F4D854] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#474846]" />
                  </div>
                  <span className="text-[#474846]/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
