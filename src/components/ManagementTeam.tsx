import Image from "next/image";

interface TeamMember {
  name: string;
  position: string;
  image?: string;
  icon?: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    name: "Michaël Lototi",
    position: "Directeur Général",
    image: "/team/michel.jpeg",
  },
  {
    name: "Bakari Yemba",
    position: "Directeur Technique",
    image: "/team/bakari.jpeg",
  },
  {
    name: "Rodrique Sebu",
    position: "Administration & finance",
    image: "/team/Rodrique.jpeg",
  },
  {
    name: "Annah Tshilumba",
    position: "Communication & Marketing",
    image: "/team/Mm_Hannah.jpg",
  },
  {
    name: "Joyce Makolo",
    position: "Assistante de Direction",
    image: "/team/Joyce.jpeg",
  },
];

export default function ManagementTeam() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white   to-indigo-200 bg-clip-text text-transparent">
            Notre Direction
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Une équipe de dirigeants expérimentés qui guide OFRASAT vers
            l&apos;excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group text-center bg-blue-50 rounded py-4"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-200 group-hover:shadow-xl transition-all duration-300">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    member.icon
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-950 transition-colors">
                {member.name}
              </h3>
              <p className="text-blue-800 font-medium text-sm">
                {member.position}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Notre Vision Organisationnelle
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-center">
                OFRASAT regroupe l&apos;ensemble des fonctions stratégiques,
                opérationnelles et de support, organisées de manière
                hiérarchique et fonctionnelle pour assurer une gestion efficace,
                une croissance durable et une création de valeur.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-center">
                L&apos;ensemble des équipes œuvre de manière coordonnée pour
                atteindre notre mission : offrir des produits et services de
                qualité, répondre aux attentes de nos clients, et contribuer
                positivement à la société.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
