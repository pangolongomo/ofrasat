import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PresentationSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Présentation</h2>
          <div className="prose prose-lg mx-auto text-gray-700 mb-12">
            <p className="mb-4">
              OFRASAT est une entreprise de droit congolais d&apos;ingénierie,
              d&apos;études et de conseils, pluridisciplinaire et indépendante à
              vocation internationale. Elle intervient dans des domaines aussi
              diversifiés et multiservices que l&apos;agroalimentaire, les
              infrastructures, le bâtiment, les travaux publics,
              l&apos;informatique, l&apos;immobilier, la finance, les mines, la
              logistique, le transport, l&apos;eau, l&apos;hygiène et l&apos;assainissement,
              les MPME, l&apos;aménagement rural et urbain, la décentralisation,
              l&apos;appui institutionnel, le marketing, la commercialisation, la
              communication, les télécommunications, l&apos;audiovisuel, Internet,
              etc.
            </p>
            <p className="mb-4">
              Notre ambition est de devenir une compagnie leader en matière
              d&apos;ingénierie et d&apos;appui-conseil dans la mise œuvre des missions
              complexes gouvernementaux et privés dans les secteurs essentiels
              de la RDC et de la sous-région en contribuant à la croissance et
              au succès de nos clients. C&apos;est ainsi que nous adoptons
              l&apos;approche client qui met ce dernier au centre de notre profit.
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
                  l&apos;analyse de scénarios de la mission, de résolution de
                  problématiques identifiées, de définition de schémas directeurs
                  d&apos;investissement, de plan de gestion etc.
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
                <CardTitle>Maîtrise d&apos;œuvre</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Véritable concepteur et chef d&apos;orchestre de l&apos;émergence et la
                  réalisation d&apos;un projet, le maîtrise d&apos;œuvre doit permettre
                  d&apos;aboutir à la formalisation technique des attentes et du
                  programme du donneur d&apos;ordre, puis à la réalisation conforme de
                  ces ouvrages dans le respect des ambitions esthétiques et
                  techniques, des délais envisagés et des coûts programmés.
                </p>
                <p className="text-muted-foreground">
                  Nos équipes apportent l&apos;écoute, le conseil, l&apos;expertise
                  technique et l&apos;expérience à chaque projet pour sa bonne
                  réalisation dans le respect des règles de l&apos;art tout en
                  préservant l&apos;environnement.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assistance à Maîtrise d&apos;ouvrage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Acteur structurant de l&apos;acte de construire et d&apos;aménager,
                  l&apos;assistant à maîtrise d&apos;ouvrage a le devoir d&apos;accompagner, de
                  conseiller et guider les donneurs d&apos;ordre à chaque étape de la
                  réalisation d&apos;un projet depuis la définition du périmètre d&apos;un
                  programme jusqu&apos;à l&apos;accompagnement à la mise en service d&apos;un
                  ouvrage.
                </p>
                <p className="text-muted-foreground">
                  Nos compétences, expertises et expérience organisationnelles,
                  techniques, réglementaires, environnementales sont le garant de
                  la qualité et de l&apos;écoute que nous mobilisons sur ce type de
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
