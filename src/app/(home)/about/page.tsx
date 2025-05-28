import React from "react";

export default function Page() {
  return (
    <div className="relative container mx-auto py-5 p-1">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-[55%]">
          <div className="flex flex-col ">
            <h1 className="text-[2rem] mb-9 text-[#181818]">Über Uns</h1>
            <h2 className="text-[1.6rem] font-semibold  mb-0">
              Willkommen bei Masala - Taste of India!
            </h2>
            <p className="text-[.9rem] text-[#222]">
              Wir bringen die authentischen Aromen der indischen Küche direkt
              nach Gifhorn und Braunschweig. Unser Restaurant steht für
              traditionelle Rezepte, frische Zutaten und einen unvergleichlichen
              Geschmack, der Sie auf eine kulinarische Reise durch Indien
              mitnimmt.
            </p>
            <h3 className="text-[1.3rem] font-semibold mt-6  mb-0">
              Unsere Philosophie:
            </h3>
            <p className="text-[.9rem] text-[#222]">
              Frische Zutaten: Wir verwenden nur die besten und frischesten
              Zutaten, um unsere Gerichte zuzubereiten.
              <br />
              Vielfalt: Unsere Speisekarte bietet eine große Auswahl – von
              würzigen Currys bis hin zu milden vegetarischen Spezialitäten.
              <br />
              Gastfreundschaft: Ihr Wohlbefinden steht für uns an erster Stelle.
              <br />
              Ob für ein gemütliches Essen im Restaurant, eine schnelle
              Lieferung nach Hause oder Catering für besondere Anlässe – wir
              sind für Sie da!
              <br />
              <br />
              Besuchen Sie uns in Gifhorn oder Braunschweig und erleben Sie den
              Geschmack Indiens.
            </p>
            <h3 className="text-[1.1rem] font-semibold mt-6  mb-0">
              Masala - Taste of India
            </h3>
            <p className="text-[.9rem] text-[#222]">
              Gifhorn: Braunschweiger Straße 93, 38518 Gifhorn
            </p>
          </div>
          <div className="pic flex w-full md:w-[45%]"></div>
        </div>
      </div>
    </div>
  );
}
