"use client";
import ButtonContext from "./ButtonContext";
import { useEffect, useState } from "react";


interface Props {
  children: React.ReactNode;
}

export const ButtonProvider: React.FC<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  //     const setcouponType ={
  //         couponDesc:{},
  // isFeatured:boolean,
  // minSpend:number,
  // name:string,
  // price:string,
  // productCat:string,
  // deliveryDis:{},
  // setdeliveryDis:(e)=>{return e}

  //  }

  
 const [discountType, setdiscountTypeL ] = useState<string>("");
 


  

function setdiscountType(s:string){
 // console.log("dis context-----",s)
  setdiscountTypeL(s)
  }

  return (
    <ButtonContext.Provider
      value={{
        discountType,
  setdiscountType,
     
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};
