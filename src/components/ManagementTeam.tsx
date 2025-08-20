import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Globe } from "lucide-react";

interface TeamMember {
  name: string;
  position: string;
  image?: string;
  icon?: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ir. Dr. Michael Lototi",
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
    position: "Directeur Administratif et financier",
    image: "/team/Rodrique.jpeg",
  },
  {
    name: "Annah Tshilumba",
    position: "Directeur Communication et Marketing",
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Direction</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-12">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow p-0"
            >
              <div className="aspect-square w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  member.icon
                )}
              </div>
              <CardContent className="p-6 text-center">
                <CardTitle className="mb-2">{member.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">
                  {member.position}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100">
            <p className="text-gray-700 leading-relaxed mb-6">
              OFRASAT regroupe l&apos;ensemble des fonctions stratégiques,
              opérationnelles et de support, organisées de manière hiérarchique
              et fonctionnelle pour assurer une gestion efficace, une croissance
              durable et une création de valeur. Chaque département contribue à
              la réalisation des objectifs globaux définis par la direction
              générale.
            </p>
            <p className="text-gray-700 leading-relaxed">
              L&apos;ensemble des équipes de l&apos;entreprise œuvre de manière
              coordonnée pour atteindre notre mission : offrir des produits et
              services de qualité, répondre aux attentes de nos clients, et
              contribuer positivement à la société. L&apos;organigramme reflète
              notre engagement en faveur de la transparence, de
              l&apos;efficacité et de l&apos;innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
