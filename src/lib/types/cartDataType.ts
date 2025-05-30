import { ProductType } from "./productType";

export  type cartProductType = {
  id: string | undefined;
  price: number;
  quantity:number;
  categoryId: string;
  productCat:string;
  name: string;
  image: string;
}

export type newOrderConditionType = {
success:boolean;
message:string;
}

export type cartDataT = {
    productDesc:string;
    productCat:string;
    id:string;
    image:string;
    isFeatured:boolean;
    name:string;
    price:string;
    purchaseSession:string | null;
    quantity:number;
    status:string;
   
    };
    export type cartDataTArr = {
      productDesc:string;
      productCat:string;
      id:string;
      image:string;
      isFeatured:boolean;
      name:string;
      price:string;
      purchaseSession:string | null;
      quantity:number;
      status:string;
      length:number;
      }[];

      export type cartDataTT = {
        productDesc:string;
        id:string;
        image:string;
        isFeatured:boolean;
        name:string;
        price:string;
        purchaseSession:string | null;
        quantity:number;
        status:string;
        length:number;
        };
    export type cartDataTTArr = {
      productDesc:string;
      id:string;
      image:string;
      isFeatured:boolean;
      name:string;
      price:string;
      purchaseSession:string | null;
      quantity:number;
      status:string;
      length:number;
      }[];

    // export type ProductType ={ 
    //   name: string;
    //    price: string;
    //     productCat: string;
    //      productDesc: string;
    //       image:string;
    //        isFeatured?: boolean | undefined; 
    //       }

   



      export type purchaseDataT = {
        userId: string | undefined;
        cartData: ProductType[];
        total:number;
        totalDiscountG:number;
        address: {
            firstName: string;
            lastName: string;
         //   password:string;
            userId: string | undefined;
            email: string;
            mobNo: string;
            addressLine1: string | undefined;
            addressLine2: string | undefined;
            city: string;
            state: string;
            zipCode: string;
        };
      }


      export type orderDataType = {
        userId: string | undefined;
        customerName: string;
        email:string;
        cartData: ProductType[];
        endTotalG:number;
        totalDiscountG:number;
        flatDiscount:number;
        addressId: string;
        paymentType:string;
        itemTotal:number;
        deliveryCost:number;
        calCouponDiscount:number;
        flatCouponDiscount:number;
        couponDiscountPercentL:number;
        couponCode: string | undefined;
        pickUpDiscountPercentL:number;
        calculatedPickUpDiscountL:number;
        noOffers:boolean;
        
      }