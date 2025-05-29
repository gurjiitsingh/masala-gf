"use client";




import { createContext, useContext } from "react";

type ButtonContextType = {

  discountType:string;
  setdiscountType:(e:string) => void;
};

const ButtonContext = createContext<ButtonContextType>({
  discountType:"",
  setdiscountType:(e:string) => {return e},
 
});

export const UseButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export default ButtonContext;
