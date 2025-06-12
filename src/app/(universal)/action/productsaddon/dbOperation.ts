"use server";


//import { z } from "zod";

import { db } from "@/lib/firebaseConfig";
//import { product } from "@/--------db/schema";
// import { Weight } from "lucide-react";
// import { revalidatePath } from "next/cache";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore"; //doc, getDoc,


import { addOnPorductSchema, AddOnProductSchemaType, addOnPorductEditSchema, AddOnProductEditSchemaType } from "@/lib/types/productAddOnType";
import { addOnType } from "@/lib/types/addOnType";

//import { Result } from "postcss";
//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

export async function addNewProduct(formData: FormData) {
  const featured_img: boolean = false;
  const name = formData.get("name");
  const price = formData.get("price");
  const baseProductId = formData.get("baseProductId");
  const sortOrder = formData.get("sortOrder") as string;
  const desc = formData.get("desc");
  //image: formData.get("image"),
  const isFeatured = featured_img;


  const receivedData = {
    name,
    price,
    baseProductId,
    sortOrder,
    desc,
    //image: formData.get("image"),
    isFeatured,
  };

  const result = addOnPorductSchema.safeParse(receivedData);
  console.log("zod result", result);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  //const image = formData.get("image");
  let imageUrl;
  // try {
  //   imageUrl = await upload(image);
  //   console.log(imageUrl);
  // } catch (error) {
  //  // throw new Error("error");
  //   console.log(error);
  //   return { errors: "image cannot uploaded" };
  // }

  //imageUrl =  "/public/com.jpg";

  const priceValue = formData.get("price") as string;
  const priceV = parseFloat(priceValue.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string

  const priceF = new Number(parseFloat(priceV)).toFixed(2);
  const priceFF = parseFloat(priceF);
  const sortOrderN = parseFloat(sortOrder) as number;
  
  const data = {
    name,
    price:priceFF,
   // productCat: formData.get("productCat"),
   sortOrder:sortOrderN,
    desc,
    baseProductId,    // image: imageUrl,
    isFeatured: featured_img,
  };


  try {
    const docRef = await addDoc(collection(db, "productaddon"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  const idS = formData.get("baseProductId") as string;
  updateBaseProduct(idS);

  return { message: "Product saved" };
} //end of add new product

async function updateBaseProduct(id: string) {
  const productUpdtedData = {
    flavors: true,
  };
  //console.log("update data ------------", productUpdtedData)
  // update database
  try {
    const docRef = doc(db, "product", id);
    await updateDoc(docRef, productUpdtedData);

    // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    //   capital: true
    // });

    //   const cityRef = db.collection('cities').doc('DC');

    // // Set the 'capital' field of the city
    // const res = await cityRef.update({capital: true});
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

type rt = {
  errors: string;
};

export async function deleteProduct(
  id: string,
  oldImgageUrl: string
): Promise<rt> {
  console.log("out put ", id, oldImgageUrl);
  return { errors: "Delete not implimented jet" };
}

// export async function deleteProduct(id:string, oldImgageUrl:string) {

//   const result = await db.delete(product).where(eq(product.id, id));

//   if (result?.rowCount === 1) {

//     const imageUrlArray = oldImgageUrl.split("/");
//     console.log(imageUrlArray[imageUrlArray.length - 1]);
//     const imageName =
//       imageUrlArray[imageUrlArray.length - 2] +
//       "/" +
//       imageUrlArray[imageUrlArray.length - 1];

//     const image_public_id = imageName.split(".")[0];
//     console.log(image_public_id);
//     try {
//       let deleteResult = await deleteImage(image_public_id);
//       console.log("image delete data", deleteResult);
//     } catch (error) {
//      // console.log(error);
//       return {errors:"Somthing went wrong, can not delete product picture"}
//     }

//        return {
//       message: { sucess: "Deleted product" },
//     };
//   }else{
//     return {errors:"Somthing went wrong, can not delete product"}
//   }

// }

export async function editAddOnProduct(formData: FormData) {
 // console.log("data----------",formData)
  const id = formData.get("id") as string;
  const name = formData.get("name")
  const  price = formData.get("price")
  const  desc = formData.get("desc")
 
  const  sortOrder = formData.get("sortOrder")
  const  baseProductId = formData.get("baseProductId")
  const  isFeatured = formData.get("isFeatured")
 // const image = formData.get("image");
 // const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const featured_img: boolean = false;
  // featured_img = formData.get("oldImgageUrl");
  

  const receivedData = {
    id,
    name,
    price,
    desc,
    sortOrder,
    baseProductId,    
    //image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = addOnPorductEditSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  let imageUrl;
  // if (image === "undefined" || image === null) {
  //   imageUrl = oldImgageUrl;
  //   //  console.log("----------------not change image")
  // } else {
  //   //  console.log("---------------- change image")
  //   try {
  //     imageUrl = (await upload(image)) as string;
  //     console.log(imageUrl);
  //   } catch (error) {
  //     //  throw new Error("error")
  //     console.log(error);
  //     return { errors: "image cannot uploaded" };
  //   }
  //   const d = false;
  //   if (d) {
  //     const imageUrlArray = oldImgageUrl?.split("/");
  //     console.log("old image url", imageUrlArray);
  //     const imageName =
  //       imageUrlArray[imageUrlArray.length - 2] +
  //       "/" +
  //       imageUrlArray[imageUrlArray.length - 1];

  //     const image_public_id = imageName.split(".")[0];
  //     console.log("image_public_id ---", image_public_id);
  //     try {
  //       const deleteResult = await deleteImage(image_public_id);
  //       console.log(deleteResult);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  const productUpdtedData = {
    name,
    price,
    desc,
    sortOrder,
    baseProductId,    
   // imageUrl,
    isFeatured: featured_img,
  };
 // console.log("update data ------------", productUpdtedData)
  // update database
  try {
    const docRef = doc(db, "productaddon", id);
    await setDoc(docRef, productUpdtedData);
    // const docRef = doc(db, "productaddon", id);
    // await updateDoc(docRef, productUpdtedData);
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchAddOnProducts(): Promise<addOnType[]> {
  // const result = await getDocs(collection(db, "productaddon"))
  // let data = [];
  // result.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  //  return data;

  const result = await getDocs(collection(db, "productaddon"));

  const data = [] as addOnType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as addOnType;
    data.push(pData);
  });
  return data;
}

export async function fetchProductAddonById(id: string): Promise<addOnType> {
  const docRef = doc(db, "productaddon", id);
  const docSnap = await getDoc(docRef);
  let productData = {} as addOnType;
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    console.log("No such document!");
  }
  productData = {id: docSnap.id, ...docSnap.data()} as addOnType;
  return productData;
}

export async function fetchProductAddOnByBaseProductId(
  id: string
): Promise<AddOnProductSchemaType[]> {

  // console.log("fetch addon by id--------------", id)
  const data = [] as AddOnProductSchemaType[];
  const q = query(
    collection(db, "productaddon"),
    where("baseProductId", "==", id)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const datas = {id: doc.id, ...doc.data()} as AddOnProductSchemaType;
    data.push(datas);
  });
  // console.log("add on data-------------", data)
  return data;
}

//console.log("Foorm data ---------",formData.get("oldImgageUrl"));
// console.log(formData.get("price"));
// console.log(formData.get("productCat"));
// console.log(formData.get("productDesc"));
// console.log(formData.get("image"));
// console.log("is featured =======",formData.get("isFeatured"));
// featured_img = formData.get("isFeatured");
// if (formData.get("isFeatured").toString() === "true") {
//   featured_img = true;
// }
