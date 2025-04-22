import React from 'react'

export default function Contact() {
  return (
    <div className="container mx-auto py-5 p-1">
      
      <div className="flex flex-col gap-8 md:flex-row my-24 justify-between">
        {/* Address Section */}
        <div className=" flex flex-col">
          <h1 className="text-[#333] text-[3rem]">Masala Taste of India</h1>
          <div className="w-full md:w-[50%] space-y-3 text-lg">
            <a className="relative mb-5 block aspect-square w-20" href="/de">
              <img
                alt="Pizzabaaz"
                src="https://assets-prod-gillz.s3.eu-central-1.amazonaws.com/e251843b-6f27-458d-9d6f-0bc164920168/1731781573178_kxSGE1X.png"
                width={80}
                height={80}
                className="object-contain"
              />
            </a>
            <a
              className="flex items-center justify-start"
              title="Braunschweiger Str. 93, 38518 Gifhorn, Germany"
              href="http://maps.google.com/maps?q=52.4717066,10.5434431"
              target="_blank"
              rel="noreferrer"
            >
              📍 Braunschweiger Str. 93, 38518 Gifhorn, Germany
            </a>
            <a
              className="flex items-center justify-start"
              title="05371 6266291"
              href="tel:053716266291"
              target="_blank"
              rel="noreferrer"
            >
              📞 05371 6266291
            </a>
            <a
              className="flex items-center justify-start"
              title="info@masala-gf.de"
              href="mailto:info@masala-gf.de"
              target="_blank"
              rel="noreferrer"
            >
              ✉️ info@masala-gf.de
            </a>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="google_map w-full md:w-[50%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2430.4102913899947!2d10.540868176678202!3d52.47170657204857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDI4JzE4LjEiTiAxMMKwMzInMzYuNCJF!5e0!3m2!1sen!2sin!4v1736146998436!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
           
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
