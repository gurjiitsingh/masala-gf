'use client'

export default function RestaurantShowcase() {
  return (
    <section className="bg-[#f4efdf] text-gray-800 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Image (shorter) */}
        <div className="w-full">
          <img
            src="/images/restaurant-interior.jpg"
            alt="Left image"
            className="w-full object-cover h-64 md:h-[400px]"
          />
        </div>

        {/* Middle Image (taller) */}
        <div className="w-full">
          <img
            src="/images/bar-counter.jpg"
            alt="Center image"
            className="w-full object-cover h-80 md:h-[550px]"
          />
        </div>

        {/* Right Text + Image */}
        <div className="flex flex-col justify-start">
          {/* Text Block */}
          <div className="mb-6">
            <p className="text-[17px] leading-relaxed text-gray-700">
              Ob leichte Antipasti, herzhafte Fleisch- und Fischgerichte oder
              vegetarische Köstlichkeiten – bei uns findet jeder Gaumen sein
              Geschmackserlebnis.
            </p>
            <p className="mt-4 tracking-widest font-semibold text-sm text-gray-700">
              JATINDER SINGH / INHABER
            </p>
          </div>

          {/* Image Below Text */}
          <img
            src="/images/bar-shelf.jpg"
            alt="Right image"
            className="w-full object-cover h-64 md:h-[350px]"
          />
        </div>
      </div>
    </section>
  );
}


