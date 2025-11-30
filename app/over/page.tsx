import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over dit experiment',
  description: 'Waarom twee 55-plussers het wervingsproces van Defensie ingaan. Een logboek van het zoeken naar ruimte voor specialistische ervaring.',
}

export default function Over() {
  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">Over dit experiment</h1>

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
        <ul>
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
