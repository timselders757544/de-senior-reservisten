import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary to-primary-light text-white py-8 md:py-20 px-4 md:px-6 overflow-hidden md:min-h-[500px]">
        {/* Linker figuur - burger Tim - uitgelijnd aan onderkant section */}
        <div className="hidden md:block absolute bottom-0 left-[calc(50%-630px)] w-[336px] lg:w-[420px]">
          <Image
            src="/images/burger-tim.png"
            alt="Tim in burgerkledij"
            width={800}
            height={1000}
            className="w-full h-auto object-contain object-bottom"
            priority
          />
        </div>

        {/* Rechter figuur - reservist Tim - uitgelijnd aan onderkant section */}
        <div className="hidden md:block absolute bottom-0 right-[calc(50%-630px)] w-[336px] lg:w-[420px]">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            DE SENIOR RESERVISTEN
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-200 font-sans leading-normal">
            150.000 open vacatures,
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-200 font-sans leading-normal">
            2 mannen op leeftijd,
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-200 font-sans leading-normal">
            1 intentie, 0 pretenties.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-content">
        <div className="prose prose-base md:prose-lg max-w-none">
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

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
