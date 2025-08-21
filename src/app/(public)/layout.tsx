import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Mail, MapPin, Phone } from "lucide-react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {children}
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
      <Footer />
    </div>
  );
}
