import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over ons',
  description: 'Waarom twee 55-plussers het wervingsproces van Defensie ingaan. Een logboek van het zoeken naar ruimte voor specialistische ervaring.',
}

export default function Over() {
  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">Over ons</h1>

        <h2>Wie zijn wij?</h2>
        <p>
          <strong>Tim Selders (54)</strong> — Innovatiedirecteur, werkt aan de grenzen van technologie
          en organisatieverandering. Achtergrond in strategische innovatie, AI-experimenten en het
          uitdagen van professionals om voorbij hun verbeelding te denken.
        </p>
        <p>
          <strong>Henk Voormolen (59)</strong> — Vrij man met een lange staat van dienst als directeur
          bij Albron in duurzaamheid, systeemverandering en sociale impact. Van fiscaal jurist naar
          aanjager van voedingsinnovatie in de zorg.
        </p>
        <p>
          Twee mannen met decennia ervaring in het veranderen van systemen van binnenuit. Geen
          militaire achtergrond. Wel de vraag of die ervaring ergens anders van waarde kan zijn.
        </p>

        <h2>Waarom doen we dit?</h2>
        <p>
          Defensie staat voor uitdagingen die vragen om andere expertise dan traditioneel in
          het systeem aanwezig is: hybride dreigingen, cyberoorlogsvoering, informatiemanipulatie.
          De standaardroute naar reservist is ingericht op een ander profiel dan het onze.
        </p>

        <p>
          Wij denken dat specialistische ervaring van buiten waarde kan hebben. Het systeem is
          daar nog niet op ingericht. Die mismatch willen we zichtbaar maken — niet om te klagen,
          maar om te begrijpen waar de ruimte zit. Maar vooral ook om bij te kunnen dragen.
        </p>

        <h2>Hoe doen we dit?</h2>
        <p>
          Wij doorlopen het aanmeldingsproces voor reservisten en schrijven op wat we tegenkomen.
        </p>
        <ul className="list-disc pl-6">
          <li>Blogs over de stappen die we zetten, de obstakels, de verrassingen</li>
          <li>Podcasts waarin we hardop nadenken over wat we leren</li>
          <li>Gesprekken met mensen binnen Defensie die de spanning tussen systeem en vernieuwing kennen</li>
        </ul>
        <p>
          Geen masterplan. Wel een logboek.
        </p>

        <h2>Transparantie</h2>
        <p>
          Alles wat we documenteren is openbaar, tenzij privacy of veiligheid een rol spelen.
          We focussen op systemen, processen en patronen — niet op personen.
        </p>

        <p className="text-xl font-semibold text-primary mt-8">
          De verkenning begint simpelweg met de eerste vraag: waar kunnen we ons aanmelden ;-)?
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
