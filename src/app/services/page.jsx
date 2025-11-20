import { ServicesDetailed } from "@/components/ServicesDetailed";
import { Process } from "@/components/Process";

export default function ServicesPage() {
  return (
    <main className="pt-20 bg-white min-h-screen">
      <ServicesDetailed />
      <Process />
    </main>
  );
}
