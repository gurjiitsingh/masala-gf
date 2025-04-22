"use server";

//import { z } from "zod";
//import { deleteImage, upload } from "@/lib/cloudinary";
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
import {
  flavorsProductGType,
  flavorsProductGSchema,
} from "@/lib/types/flavorsProductGType";

export async function addNewProduct(formData: FormData) {
  let featured_img: boolean = false;
  // console.log(formData.get("name"));
  // console.log(formData.get("price"));
  //  console.log(formData.get("baseProductId"));
  //  console.log(formData.get("productCat"));
  // console.log(formData.get("productDesc"));
  // console.log(formData.get("image"));
  // console.log(formData.get("isFeatured"));

  if (formData.get("isFeatured") === "ture") featured_img = true;

  //console.log("isFeatured ", typeof formData.get("isFeatured"));

  const name = formData.get("name");
  const price = formData.get("price");
  const productCat = formData.get("productCat");
  const productDesc = formData.get("productDesc");
  const baseProductId = "";
  // image =  imageUrl,
  const isFeatured = featured_img;

  const receivedData = {
    name,
    price,
    baseProductId,
    productCat,
    productDesc,
    //image: formData.get("image"),
    isFeatured,
  };

  const result = flavorsProductGSchema.safeParse(receivedData);
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

  const priceValue = formData.get("price") as string;
  const priceV = parseFloat(priceValue.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string
  const priceF = parseFloat(priceV);

  const data = {
    name,
    price: priceF,
    baseProductId,
    productCat,
    productDesc,
    //image: formData.get("image"),
    isFeatured,
  };
  //console.log("data to be saved ---", data)

  try {
    const docRef = await addDoc(collection(db, "flavorsProductG"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return { message: "Product saved" };
} //end of add new product

// type deleteType ={
//   error:string | undefined;
//   success: string | undefined;
// }

export async function editProduct(formData: FormData) {


   console.log("this is edit sauce -------", formData);
  

  // const featured_img: boolean = false;
  const id = formData.get("id") as string;
  const name = formData.get("name");
  const price = formData.get("price") as string;
  // const price = priceValue.replace(/,/g, ".");
  const productCat = formData.get("productCat");
  //const categoryId = formData.get("categoryId");
  const productDesc = formData.get("productDesc");
  //const oldImgageUrl = formData.get("oldImgageUrl") as string;
  

  const receivedData = {
    name,
    price,
    productCat,
    productDesc,
   
  };

  const result = flavorsProductGSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  //let imageUrl;
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


  const priceV = parseFloat(price.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string
  const priceF = parseFloat(priceV);

  const productUpdtedData = {
    name,
    price: priceF,
    productCat,
  //  categoryId,
    productDesc,
   // image:imageUrl,
   // isFeatured,
  };

  console.log("update data ------------", productUpdtedData);

  try {
    const docRef = doc(db, "flavorsProductG", id);
    await setDoc(docRef, productUpdtedData);
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function deleteProduct(id: string): Promise<string> {
  const docRef = doc(db, "flavorsProductG", id);
  await deleteDoc(docRef);
  //return { errors: "Delete not implimented jet" };
  return "ok";
}

export async function fetchflavorsProductG(): Promise<flavorsProductGType[]> {
  // const result = await getDocs(collection(db, "flavorsProductG"))
  // let data = [];
  // result.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  //  return data;

  const result = await getDocs(collection(db, "flavorsProductG"));

  let data = [] as flavorsProductGType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as flavorsProductGType;
    data.push(pData);
  });
  return data;
}

export async function fetchProductById(
  id: string
): Promise<flavorsProductGType> {
  const docRef = doc(db, "flavorsProductG", id);
  const docSnap = await getDoc(docRef);
  let productData = {} as flavorsProductGType;
  if (docSnap.exists()) {
    //  console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    console.log("No such document!");
  }
  productData = docSnap.data() as flavorsProductGType;
  return productData;
}

export async function fetchProductByBaseProductId(
  id: string
): Promise<flavorsProductGType[]> {
  let data = [] as flavorsProductGType[];
  const q = query(
    collection(db, "flavorsProductG"),
    where("baseProductId", "==", id)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const datas = doc.data() as flavorsProductGType;
    data.push(datas);
  });
  return data;
}
