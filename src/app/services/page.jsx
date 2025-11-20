import { Services } from "@/components/Services";
import { Process } from "@/components/Process";

export default function ServicesPage() {
  return (
    <main className="pt-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#474846] mb-6">
          Our Services
        </h1>
        <p className="text-[#474846]/70 max-w-2xl mx-auto text-lg mb-12">
          Comprehensive 3D visualization solutions tailored to your needs.
        </p>
      </div>
      <Services />
      <Process />
    </main>
  );
}
