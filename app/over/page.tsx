import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over mij',
  description: 'Waarom een 55-plusser het wervingsproces van Defensie ingaat. Een logboek van het zoeken naar ruimte voor specialistische ervaring.',
}

export default function Over() {
  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">Over mij</h1>

        <h2>Wie ben ik?</h2>
        <p>
          <strong>Tim Selders (54)</strong> — Innovatiedirecteur, werkt aan de grenzen van technologie
          en organisatieverandering. Achtergrond in strategische innovatie, AI-experimenten en het
          uitdagen van professionals om voorbij hun verbeelding te denken.
        </p>
        <p>
          Decennia ervaring in het veranderen van systemen van binnenuit. Geen
          militaire achtergrond. Wel de vraag of die ervaring ergens anders van waarde kan zijn.
        </p>

        <h2>Waarom doe ik dit?</h2>
        <p>
          Defensie staat voor uitdagingen die vragen om andere expertise dan traditioneel in
          het systeem aanwezig is: hybride dreigingen, cyberoorlogsvoering, informatiemanipulatie.
          De standaardroute naar reservist is ingericht op een ander profiel dan het mijne.
        </p>

        <p>
          Ik denk dat specialistische ervaring van buiten waarde kan hebben. Het systeem is
          daar nog niet op ingericht. Die mismatch wil ik zichtbaar maken — niet om te klagen,
          maar om te begrijpen waar de ruimte zit. Maar vooral ook om bij te kunnen dragen.
        </p>

        <h2>Hoe doe ik dit?</h2>
        <p>
          Ik doorloop het aanmeldingsproces voor reservisten en schrijf op wat ik tegenkom.
        </p>
        <ul className="list-disc pl-6">
          <li>Blogs over de stappen die ik zet, de obstakels, de verrassingen</li>
          <li>Podcasts waarin ik hardop nadenk over wat ik leer</li>
          <li>Gesprekken met mensen binnen Defensie die de spanning tussen systeem en vernieuwing kennen</li>
        </ul>
        <p>
          Geen masterplan. Wel een logboek.
        </p>

        <h2>Transparantie</h2>
        <p>
          Alles wat ik documenteer is openbaar, tenzij privacy of veiligheid een rol spelen.
          Ik focus op systemen, processen en patronen — niet op personen.
        </p>

        <p className="text-xl font-semibold text-primary mt-8">
          De verkenning begint simpelweg met de eerste vraag: waar kan ik me aanmelden ;-)?
        </p>

        <div className="mt-12">
          <a href="/blog" className="btn-primary">
            Naar de verkenning
          </a>
        </div>
      </div>
    </div>
  )
}
