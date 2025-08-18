import Link from "next/link";
import {
  ArrowLeft,
  Computer,
  Network,
  BarChart3,
  TrendingUp,
  Users,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ArticlesSection from "@/components/ArticlesSection";

export default function ConsultingPage() {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">OFRASAT Consulting</h1>
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
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                OFRASAT est un cabinet de consultance de droit congolais,
                indépendant et pluridisciplinaire, spécialisé dans l'ingénierie
                numérique, l'étude stratégique et le conseil technique et
                opérationnel. Nous mettons notre expertise au service des
                institutions publiques, entreprises privées, ONG et bailleurs
                internationaux, en répondant aux défis complexes de la
                transformation digitale, de la performance économique et du
                développement durable.
              </p>
              <p>
                Grâce à une approche fondée sur la rigueur méthodologique, la
                compréhension du contexte local et l'innovation, nous
                accompagnons nos clients depuis la phase de diagnostic jusqu'à
                la mise en œuvre de solutions concrètes et durables.
              </p>
              <p>
                Notre engagement : offrir un accompagnement sur mesure, fondé
                sur la qualité, l'intégrité et la création de valeur.
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Computer className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Ingénierie numérique et nouvelles technologies
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Network className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Télécommunications & réseaux
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Computer className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Informatique & systèmes d'information
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Statistiques appliquées & analyses de données
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Études économiques, sectorielles et d'impact
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Lightbulb className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Conseil en stratégie, organisation et innovation
              </h3>
            </div>
          </div>
        </div>
      </section>

      <ArticlesSection branchType="consulting" linkColor="text-blue-600 hover:text-blue-800" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 OFRASAT. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
