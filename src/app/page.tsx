import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import Navbar from "@/components/Navbar";
import ManagementTeam from "@/components/ManagementTeam";
import PresentationSection from "@/components/PresentationSection";
import PartnersSection from "@/components/PartnersSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

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

      <PartnersSection />

      {/* Contact */}
      <section id="contact" className="text-white py-16 bg-[#060097]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Contactez-nous
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Direction Générale</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>
                    101 Avenue Colonnel, Quartier Golf, Commune de la Gombe,
                    Kinshasa, RDC
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>+243 840 736 765</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>contact@ofrasat.com</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">
                Direction d&apos;exploitation
              </h3>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <span>
                  2010 Avenue Saio, Quartier Onel, Commune de Kasa-vubu,
                  Kinshasa, RDC
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
