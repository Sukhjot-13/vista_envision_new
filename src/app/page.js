import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";


import { Contact } from "@/components/Contact";

export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <Services />
      <Portfolio />


      <Contact />
    </main>
  );
}
