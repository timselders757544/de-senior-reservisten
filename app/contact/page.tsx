import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met De Senior Reservisten. Voor de pers, Defensie, medekandidaten of algemene vragen over de verkenning.',
}

export default function Contact() {
  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">Contact</h1>

        <p>
          Deze verkenning is publiek en open. Ik deel mijn ervaringen transparant en
          nodig anderen uit om mee te denken, te reageren en bij te dragen aan het gesprek.
        </p>

        <h2>Volg het verhaal</h2>
        <p>
          De meest directe manier om de verkenning te volgen is via{' '}
          <a href="/blog">de blog</a> op deze website. Daar documenteer ik alle ontwikkelingen,
          inzichten en vervolgstappen.
        </p>

        <h2>Voor de pers</h2>
        <p>
          Ben je journalist en wil je meer weten over deze verkenning? Neem dan contact op
          via onderstaande gegevens. Ik sta open voor gesprekken over het verhaal,
          de achterliggende vraagstelling en de maatschappelijke relevantie.
        </p>

        <h2>Voor Defensie</h2>
        <p>
          Deze verkenning is geen aanval, maar een uitnodiging tot dialoog. Als
          vertegenwoordiger van Defensie en je wilt reageren, meedenken of in gesprek
          gaan over deze verkenning, dan hoor ik graag van je.
        </p>

        <h2>Voor medekandidaten</h2>
        <p>
          Ben je zelf 55+ en overweeg je ook om te solliciteren bij Defensie? Of heb
          je al ervaring met het wervingsproces? Ik hoor graag je verhaal. Misschien
          kunnen we elkaar versterken.
        </p>

        <h2>Algemeen contact</h2>
        <p>
          Voor alle andere vragen, reacties of suggesties kun je contact met me opnemen.
          Ik probeer alle berichten te beantwoorden, al kan dat soms even duren.
        </p>

        <p className="mt-6">
          <a
            href="mailto:tim@timselders.nl?subject=Contact via De Senior Reservisten"
            className="btn-primary inline-block"
          >
            Stuur me een e-mail
          </a>
        </p>
      </div>

      <div className="prose prose-lg max-w-none">

        <h2>Privacy en transparantie</h2>
        <p>
          Ik ga zorgvuldig om met persoonlijke informatie. Alle correspondentie wordt
          vertrouwelijk behandeld, tenzij je expliciet toestemming geeft om delen van
          een gesprek publiek te maken.
        </p>

        <p>
          Ik gebruik geen namen van individuele recruiters of ambtenaren in mijn
          verslaglegging. Mijn focus ligt op systemen en processen, niet op personen.
        </p>

        <div className="mt-12">
          <a href="/blog" className="btn-primary">
            Terug naar de verkenning
          </a>
        </div>
      </div>
    </div>
  )
}
