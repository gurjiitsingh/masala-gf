"use client";

export default function MasalaFlyer() {
  return (
    <main id="bf" className=" text-gray-800 min-h-screen flex justify-center py-12 px-2">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="text-center p-3">
          {/* <div className="flex justify-center mb-4">
            <img
              src="/images/buffet.jpg" // replace with your logo if needed
              alt="Masala Taste of India"
              className="w-20 h-20 object-contain"
            />
          </div> */}
          <h1 className="text-3xl md:text-4xl font-bold " data-aos="fade-top">
            MASALA – Taste of India
          </h1>
          <p className="text-md  mt-1 text-center md:text-left w-full">
            Authentisches indisches Catering in Gifhorn
          </p>

          <p className="text-gray-700 mt-4 text-center md:text-left">
            Feiern Sie. Wir servieren den Geschmack Indiens.
          </p>

          <p className="text-gray-700 mt-2 text-sm font-thin text-center md:text-left">
            Ob private Feier, Firmen-Event oder Hochzeit – unser Catering bringt
            echte indische Aromen direkt zu Ihnen!
          </p>
        </div>

        {/* Services Section */}
        <div className="px-8 md:px-12 py-6 flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <h2 data-aos="fade-right"  className="text-center md:text-left bg-[#563419] text-2xl font-bold text-white w-full text-white inline-block px-3 py-1 rounded-md mb-4">
              Unsere Services
            </h2>
            <ul className="text-center md:text-left list-disc list-inside space-y-2 text-gray-800">
              <li>Buffet & Fingerfood im indischen Stil</li>
              <li>
                Große Auswahl: Currys, Tandoori, Samosas, Naan, Biryani &
                Desserts
              </li>
              <li>Vegetarisch, vegan & halal möglich</li>
              <li>Getränkeservice mit Mango Lassi & indische Chai</li>
              <li>Lieferung, Aufbau & Personal auf Wunsch</li>
              <li>Dekoration & Equipment im indischen Flair</li>
            </ul>
          </div>

          <div className="md:w-1/3">
            <img
              src="/images/buffet-1.jpg" // <-- replace with your actual image
              alt="Indian Buffet"
              className="rounded-xl shadow-md object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Why Masala Section */}
        <div className="px-8 md:px-12 py-6">
          <h2 data-aos="fade-left" className="bg-[#563419] text-2xl font-bold text-white w-full text-white inline-block px-3 py-1 rounded-md mb-4">
            Warum Masala
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>Authentische Rezepte aus versch. Regionen Indiens</li>
            <li>Frisch zubereitet mit originalen Gewürzen</li>
            <li>Individuelle Beratung & maßgeschneiderte Angebote</li>
            <li>
              Für kleine Feiern ab 10 Personen bis große Events mit 200+ Gästen
            </li>
          </ol>
        </div>

        {/* Contact Section */}
        <div className="px-8 md:px-12 py-8 text-center border-t border-gray-200">
          <h3 className="text-xl font-semibold  mb-3">
            Jetzt Anfragen & Reservieren
          </h3>

          <p className="text-gray-700 mb-2">
            Braunschweigerstr. 93, 38518 Gifhorn
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-2">
            <p className="flex items-center gap-2">
              <span className="font-medium"></span> 05371 6266291
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium"></span> +49 1792224250
            </p>
          </div>

          <p className="flex items-center justify-center gap-2 text-gray-700">
             info@masala-gf.de
          </p>
        </div>
      </div>
    </main>
  );
}
