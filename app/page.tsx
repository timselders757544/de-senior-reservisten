export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-light text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            DE SENIOR RESERVISTEN
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-200 mb-12 font-sans">
            150.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-content">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-primary">Defensie zoekt mensen. Wij melden ons.</h2>

          <p>
            Niet als helden, niet als experts, niet als ideale kandidaten. Wel als twee
            professionals van 55+ die willen weten: herkent een systeem dat schreeuwt om
            vernieuwing ook vernieuwers als ze aanbellen?
          </p>

          <p>
            Dit is geen klacht en geen kruistocht. Dit is een live experiment. Wij documenteren
            wat er gebeurt als onwaarschijnlijke kandidaten het wervingsproces ingaan — de
            formulieren, de gesprekken, de stiltes, de absurditeiten.
          </p>

          <p>
            Senior in leeftijd. Senior in ervaring. Zonder rang, zonder uniform, zonder garantie
            op succes.
          </p>

          <p className="text-xl font-semibold text-primary mt-8">
            De vraag is niet of wij geschikt zijn. De vraag is of het systeem zichzelf toestaat
            om ons te vinden.
          </p>

          <div className="mt-12 flex gap-4">
            <a href="/blog" className="btn-primary">
              Lees het verhaal
            </a>
            <a href="/over" className="btn-primary bg-primary-light hover:bg-primary">
              Over dit experiment
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
