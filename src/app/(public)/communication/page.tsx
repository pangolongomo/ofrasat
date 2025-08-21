import {
  Megaphone,
  Camera,
  Palette,
  Calendar,
  Users,
  Target,
} from "lucide-react";
import Image from "next/image";
import ArticlesSection from "@/components/ArticlesSection";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ImageCarousel from "@/components/ImageCarousel";

export default function CommunicationPage() {
  return (
    <>
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
                <BreadcrumbPage>Communication</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Carousel */}
      <ImageCarousel
        images={[
          "/sections/communication/production_OV_1.jpeg",
          "/sections/communication/production_OV_2.jpeg",
          "/sections/communication/production_OV_3.jpeg",
        ]}
      >
        <section className="bg-black/40 w-full h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Image
              src="/sections/OFRA_AGENCY_PNG.png"
              alt="OFRASAT Communication"
              width={300}
              height={192}
              className="mx-auto mb-6 max-h-48 object-contain"
            />
            <p className="text-xl max-w-3xl mx-auto">
              Cabinet de communication global spécialisé dans le conseil
              stratégique, la création de contenu et la production audiovisuelle
            </p>
          </div>
        </section>
      </ImageCarousel>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
              <p>
                OFRASAT est un <strong>cabinet de communication global</strong>{" "}
                spécialisé dans <strong>le conseil stratégique</strong>,{" "}
                <strong>la création de contenu</strong>,{" "}
                <strong>la communication institutionnelle</strong> et{" "}
                <strong>la production audiovisuelle</strong>.
              </p>
              <p>
                Nous accompagnons les institutions, entreprises, ONG et marques
                dans la conception, la mise en œuvre et le suivi de leurs
                stratégies de communication à fort impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos domaines d&apos;expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Conseil et stratégie en communication
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Diagnostic et audit de communication</li>
                <li>• Élaboration de stratégies globales</li>
                <li>• Accompagnement en image et positionnement</li>
                <li>• Plan de communication à court, moyen et long terme</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Megaphone className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Création & suivi de campagnes
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Conception de campagnes institutionnelles</li>
                <li>• Production de contenus multimédias</li>
                <li>• Déploiement multicanal</li>
                <li>• Évaluation et reporting d&apos;impact</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Communication institutionnelle
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Gestion de la réputation</li>
                <li>• Relations publiques</li>
                <li>• Discours et prises de parole</li>
                <li>• Événements officiels</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Palette className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Création graphique & design
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Identité visuelle (logo, charte graphique)</li>
                <li>• Supports de communication</li>
                <li>• Habillages visuels pour événements</li>
                <li>• Design pour réseaux sociaux</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Camera className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Production audiovisuelle
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Documentaires institutionnels</li>
                <li>• Cinéma & séries télévisées</li>
                <li>• Publicités télévisées</li>
                <li>• Reportages & storytelling visuel</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">
                Événementiel & activation
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Conception et organisation d&apos;événements</li>
                <li>• Lancement de produits ou campagnes</li>
                <li>• Coordination logistique et technique</li>
                <li>• Scénographie et animation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Notre approche</h2>
            <p className="text-lg text-gray-700 mb-8">
              Stratégique, créative, orientée résultats. Chaque mission est
              menée avec rigueur et innovation, en tenant compte de votre
              vision, de vos enjeux, de votre cible et du contexte local.
            </p>
            <p className="text-lg text-gray-700">
              Nous combinons analyse stratégique, créativité graphique,
              technologie et terrain pour garantir l&apos;efficacité de vos
              actions.
            </p>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos clients</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-purple-600">
                  Institutions publiques & parapubliques
                </h4>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-purple-600">
                  ONG et organisations internationales
                </h4>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-purple-600">
                  Entreprises et startups
                </h4>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-purple-600">
                  Médias et acteurs culturels
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArticlesSection
        branchType="communication"
        linkColor="text-purple-600 hover:text-purple-800"
      />
    </>
  );
}
