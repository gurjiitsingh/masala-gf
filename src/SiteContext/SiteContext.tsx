"use client";



import { couponType } from "@/lib/types/couponType";
import { deliveryType } from "@/lib/types/deliveryType";
import { createContext, useContext } from "react";

type SiteContextType = {
  newOrderCondition: boolean;
  setNewOrderCondition: (e: boolean) => void;
  open: boolean;
  deliveryType: string;
  deliveryCost: number;
  setDeliveryCost: (e:number) => void;
  sideBarToggle: (e: boolean) => void;
  openBargerMenu: boolean;
  bargerMenuToggle: (e: boolean) => void;
  openEmailForm: boolean;
  emailFormToggle: (e: boolean) => void;
  chageDeliveryType: (e: string) => void;
  couponDisc: couponType | undefined;
  setCouponDisc: (e: couponType) => void;
  deliveryDis: deliveryType | undefined;
  setdeliveryDis: (e: deliveryType) => void;
  showProductDetailM: boolean;
  setShowProductDetailM: (e: boolean) => void;
  baseProductId: string;
  setBaseProductId: (e: string) => void;
  adminSideBarToggle: boolean;
  setAdminSideBarToggleG: (e: boolean) => void;
  setCustomerEmailG: (e: string) => void;
  customerEmail: string;
  productCategoryIdG: string;
  setProductCategoryIdG: (e: string) => void;
  paymentType:string;
  setPaymentType:(e:string) => void;
};

const SiteContext = createContext<SiteContextType>({
  paymentType:"",
  setPaymentType:(e:string) => {return e},
  newOrderCondition: false,
  setNewOrderCondition: (e: boolean) => {
    return e;
  },
  deliveryCost: 0,
  setDeliveryCost: (e) => {return e;},
  open: false,
  deliveryType: "pickup",
  sideBarToggle: () => {},
  openBargerMenu: false,
  bargerMenuToggle: () => {},
  openEmailForm: false,
  emailFormToggle: (e) => {
    return e;
  },
  chageDeliveryType: (e) => {
    return e;
  },
  couponDisc: { 
    couponDesc: "",
    isFeatured: false,
    minSpend: 0,
    name: "",
    price: 0,
    productCat: "",
    isActivated:false,
     startDate:"",
      date:""
  },

  setCouponDisc: (e) => {
    return e;
  },
  deliveryDis: {
    id: "",
    name: "",
    price: "",
    minSpend: 0,
    deliveryDesc: "",
    productCat: "",
    //image: string;
    deliveryDistance: "",
  },
  setdeliveryDis: (e) => {
    return e;
  },
  showProductDetailM: false,
  setShowProductDetailM: (e) => {
    return e;
  },
  baseProductId: "",
  setBaseProductId: (e) => {
    return e;
  },
  adminSideBarToggle: false,
  setAdminSideBarToggleG: (e) => {
    return e;
  },
  setCustomerEmailG: (e) => {
    return e;
  },
  customerEmail: "",

  productCategoryIdG: "",
  setProductCategoryIdG: (e) => {
    return e;
  },
});

export const UseSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export default SiteContext;
