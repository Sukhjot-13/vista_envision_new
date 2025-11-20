import { Testimonials } from "@/components/Testimonials";

export default function AboutPage() {
  return (
    <main className="pt-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#474846] mb-6">
            About Us
          </h1>
          <p className="text-[#474846]/70 max-w-2xl mx-auto text-lg">
            We are a team of passionate artists and technologists dedicated to
            pushing the boundaries of 3D visualization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-[#474846] mb-6">
              Our Mission
            </h2>
            <p className="text-[#474846]/80 text-lg leading-relaxed mb-6">
              At Vista Envision, we believe that every great project starts with a
              vision. Our mission is to help architects, designers, and brands
              communicate that vision with clarity and impact.
            </p>
            <p className="text-[#474846]/80 text-lg leading-relaxed">
              Through state-of-the-art technology and artistic expertise, we
              create visuals that not only look real but feel real—evoking
              emotion and inspiring action.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmUlMjBzdHVkaW98ZW58MXx8fHwxNzYzMjI4Mzk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Our Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Testimonials />
    </main>
  );
}
