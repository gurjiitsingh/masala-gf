import React from "react";

export default function HowOrder() {
  return (
    <div className="container p-2 flex flex-col gap-4 py-3">
      <div className="w-full text-center text-3xl font-bold">
        Wie das funktioniert?
      </div>
      <div className="w-full text-center text-xl font-normal">
        Wir kümmern uns um dein Essen – und du genießt bequem.
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-[20%] ">
            <img className="w-[100px] " src="/Order_1_grana.svg" alt="Logo" />
          </div>
          <div className="flex flex-col w-[74%]">
            <div className="text-2xl font-semibold">
              Wähle deine Mahlzeiten aus
            </div>
            <div className="">
              Jede Woche kannst du aus 36 leckeren und gesunden Gerichten
              auswählen.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-[20%]  ">
            <img
              className="w-[100px] "
              src="/Send_envase_olive.svg"
              alt="Logo"
            />
          </div>
          <div className="flex flex-col w-[74%]">
            <div className="text-2xl font-semibold">
              Frisch gekochtes Essen erhalten
            </div>
            <div className="">
              Am Tag deiner Wahl liefern wir die von professionellen Köchen
              frisch zubereiteten Gerichte.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-[20%]  ">
            <img
              className="w-[100px] "
              src="/Micro_taper_corn.svg"
              alt="Logo"
            />
          </div>
          <div className="flex flex-col w-[74%] ">
            <div className="text-2xl font-semibold">
              Aufwärmen, essen und genießen!
            </div>
            <div className="">
              Im Kühlschrank halten sich unsere Mahlzeiten bis zu 7 Tage lang.
              Wenn es Essenszeit ist: ab in die Mikrowelle und fertig!
            </div>
          </div>
        </div>
      </div>

      <div className="text-[#718238]">Jederzeit pausieren oder kündigen</div>
    </div>
  );
}
