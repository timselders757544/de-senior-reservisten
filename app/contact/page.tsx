import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met De Senior Reservisten. Voor de pers, Defensie, medekandidaten of algemene vragen over het experiment.',
}

export default function Contact() {
  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">Contact</h1>

        <p>
          Dit experiment is publiek en open. We delen onze ervaringen transparant en
          nodigen anderen uit om mee te denken, te reageren en bij te dragen aan het gesprek.
        </p>

        <h2>Volg het verhaal</h2>
        <p>
          De meest directe manier om het experiment te volgen is via{' '}
          <a href="/blog">de blog</a> op deze website. Daar documenteren we alle ontwikkelingen,
          inzichten en vervolgstappen.
        </p>

        <h2>Voor de pers</h2>
        <p>
          Ben je journalist en wil je meer weten over dit experiment? Neem dan contact op
          via onderstaande gegevens. We staan open voor gesprekken over het verhaal,
          de achterliggende vraagstelling en de maatschappelijke relevantie.
        </p>

        <h2>Voor Defensie</h2>
        <p>
          Dit experiment is geen aanval, maar een uitnodiging tot dialoog. Als
          vertegenwoordiger van Defensie en je wilt reageren, meedenken of in gesprek
          gaan over dit experiment, dan horen we graag van je.
        </p>

        <h2>Voor medekandidaten</h2>
        <p>
          Ben je zelf 55+ en overweeg je ook om te solliciteren bij Defensie? Of heb
          je al ervaring met het wervingsproces? We horen graag je verhaal. Misschien
          kunnen we elkaar versterken in dit experiment.
        </p>

        <h2>Algemeen contact</h2>
        <p>
          Voor alle andere vragen, reacties of suggesties kun je contact met ons opnemen.
          We proberen alle berichten te beantwoorden, al kan dat soms even duren.
        </p>

        <div className="bg-neutral-200 p-6 rounded my-8">
          <p className="text-sm text-neutral-700 mb-0">
            <strong>Let op:</strong> Contactgegevens volgen binnenkort. Dit experiment is net gestart
            en we richten nog de communicatiekanalen in.
          </p>
        </div>

        <h2>Privacy en transparantie</h2>
        <p>
          We gaan zorgvuldig om met persoonlijke informatie. Alle correspondentie wordt
          vertrouwelijk behandeld, tenzij je expliciet toestemming geeft om delen van
          een gesprek publiek te maken.
        </p>

        <p>
          We gebruiken geen namen van individuele recruiters of ambtenaren in onze
          verslaglegging. Ons focus ligt op systemen en processen, niet op personen.
        </p>

        <div className="mt-12">
          <a href="/blog" className="btn-primary">
            Terug naar het verhaal
          </a>
        </div>
      </div>
    </div>
  )
}
