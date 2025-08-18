import Link from "next/link";
import {
  ArrowLeft,
  PiggyBank,
  CreditCard,
  GraduationCap,
  Users,
  Target,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ArticlesSection from "@/components/ArticlesSection";

export default function FinancePage() {

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
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">OFRASAT Finance</h1>
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
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                OFRASAT dispose d'une institution financière engagée dans
                l'accompagnement des particuliers, des entrepreneurs et des
                institutions dans la gestion optimale de leurs finances. Il
                comprend une coopérative d'épargne et de crédit dénommée Ofrasat
                Avenir Finance (OFRAFIN).
              </p>
              <p>
                Nous offrons des services financiers accessibles, sûrs et
                adaptés à tous, en particulier aux personnes exclues du système
                bancaire traditionnel, afin de stimuler l'inclusion financière,
                renforcer la résilience économique et favoriser le développement
                durable.
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

      <div className="bg-gray-50">
        <ArticlesSection branchType="finance" linkColor="text-green-600 hover:text-green-800" />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 OFRASAT. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
