"use server";

//import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";
import { db } from "@/lib/firebaseConfig";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore"; //doc, getDoc,
import { deliveryType, newPorductSchema, editPorductSchema, } from "@/lib/types/deliveryType";


export async function addNewdelivery(formData: FormData) {
 
//   console.log(formData.get("name"));
//   console.log(formData.get("price"));
//    console.log(formData.get("minSpend"));
//    console.log(formData.get("productCat"));
//   console.log(formData.get("deliveryDesc"));
//  // console.log(formData.get("image"));
//   console.log(formData.get("deliveryDistance"));
const MinSpend = formData.get("minSpend") as string;
   const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    minSpend:  MinSpend,
    productCat: formData.get("productCat"),
    deliveryDesc: formData.get("deliveryDesc"),
    deliveryDistance: formData.get("deliveryDistance"),
    //image: formData.get("image"),
   
  };

  const result = newPorductSchema.safeParse(receivedData);
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
 // let imageUrl;
  // try {
  //   imageUrl = await upload(image);
  //   console.log(imageUrl);
  // } catch (error) {
  //  // throw new Error("error");
  //   console.log(error);
  //   return { errors: "image cannot uploaded" };
  // }

 // imageUrl = "/public/com.jpg";

  // const name = formData.get("name");
  // const price = formData.get("price");
  // const productCat = formData.get("productCat");
  // const deliveryDesc = formData.get("deliveryDesc");
  // const featured = formData.get("deliveryDistance");
  const MinSpendN = parseFloat( MinSpend);
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    deliveryDesc: formData.get("deliveryDesc"),
    minSpend: MinSpendN,
    deliveryDistance: formData.get("deliveryDistance"),
  };
  //console.log("data to be saved ---", data)

  try {
    const docRef = await addDoc(collection(db, "delivery"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return { message: "delivery saved" };

} //end of add new delivery



type rt = {
  success: string;
 
  
};

export async function deletedelivery(id: string): Promise<rt> {
  const docRef = doc(db, "delivery", id);
  await deleteDoc(docRef);
  return { success: "Delete implimented" };
}



export async function editdelivery(formData: FormData) {
  const id = formData.get("id") as string;
  // const image = formData.get("image");
  // const oldImgageUrl = formData.get("oldImgageUrl") as string;
  // const featured_img: boolean = false;
  // featured_img = formData.get("oldImgageUrl");

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    deliveryDesc: formData.get("deliveryDesc"),
    minSpend: formData.get("minSpend"),
   // image: formData.get("image"),
    deliveryDistance: formData.get("deliveryDistance"),
  };

  const result = editPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  // let imageUrl;
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

  const deliveryUpdtedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    deliveryDesc: formData.get("deliveryDesc"),
   // image: imageUrl,
   minSpend: formData.get("minSpend"),
    deliveryDistance: formData.get("deliveryDistance"),
  };
  //console.log("update data ------------", deliveryUpdtedData)
  // update database
  try {
    const docRef = doc(db, "delivery", id);
    await setDoc(docRef, deliveryUpdtedData);
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchdelivery(): Promise<deliveryType[]> {
  // const result = await getDocs(collection(db, "delivery"))
  // let data = [];
  // result.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  //  return data;

  const result = await getDocs(collection(db, "delivery"));

  const data = [] as deliveryType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as deliveryType;
    data.push(pData);
  });
  return data;
}

export async function fetchdeliveryById(id: string): Promise<deliveryType> {
  //console.log("--------- id", id)
  const docRef = doc(db, "delivery", id);
  const docSnap = await getDoc(docRef);
  let deliveryData = {} as deliveryType;
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    console.log("No such document!");
  }
  deliveryData = docSnap.data() as deliveryType;
  return deliveryData;
}

export async function fetchdeliveryByZip(
  zipname: string
): Promise<deliveryType> {
 // console.log("insider delivery action------", zipname)
  const data = [] as deliveryType[];
  const q = query(
    collection(db, "delivery"),
    where("name", "==", zipname)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const datas = doc.data() as deliveryType;
    data.push(datas);
  });
  //console.log("email -------- ", data)
  return data[0];
}
