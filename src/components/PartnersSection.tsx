export default function PartnersSection() {
  const partners = [
    { name: 'CCM World Wide', location: 'Bruxelles et à l\'international' },
    { name: 'SECAM', location: 'Burkina Faso et Guinée' },
    { name: 'AGRO-CONVERGENCE', location: 'Burkina Faso' },
    { name: 'ISEAU', location: 'Niger' },
    { name: 'Global Monitor Consulting', location: 'Goma/RDC' },
    { name: 'CAGECFI', location: 'Togo et à l\'international' },
    { name: 'KIVU Entrepreneur', location: 'Goma/RDC' },
    { name: 'Digital Groupe', location: 'Benin' }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Nos partenaires</h2>
          
          <div className="prose prose-lg mx-auto text-gray-700 mb-8">
            <p className="mb-4">
              Nous collaborons avec des institutions et entreprises engagées, partageant notre vision du développement durable et de l'innovation en Afrique.
            </p>
            <p className="mb-6">
              Dans le cadre de la préparation et de la soumission ou encore de l'accomplissement de la mission, OFRASAT peut mobiliser les sociétés partenaires pour préparer les documents d'appels d'offres ou de recourir à leur expertise rare pour accomplir sa mission, notamment :
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
                <h4 className="font-semibold text-gray-900">La société {partner.name}</h4>
                <p className="text-gray-600 text-sm">basé {partner.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}