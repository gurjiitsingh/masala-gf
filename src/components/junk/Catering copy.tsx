"use client";

export default function Catering() {
  return (
    <section className="bg-[#fffaf5] text-gray-800">
      {/* --- Section 1: Intro --- */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Image */}
       

        {/* Right Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-[#d24a0f] mb-2">
              MASALA – Taste of India
            </h1>
            <p className="text-lg text-[#d24a0f] font-medium mb-4">
              Authentisches indisches Catering in Gifhorn
            </p>
            <p className="text-gray-700 leading-relaxed mb-3 font-medium">
              Feiern Sie. Wir servieren den Geschmack Indiens.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ob private Feier, Firmen-Event oder Hochzeit – unser Catering bringt
              echte indische Aromen direkt zu Ihnen!
            </p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Unsere Services --- */}
      <div className="flex flex-col md:flex-row-reverse items-center bg-[#fdf4ec]">
        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/catering-1.jpg"
            alt="Catering Service"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-[#d24a0f] mb-4">
              Unsere Services
            </h2>
            <ul className="text-gray-700 leading-relaxed space-y-2">
              <li>Buffet & Fingerfood im indischen Stil</li>
              <li>
                Große Auswahl: Currys, Tandoori, Samosas, Naan, Biryani & Desserts
              </li>
              <li>Vegetarisch, vegan & halal möglich</li>
              <li>Getränkeservice mit Mango Lassi & indische Chai</li>
              <li>Lieferung, Aufbau & Personal auf Wunsch</li>
              <li>Dekoration & Equipment im indischen Flair</li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Section 3: Warum Masala --- */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/catering-2.jpg"
            alt="Indian Spices"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-[#d24a0f] mb-4">
              Warum Masala
            </h2>
            <ol className="list-decimal list-inside text-gray-700 leading-relaxed space-y-2 text-left">
              <li>Authentische Rezepte aus versch. Regionen Indiens</li>
              <li>Frisch zubereitet mit originalen Gewürzen</li>
              <li>Individuelle Beratung & maßgeschneiderte Angebote</li>
              <li>
                Für kleine Feiern ab 10 Personen bis große Events mit 200+ Gästen
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* --- Section 4: Kontakt --- */}
      <div className="flex flex-col md:flex-row-reverse items-center bg-[#d24a0f] text-white">
        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/catering-1.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        

        {/* Left Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold mb-4">
              Jetzt Anfragen & Reservieren
            </h3>
            <p className="mb-2">Braunschweigerstr. 93, 38518 Gifhorn</p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-3">
              <p className="flex items-center gap-2">
                📞 <span>05371 6266291</span>
              </p>
              <p className="flex items-center gap-2">
                📱 <span>+49 1792224250</span>
              </p>
            </div>

            <p className="flex justify-center gap-2">
              ✉️ info@masala-gf.de
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
