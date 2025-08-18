"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PiggyBank,
  CreditCard,
  GraduationCap,
  Users,
  Target,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ArticlesSection from "@/components/ArticlesSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AnimatePresence, motion } from "framer-motion";
import Footer from "@/components/Footer";

const galleryImages = [
  {
    src: "/products-finance/MKI_3407-scaled.jpg",
    alt: "Produit Finance OFRASAT",
  },
  {
    src: "/products-finance/autocolla-3.jpg",
    alt: "Autocollant OFRAFIN",
  },
  {
    src: "/products-finance/autocolla-ofrafin.jpg",
    alt: "Autocollant OFRAFIN",
  },
  {
    src: "/products-finance/avenir-finane-cc-scaled.jpg",
    alt: "Avenir Finance",
  },
];

export default function FinancePage() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openImage = (index: number) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);

  const showPrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex(
        (currentIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  const showNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % galleryImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Finance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <img
            src="/sections/ofrafinance PNG.png"
            alt="OFRASAT Finance"
            className="mx-auto mb-6 max-h-48 object-contain"
          />
          <p className="text-xl max-w-3xl mx-auto">
            Institution financière engagée dans l'accompagnement des
            particuliers, entrepreneurs et institutions
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
              <p>
                OFRASAT dispose d'une <strong>institution financière</strong>{" "}
                engagée dans l'accompagnement des particuliers, des
                entrepreneurs et des institutions dans la{" "}
                <strong>gestion optimale de leurs finances</strong>. Il comprend
                une coopérative d'épargne et de crédit dénommée{" "}
                <strong>Ofrasat Avenir Finance (OFRAFIN)</strong>.
              </p>
              <p>
                Nous offrons des{" "}
                <strong>services financiers accessibles</strong>,{" "}
                <strong>sûrs</strong> et
                <strong>adaptés à tous</strong>, en particulier aux personnes
                exclues du système bancaire traditionnel, afin de stimuler{" "}
                <strong>l'inclusion financière</strong>, renforcer la{" "}
                <strong>résilience économique</strong> et favoriser le{" "}
                <strong>développement durable</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Activités
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <PiggyBank className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Épargne</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Comptes d'épargne individuels et solidaires</li>
                <li>• Épargne avec objectifs (études, projets, urgences)</li>
                <li>• Épargne à la carte digitalisée</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CreditCard className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Crédit</h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  • Microcrédits pour petits commerçants, artisans, agriculteurs
                </li>
                <li>• Crédits scolaires et médicaux</li>
                <li>
                  • Crédits de groupe (groupes solidaires ou associations)
                </li>
                <li>
                  • Accompagnement personnalisé avant et après financement
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <GraduationCap className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Éducation financière</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Ateliers d'éducation financière</li>
                <li>• Formations pour femmes, jeunes et entrepreneurs</li>
                <li>• Sessions communautaires en langues locales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Vision</h2>
              <p className="text-gray-700 text-lg">
                Un monde où chaque individu, quel que soit son statut, a les
                outils financiers et les connaissances nécessaires pour
                améliorer durablement sa vie et celle de sa communauté.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Nos Valeurs</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold">Proximité</h4>
                    <p className="text-gray-600">
                      Nous sommes à l'écoute de nos clients et proches de leurs
                      réalités.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold">Confiance</h4>
                    <p className="text-gray-600">
                      Nous bâtissons des relations durables basées sur la
                      transparence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <GraduationCap className="w-6 h-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold">Éducation</h4>
                    <p className="text-gray-600">
                      Nous mettons l'accent sur la formation comme levier
                      d'autonomisation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-bold">Innovation</h4>
                    <p className="text-gray-600">
                      Nous intégrons des outils digitaux pour faciliter l'accès
                      aux services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Cibles */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Cibles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:bg-green-50 transition-all">
              <h3 className="text-lg font-bold text-green-600">
                Femmes entrepreneures
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:bg-green-50 transition-all">
              <h3 className="text-lg font-bold text-green-600">
                Jeunes porteurs de projets
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:bg-green-50 transition-all">
              <h3 className="text-lg font-bold text-green-600">
                Petits commerçants
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:bg-green-50 transition-all">
              <h3 className="text-lg font-bold text-green-600">Agriculteurs</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center lg:col-span-2 cursor-pointer hover:shadow-lg hover:bg-green-50 transition-all">
              <h3 className="text-lg font-bold text-green-600">
                Groupes d'entraide ou associations communautaires
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Produits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Produits</h2>
          <div className="space-y-4">
            {/* Gallery Grid */}
            <div className="space-y-4">
              <div className="w-full">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  onClick={() => openImage(0)}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryImages.slice(1).map((image, index) => (
                  <img
                    key={index + 1}
                    src={image.src}
                    alt={image.alt}
                    onClick={() => openImage(index + 1)}
                    className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div
            className="relative max-w-[80vw] max-h-[70vh] m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence>
              <motion.img
                key={galleryImages[currentIndex].src}
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </AnimatePresence>
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50"
            >
              <X size={24} />
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="fixed left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="fixed right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <div className="bg-gray-50">
        <ArticlesSection
          branchType="finance"
          linkColor="text-green-600 hover:text-green-800"
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
