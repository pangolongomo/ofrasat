import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PresentationSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Présentation</h2>
          <div className="prose prose-lg mx-auto text-gray-700 mb-12">
            <p className="mb-4">
              OFRASAT est une entreprise de droit congolais d'ingénierie,
              d'études et de conseils, pluridisciplinaire et indépendante à
              vocation internationale. Elle intervient dans des domaines aussi
              diversifiés et multiservices que l'agroalimentaire, les
              infrastructures, le bâtiment, les travaux publics,
              l'informatique, l'immobilier, la finance, les mines, la
              logistique, le transport, l'eau, l'hygiène et l'assainissement,
              les MPME, l'aménagement rural et urbain, la décentralisation,
              l'appui institutionnel, le marketing, la commercialisation, la
              communication, les télécommunications, l'audiovisuel, Internet,
              etc.
            </p>
            <p className="mb-4">
              Notre ambition est de devenir une compagnie leader en matière
              d'ingénierie et d'appui-conseil dans la mise œuvre des missions
              complexes gouvernementaux et privés dans les secteurs essentiels
              de la RDC et de la sous-région en contribuant à la croissance et
              au succès de nos clients. C'est ainsi que nous adoptons
              l'approche client qui met ce dernier au centre de notre profit.
            </p>
            <p>
              OFRASAT construit sa réputation sur son sérieux, ses pratiques
              innovantes et la fidélité à ses valeurs et convictions.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Nos Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Études générales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Les études générales doivent permettre de nourrir par des
                  éléments techniques vérifiés et structurés les réflexions et
                  l'analyse de scénarios de la mission, de résolution de
                  problématiques identifiées, de définition de schémas directeurs
                  d'investissement, de plan de gestion etc.
                </p>
                <p className="text-muted-foreground">
                  <strong>OFRASAT</strong>, par sa diversité de compétences,
                  réalise quotidiennement ce type de prestation et apporte à la
                  fois son expertise technique mais également sa compréhension des
                  enjeux et spécificités de la mission.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Maîtrise d'œuvre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Véritable concepteur et chef d'orchestre de l'émergence et la
                  réalisation d'un projet, le maîtrise d'œuvre doit permettre
                  d'aboutir à la formalisation technique des attentes et du
                  programme du donneur d'ordre, puis à la réalisation conforme de
                  ces ouvrages dans le respect des ambitions esthétiques et
                  techniques, des délais envisagés et des coûts programmés.
                </p>
                <p className="text-muted-foreground">
                  Nos équipes apportent l'écoute, le conseil, l'expertise
                  technique et l'expérience à chaque projet pour sa bonne
                  réalisation dans le respect des règles de l'art tout en
                  préservant l'environnement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assistance à Maîtrise d'ouvrage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Acteur structurant de l'acte de construire et d'aménager,
                  l'assistant à maîtrise d'ouvrage a le devoir d'accompagner, de
                  conseiller et guider les donneurs d'ordre à chaque étape de la
                  réalisation d'un projet depuis la définition du périmètre d'un
                  programme jusqu'à l'accompagnement à la mise en service d'un
                  ouvrage.
                </p>
                <p className="text-muted-foreground">
                  Nos compétences, expertises et expérience organisationnelles,
                  techniques, réglementaires, environnementales sont le garant de
                  la qualité et de l'écoute que nous mobilisons sur ce type de
                  mission.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
