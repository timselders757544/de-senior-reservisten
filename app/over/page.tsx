import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Over dit experiment',
  description: 'Wat gebeurt er als twee 55-plussers zich melden bij een organisatie die schreeuwt om vernieuwing? De vraagstelling achter het Senior Reservisten experiment.',
}

export default function Over() {
  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">Over dit experiment</h1>

        <h2>De vraagstelling</h2>
        <p>
          Defensie kampt met een personeelstekort van ongeveer 150.000 mensen. Tegelijkertijd
          wordt een groeiende groep professionals van 55+ steeds vaker geconfronteerd met
          leeftijdsdiscriminatie en vooroordelen in de arbeidsmarkt.
        </p>

        <p>
          Dit roept de vraag op: wat gebeurt er als deze twee werelden elkaar ontmoeten?
          Niet in een beleidsnota, maar in de praktijk. Live. Gedocumenteerd.
        </p>

        <h2>Het experiment</h2>
        <p>
          Wij — twee professionals van 55+ zonder militaire achtergrond — gaan het
          wervingsproces van Defensie in. Niet als ideale kandidaten, niet als
          carrièrejagers, maar als nieuwsgierige buitenstaanders die willen weten:
          herkent een systeem dat schreeuwt om vernieuwing ook vernieuwers als ze aanbellen?
        </p>

        <p>
          We documenteren alles: de formulieren, de gesprekken, de procedures, de stiltes,
          de absurditeiten, de verrassingen. Dit is geen klacht en geen kruistocht.
          Het is een mirror aan een systeem dat zichzelf heeft uitgesproken over innovatie,
          maar nu getoetst wordt op praktijk.
        </p>

        <h2>Wat we niet zijn</h2>
        <ul>
          <li>Helden die Defensie komen redden</li>
          <li>Experts met oplossingen</li>
          <li>Activisten met een agenda</li>
          <li>Journalisten op zoek naar een schandaal</li>
        </ul>

        <h2>Wat we wel zijn</h2>
        <ul>
          <li>Professionals met decennia ervaring in organisaties en systemen</li>
          <li>Mensen die weten wat het is om buiten het plaatje te vallen</li>
          <li>Observatoren die kunnen vertalen wat ze zien</li>
          <li>Experimenteerders die bereid zijn kwetsbaar te zijn</li>
        </ul>

        <h2>De inzet</h2>
        <p>
          Dit is een experiment in publiek leren. De vraag is niet of wij geschikt zijn.
          De vraag is of het systeem zichzelf toestaat om ons te vinden. Of bureaucratie
          ruimte maakt voor menselijkheid. Of protocollen flexibel genoeg zijn voor de
          werkelijkheid.
        </p>

        <p>
          We gaan het gewoon doen. We gaan solliciteren. We gaan documenten invullen.
          We gaan gesprekken voeren. We gaan testen doen. We gaan luisteren. We gaan
          observeren. En we gaan vertellen wat we zien.
        </p>

        <h2>Transparantie</h2>
        <p>
          Alles wat we documenten is openbaar, tenzij privacy of veiligheid een rol spelen.
          We gebruiken geen namen van individuele ambtenaren of recruiters. We focussen op
          systemen, processen en patronen — niet op personen.
        </p>

        <p className="text-xl font-semibold text-primary mt-8">
          De reis begint met één simpele vraag: "Mogen wij meedoen?"
        </p>

        <div className="mt-12">
          <a href="/blog" className="btn-primary">
            Volg het verhaal
          </a>
        </div>
      </div>
    </div>
  )
}
