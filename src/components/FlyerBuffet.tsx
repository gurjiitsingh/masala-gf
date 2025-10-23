import Image from "next/image";

export default function FlyerBuffet() {
  return (
    <div id="bf" className=" text-gray-800  flex justify-center py-12 px-2">
      <div className="container mx-auto w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="p-12">
            <h1 className="text-3xl md:text-4xl font-bold " data-aos="fade-top">
              MASALA – Taste of India
            </h1>
            <h2 className="text-2xl font-bold text-center md:text-left">Indisches Buffet</h2>

            <h3 className="text-xl font-semibold text-center md:text-left">
              + Alkoholfreies Getränk{" "}
              <span className="text-sm font-normal">(1× – 0,4 L)</span>
            </h3>

            <div className="text-lg text-gray-800 mt-4">
              <p className="font-semibold text-center md:text-left">Pro Person 19,99€</p>
              <p className="font-semibold text-center md:text-left">Kinder bis 7 Jahre 9,99€</p>
              <p className=" underline mt-2 text-center md:text-left">Angebot bis 31.12.2025</p>
            </div>

            <div className="text-gray-700 mt-4">
              <p className="font-medium text-center md:text-left">Freitag, Samstag, Sonntag</p>
              <p className="text-center md:text-left">Von 17:00 bis 21:00 Uhr</p>
            </div>

            <div className="text-sm text-gray-600 mt-4 space-y-1 text-center md:text-left">
              <p>Braunschweigerstr. 93, 38518 Gifhorn</p>
              <p> 05371 62 66 291 | masala-gf.de</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 rounded-2xl shadow-md p-2 md:p-3 max-w-4xl mx-auto mt-6">
              {/* Left Side: Text */}
              <div className="text-center md:text-left mb-8 md:mb-0 md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                  Hier scannen und Tisch reservieren
                </h2>
                <p className="text-gray-600 mt-3">
                  Einfach QR-Code scannen, in wenigen
                  Sekunden reservieren.
                </p>
              </div>

              {/* Right Side: QR Code Image */}
              <div className="flex justify-center md:justify-end md:w-1/2">
                <div className="bg-gray-200 rounded-full p-6 flex items-center justify-center shadow-lg">
                  <Image
                    src="/images/code.png" // place your QR image in public/qr-code.png
                    alt="QR Code to reserve a table"
                    width={180}
                    height={180}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

          
          </div>
          <div className="md:w-1/4">
            <img
              src="/images/buffet.jpg" // <-- replace with your actual image
              alt="Indian Buffet"
              className="rounded-xl shadow-md object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
