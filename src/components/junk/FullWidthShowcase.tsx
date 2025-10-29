'use client'


export default function FullWidthShowcase() {
  return (
    <section className="bg-[#f4efdf] text-gray-800">
      {/* --- First Row --- */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/1.png"
            alt="Wine and table setup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="max-w-md">
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
              KULINARISCHES ERLEBNIS
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-[#2b2e4a] mb-4">
              Zeitlos & traditionell
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Genießen Sie Ihre Auszeit in entspannter Atmosphäre im
              liebevollen Restaurant und lassen Sie sich von uns verwöhnen.
            </p>
            <button className="bg-[#2b2e4a] text-white px-6 py-2 uppercase tracking-wider text-sm hover:bg-[#1f2035] transition">
              Speisekarte
            </button>
          </div>
        </div>
      </div>

      {/* --- Second Row --- */}
      <div className="flex flex-col md:flex-row-reverse items-center">
        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/2.png"
            alt="Fine dining plate"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16">
          <div className="max-w-md">
            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
              MEDITERRAN INTERNATIONAL
            </p>
            <h2 className="text-2xl md:text-3xl font-medium text-[#2b2e4a] mb-4">
              Qualität & Frische
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Wir achten bei unseren Einkäufen auf frische Produkte und
              erstklassige Qualität. Nur so können wir Ihnen ein
              Geschmackserlebnis bieten, an das Sie sich gerne erinnern.
            </p>
            <button className="bg-[#2b2e4a] text-white px-6 py-2 uppercase tracking-wider text-sm hover:bg-[#1f2035] transition">
              Speisekarte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
