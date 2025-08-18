import Link from "next/link";
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
import Footer from "@/components/Footer";

const expertisePool = [
  {
    image: "/expertisePool/Ingenierie-numerique-et-nouvelles-technologies.jpeg",
    title: "Ingénierie numérique et nouvelles technologies",
    alt: "Ingénierie numérique",
  },
  {
    image: "/expertisePool/Telecommunications-reseaux.jpg",
    title: "Télécommunications & réseaux",
    alt: "Télécommunications",
  },
  {
    image: "/expertisePool/Informatique-systèmes-d-information.png",
    title: "Informatique & systèmes d'information",
    alt: "Informatique",
  },
  {
    image: "/expertisePool/Statistiques-appliquees-analyses-de-donnees.jpg",
    title: "Statistiques appliquées & analyses de données",
    alt: "Statistiques",
  },
  {
    image: "/expertisePool/etudes-economiques-sectorielles-et-d-impact.jpg",
    title: "Études économiques, sectorielles et d'impact",
    alt: "Études économiques",
  },
  {
    image: "/expertisePool/Conseil-en-strategie-organisation-et-innovation.png",
    title: "Conseil en stratégie, organisation et innovation",
    alt: "Conseil stratégique",
  },
];

export default function ConsultingPage() {
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
                <BreadcrumbPage>Consulting</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <img
            src="/sections/ofra consulting PNG.png"
            alt="OFRASAT Consulting"
            className="mx-auto mb-6 max-h-48 object-contain"
          />
          <p className="text-xl max-w-3xl mx-auto">
            Cabinet de consultance spécialisé dans l'ingénierie numérique,
            l'étude stratégique et le conseil technique et opérationnel
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
              <p>
                OFRASAT est un cabinet de consultance de droit congolais,
                indépendant et pluridisciplinaire, spécialisé dans{" "}
                <strong>l'ingénierie numérique</strong>,{" "}
                <strong>l'étude stratégique</strong> et{" "}
                <strong>le conseil technique et opérationnel</strong>. Nous
                mettons notre expertise au service des institutions publiques,
                entreprises privées, ONG et bailleurs transformation digitale,
                de la performance économique et du développement durable.
              </p>
              <p>
                Grâce à une approche fondée sur{" "}
                <strong>la rigueur méthodologique</strong>,{" "}
                <strong>la compréhension du contexte local</strong> et{" "}
                <strong>l'innovation</strong>, nous accompagnons nos clients
                depuis la phase de <strong>diagnostic</strong> jusqu'à la mise
                en œuvre de <strong>solutions concrètes et durables</strong>.
              </p>
              <p>
                Notre engagement : offrir un{" "}
                <strong>accompagnement sur mesure</strong>, fondé sur{" "}
                <strong>la qualité</strong>, <strong>l'intégrité</strong> et{" "}
                <strong>la création de valeur</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Pool */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pool d'expertises
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertisePool.map((expertise, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={expertise.image}
                  alt={expertise.alt}
                  className="w-full aspect-[4/3] object-cover rounded mb-4"
                />
                <h3 className="text-xl font-bold mb-3 text-center lg:text-left">
                  {expertise.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArticlesSection
        branchType="consulting"
        linkColor="text-blue-600 hover:text-blue-800"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
