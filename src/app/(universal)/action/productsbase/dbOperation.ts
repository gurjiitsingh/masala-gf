"use server";
import { newPorductSchema, editPorductSchema } from "@/lib/types/productType";

//import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";
import { db } from "@/lib/firebaseConfig";
//import { product } from "@/--------db/schema";
// import { Weight } from "lucide-react";
// import { revalidatePath } from "next/cache";

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

import { ProductType } from "@/lib/types/productType";

//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

export async function addNewProduct(formData: FormData) {
  console.log("formdata-----", formData);
  let featured_img: boolean = false;

  if (formData.get("isFeatured") === "ture") {
    featured_img = true;
  } else {
    featured_img = false;
  }
  //console.log("isFeatured ", typeof formData.get("isFeatured"));
  const name = formData.get("name");
  const price = formData.get("price");
  const discountPrice = formData.get("discountPrice");
  const sortOrder = formData.get("sortOrder") as string;
  const categoryId = formData.get("categoryId");
  const productDesc = formData.get("productDesc");
  const image = formData.get("image");
  const isFeatured = featured_img;

  const receivedData = {
    name,
    price,
    discountPrice,
    sortOrder,
    categoryId,
    productDesc,
    image,
    isFeatured,
  };

  const result = newPorductSchema.safeParse(receivedData);

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
  if(image === "0"){
     imageUrl = '/com.jpg'
 
}else{
  try {
    imageUrl = await upload(image);
    console.log(imageUrl);
  } catch (error) {
    //  throw new Error("error");
    console.log(error);
    return { errors: "image cannot uploaded" };
  }
}

  const priceValue = formData.get("price") as string;
  const priceV = parseFloat(priceValue.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string
  const priceF = new Number(parseFloat(priceV)).toFixed(2);

  const discountPriceValue = formData.get("discountPrice") as string;
  const discountPriceValueV = parseFloat(discountPriceValue.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string
  const discountPriceValueF = new Number(parseFloat(discountPriceValueV)).toFixed(2);
  //const priceF = parseFloat(priceV);
  // console.log("typeof price-------",priceValue)
 //  console.log("typeof price-------",typeof(priceF),priceF)
  const sortOrderN = parseInt(sortOrder) as number;
  const data = {
    name,
    price: priceF,
    discountPrice:discountPriceValueF,
    flavors: false,
    sortOrder: sortOrderN,
    categoryId,
    productDesc,
    image: imageUrl,
    isFeatured,
  };

  try {
    const docRef = await addDoc(collection(db, "products"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return { message: "Product saved" };
}

export async function deleteProduct(id: string, oldImgageUrl: string) {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
  //return { errors: "Delete not implimented jet" };
  // if (result?.rowCount === 1) {

  const imageUrlArray = oldImgageUrl.split("/");
  console.log(imageUrlArray[imageUrlArray.length - 1]);
  const imageName =
    imageUrlArray[imageUrlArray.length - 2] +
    "/" +
    imageUrlArray[imageUrlArray.length - 1];

  const image_public_id = imageName.split(".")[0];
  console.log(image_public_id);
  try {
    const deleteResult = await deleteImage(image_public_id);
    console.log("image delete data", deleteResult);
  } catch (error) {
    console.log(error);
    return { errors: "Somthing went wrong, can not delete product picture" };
  }

  return {
    message: { sucess: "Deleted product" },
  };
  // }else{
  //   return {errors:"Somthing went wrong, can not delete product"}
  // }
}

export async function editProduct(formData: FormData) {
  const featured_img: boolean = false;
  const id = formData.get("id") as string;
  const name = formData.get("name");
  const price = formData.get("price");
  const status = formData.get("status") || "published"; // default fallback
  const discountPrice = formData.get("discountPrice") as string ;
  const sortOrder = formData.get("sortOrder") as string;
  const categoryId = formData.get("categoryId");
  const productDesc = formData.get("productDesc");
  const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const image = formData.get("image");
  const isFeatured = featured_img;


  const receivedData = {
    name,
    price,
    discountPrice,
    sortOrder,
    categoryId,
    productDesc,
    image,
    isFeatured,
    status,
  };

  const result = editPorductSchema.safeParse(receivedData);
  //console.log("llllllllll",receivedData,result)
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
  if (image === "undefined" || image === null) {
    imageUrl = oldImgageUrl;
    //  console.log("----------------not change image")
  } else {
    //  console.log("---------------- change image")
    try {
      imageUrl = (await upload(image)) as string;
      console.log(imageUrl);
    } catch (error) {
      //  throw new Error("error")
      console.log(error);
      return { errors: "image cannot uploaded" };
    }
    const d = false;
    if (d) {
      const imageUrlArray = oldImgageUrl?.split("/");
      console.log("old image url", imageUrlArray);
      const imageName =
        imageUrlArray[imageUrlArray.length - 2] +
        "/" +
        imageUrlArray[imageUrlArray.length - 1];

      const image_public_id = imageName.split(".")[0];
      // console.log("image_public_id ---", image_public_id);
      try {
        const deleteResult = await deleteImage(image_public_id);
        console.log(deleteResult);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const priceValue = formData.get("price") as string;
  const priceV = parseFloat(priceValue.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string
  const priceF = new Number(parseFloat(priceV)).toFixed(2);
  let discountPriceF = "0";
  
  if(discountPrice === "" || discountPrice === "" || discountPrice === 'NaN'){

  }else{
  const discountPriceV = parseFloat(discountPrice.replace(/,/g, ".")).toFixed(2); // toFixed convert it to string
   discountPriceF = new Number(parseFloat(discountPriceV)).toFixed(2);
  }
//console.log("discountPrice --------", discountPrice, discountPriceF)


  const sortOrderN = parseInt(sortOrder) as number;
  const productUpdtedData = {
    name,
    price: priceF,
    discountPrice:discountPriceF,
    flavors: false,
    sortOrder: sortOrderN,
    categoryId,
    productDesc,
    image: imageUrl,
    isFeatured,
    status,
  };

  
  try {
    const docRef = doc(db, "products", id);
    await setDoc(docRef, productUpdtedData);
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchProductById(id: string): Promise<ProductType> {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //  console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    //  console.log("No such document!");
  }
  const product = { id: docSnap.id, ...docSnap.data() } as ProductType;
  return product;
  // const docRef = doc(db, "products", id);
  // const docSnap = await getDoc(docRef);
  //  return docSnap.data();

  //  let data = [] as ProductType[];
  //   const q = query(collection(db, "products", id));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     data = doc.data() as ProductTypeArr;
  //   });
  //   return data;
}

export async function fetchProducts(): Promise<ProductType[]> {
  const result = await getDocs(collection(db, "products"));
  const data = [] as ProductType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as ProductType;
    data.push(pData);
  });
  return data;
}

export async function fetchProductByCategoryId(
  id: string
): Promise<ProductType[]> {
  // console.log("this is sauce action-------------",id)

  const collectionRef = query(collection(db, "products"), where("categoryId", "==", id));
  const querySnapshot = await getDocs(collectionRef);

  
  const data = [] as ProductType[];
  querySnapshot.forEach((doc) => {
    // const datas = doc.data() as TproductSchema;

    const pData = { id: doc.id, ...doc.data() } as ProductType;
    data.push(pData);
    // data.push(datas);
  });
 // console.log("product by cate id-----------", data);
  return data;
}



export async function fetchAllProducts(): Promise<ProductType[]> {
  const result = await getDocs(collection(db, 'product'))
  const data: ProductType[] = []

  result.forEach((doc) => {
    const product = { id: doc.id, ...doc.data() } as ProductType
    data.push(product)
  })

  return data
}

export async function fetchProductsForExport(): Promise<ProductType[]> {
  const snapshot = await getDocs(collection(db, 'product'));
  const data: ProductType[] = [];

  snapshot.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as ProductType;
    data.push(pData);
  });

  return data;
}



/**
 * Upload a product to Firestore from CSV data
 */
export async function uploadProductFromCSV(data: Partial<ProductType>) {
  if (!data.name || data.price === undefined) {
    throw new Error('Missing required fields: name or price');
  }

  const productData: Omit<ProductType, 'id'> = {
    name: data.name,
    price: Number(data.price),
    discountPrice:
      data.discountPrice !== undefined ? Number(data.discountPrice) : 0,
    categoryId: data.categoryId ?? '',
    productCat: data.productCat ?? '',
    baseProductId: data.baseProductId ?? '',
    productDesc: data.productDesc ?? '',
    sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : 0,
    image: data.image ?? '',
   isFeatured:
  String(data.isFeatured).toLowerCase() === 'true' ? true : false,
    purchaseSession: data.purchaseSession ?? null,
    quantity:
      data.quantity !== undefined && data.quantity !== null
        ? Number(data.quantity)
        : null,
    flavors:
  String(data.flavors).toLowerCase() === 'true' ? true : false,
    status:
      data.status === 'published' ||
      data.status === 'draft' ||
      data.status === 'out_of_stock'
        ? data.status
        : undefined,
  };

  await addDoc(collection(db, 'product'), productData);
}


//console.log("Foorm data ---------",formData.get("oldImgageUrl"));
// console.log(formData.get("price"));
// console.log(formData.get("sortOrder"));
// console.log(formData.get("productDesc"));
// console.log(formData.get("image"));
// console.log("is featured =======",formData.get("isFeatured"));
// featured_img = formData.get("isFeatured");
// if (formData.get("isFeatured").toString() === "true") {
//   featured_img = true;
// }

// console.log(formData.get("name"));
// console.log(formData.get("price"));
// console.log(formData.get("sortOrder"));
// console.log(formData.get("productDesc"));
// console.log(formData.get("image"));
// console.log(formData.get("isFeatured"));
