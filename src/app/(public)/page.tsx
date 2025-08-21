import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import ManagementTeam from "@/components/ManagementTeam";
import PresentationSection from "@/components/PresentationSection";

import PartnersScroll from "@/components/PartnersScroll";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{ background: "linear-gradient(to right, #060097, #0066cc)" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="OFRASAT Hero Background"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">OFRASAT</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Entreprise congolaise d&apos;ingénierie, d&apos;études et de
            conseils, pluridisciplinaire et indépendante à vocation
            internationale
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              <Link href="/consulting">Nos Services</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white bg-transparent hover:bg-white hover:text-blue-900"
            >
              <Link href="#contact">Nous Contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      <PresentationSection />

      <ManagementTeam />

      {/* <PartnersSection /> */}
      <PartnersScroll />
    </>
  );
}
