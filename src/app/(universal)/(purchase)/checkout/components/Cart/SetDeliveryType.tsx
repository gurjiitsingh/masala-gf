import { UseSiteContext } from "@/SiteContext/SiteContext";
import { useLanguage } from "@/store/LanguageContext";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function SetDeliveryType() {
  const { TEXT } = useLanguage();
  const { chageDeliveryType, deliveryType } = UseSiteContext();

  useEffect(() => {
    setDisablePickUpBtn(deliveryType === "pickup");
    setDisableDeliveryBtn(deliveryType === "delivery");
  }, [deliveryType]);

  const [disableDeliveryBtn, setDisableDeliveryBtn] = useState(false);
  const [disablePickUpBtn, setDisablePickUpBtn] = useState(false);
  return (
    <>
      <div className="font-semibold border-b border-slate-200 py-3 w-full flex  justify-start gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-5 flex justify-center">
            {deliveryType === "pickup" && (
              <FaCheck className="text-green-300 " size={24} />
            )}
          </div>
          <div className="w-fit">
            <button
              disabled={disablePickUpBtn}
              onClick={() => chageDeliveryType("pickup")}
              className="flex gap-2  items-center text-sm text-slate-600 bg-green-200 border border-slate-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
            >
              <span>{TEXT.pickup_button}</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-5 flex justify-center">
            {deliveryType === "delivery" && (
              <FaCheck className="text-green-300 " size={24} />
            )}
          </div>

          <div className="w-fit">
            <button
              disabled={disableDeliveryBtn}
              onClick={() => chageDeliveryType("delivery")}
              className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 border border-slate-50 rounded-2xl px-3 font-semibold py-1 w-full text-left "
            >
              <span>{TEXT.delivery_button}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
