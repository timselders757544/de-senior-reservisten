import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary to-primary-light text-white py-8 md:py-20 px-4 md:px-6 overflow-hidden min-h-[320px] md:min-h-[500px]">
        {/* Linker figuur - burger Tim - half zichtbaar op mobiel */}
        <div className="absolute bottom-0 -left-[60px] w-[240px] md:left-[calc(50%-630px)] md:w-[336px] lg:w-[420px]">
          <Image
            src="/images/burger-tim.png"
            alt="Tim in burgerkledij"
            width={800}
            height={1000}
            className="w-full h-auto object-contain object-bottom"
            priority
          />
        </div>

        {/* Rechter figuur - reservist Tim - half zichtbaar op mobiel */}
        <div className="absolute bottom-0 -right-[60px] w-[240px] md:right-[calc(50%-630px)] md:w-[336px] lg:w-[420px]">
          <Image
            src="/images/reservist-tim.png"
            alt="Tim in reservistenuniform"
            width={800}
            height={1000}
            className="w-full h-auto object-contain object-bottom"
            priority
          />
        </div>

        {/* Tekst in het midden */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            DE SENIOR RESERVISTEN
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-200 font-sans leading-snug">
            100.000 open vacatures,<br />
            1 man op leeftijd,<br />
            1 intentie, 0 pretenties.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-content">
        <div className="prose prose-base md:prose-lg max-w-none">
          <h2 className="text-primary">Defensie zoekt mensen. Ik meld me.</h2>

          <p>
            Niet als held, niet als expert, niet als ideale kandidaat. Wel als een
            professional van 55+ die wil weten: herkent een systeem dat schreeuwt om
            vernieuwing ook vernieuwers als ze aanbellen?
          </p>

          <p>
            Dit is geen klacht en geen kruistocht. Dit is een live experiment. Ik documenteer
            wat er gebeurt als een onwaarschijnlijke kandidaat het wervingsproces ingaat — de
            formulieren, de gesprekken, de stiltes, de absurditeiten.
          </p>

          <p>
            Senior in leeftijd. Senior in ervaring. Zonder rang, zonder uniform, zonder garantie
            op succes.
          </p>

          <p className="text-xl font-semibold text-primary mt-8">
            De vraag is niet of ik geschikt ben. De vraag is of het systeem zichzelf toestaat
            om mij te vinden.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="/blog" className="btn-primary">
              Naar de verkenning
            </a>
            <a href="/over" className="btn-primary bg-primary-light hover:bg-primary">
              Over mij
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
