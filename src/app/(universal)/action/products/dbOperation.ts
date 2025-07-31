"use server";


import { formatPriceStringToNumber } from "@/utils/formatters";

import { adminDb } from "@/lib/firebaseAdmin";
import {  ProductType } from "@/lib/types/productType";

import { newPorductSchema, editPorductSchema } from "@/lib/types/productType";

//import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";

//import { product } from "@/--------db/schema";
// import { Weight } from "lucide-react";
// import { revalidatePath } from "next/cache";

import {
  addDoc,
  collection,

  getDocs,
 

} from "@firebase/firestore"; //doc, getDoc,



//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';


export async function addNewProduct1(formData: FormData) {
  const featured_img = formData.get("isFeatured") === "true";

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = newPorductSchema.safeParse(receivedData);
  if (!result.success) {
    const zodErrors = Object.fromEntries(result.error.issues.map(issue => [issue.path[0], issue.message]));
    return { errors: zodErrors };
  }

  let imageUrl;
  try {
    imageUrl = await upload(receivedData.image);
  } catch (error) {
    console.error("Image upload failed:", error);
    return { errors: "Image could not be uploaded" };
  }

  const data = {
    ...result.data,
    price: formatPriceStringToNumber(result.data.price),
    image: imageUrl,
  };

  try {
    const docRef = await adminDb.collection("product").add(data);
    console.log("Document written with ID:", docRef.id);
    return { message: "Product saved" };
  } catch (e) {
    console.error("Error adding document:", e);
    return { errors: "Failed to save product" };
  }
}

export async function deleteProduct(id: string, oldImageUrl: string) {
console.log("this---------------",id)
  const docRef = adminDb.collection("products").doc(id);

  try {
    await docRef.delete();
    console.log("Product deleted from Firestore:", id);

    if (oldImageUrl !== "/com.jpg") {
      const imagePublicId = oldImageUrl.split("/").slice(-2).join("/").split(".")[0];
      try {
        await deleteImage(imagePublicId);
        console.log("Image deleted");
      } catch (error) {
        console.error("Error deleting image:", error);
        return { errors: "Product deleted, but failed to delete image." };
      }
    }

    return { message: "Product and image deleted successfully." };
  } catch (error) {
    console.error("Error deleting product from Firestore:", error);
    return { errors: "Failed to delete product." };
  }
}

export async function editProduct1(formData: FormData) {
  const id = formData.get("id") as string;
  const image = formData.get("image");
  const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const featured_img = formData.get("isFeatured") === "true";

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image,
    isFeatured: featured_img,
  };

  const result = editPorductSchema.safeParse(receivedData);
  if (!result.success) {
    const zodErrors = Object.fromEntries(result.error.issues.map(issue => [issue.path[0], issue.message]));
    return { errors: zodErrors };
  }

  let imageUrl: string;
  if (!image || image === "undefined") {
    imageUrl = oldImgageUrl;
  } else {
    try {
      imageUrl = await upload(image);
    } catch (error) {
      console.error("Image upload failed:", error);
      return { errors: "Image could not be uploaded" };
    }
  }

  const updatedData = {
    ...result.data,
    price: formatPriceStringToNumber(result.data.price),
    image: imageUrl,
  };

  try {
    await adminDb.collection("product").doc(id).set(updatedData);
    return { message: "Product updated" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { errors: "Failed to update product." };
  }
}

export async function fetchProductById1(id: string): Promise<ProductType> {
  const docRef = adminDb.collection("product").doc(id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    throw new Error("Product not found");
  }

  return { id: docSnap.id, ...docSnap.data() } as ProductType;
}



//* addition */

export async function fetchAllProducts(): Promise<ProductType[]> {
  const snapshot = await adminDb.collection("products").get();
  const data: ProductType[] = [];

  snapshot.forEach((doc) => {
    const product = { id: doc.id, ...doc.data() } as ProductType;
    data.push(product);
  });

  return data;
}


export async function uploadImage(formData: FormData) {
  console.log("formdata-----", formData);

  let featured_img: boolean = false;
  if (formData.get("isFeatured") === "ture") {
    featured_img = true;
  }

  const name = formData.get("name");
  const price = formData.get("price");
  const discountPrice = formData.get("discountPrice");
  const sortOrder = formData.get("sortOrder") as string;
  const categoryId = formData.get("categoryId");
  const productDesc = formData.get("productDesc");
  const image = formData.get("image"); // type: File or string
  const isFeatured = featured_img;

  let imageUrl: string | null = null;

  if (image && typeof image !== 'string') {
    const file = image as File;

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.jpg';
      const fileName = `${Date.now()}-${randomUUID()}${ext}`;
      const tempDir = path.join(process.cwd(), 'public', 'temp');
      const savePath = path.join(tempDir, fileName);

      // Ensure /public/temp exists
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      fs.writeFileSync(savePath, buffer);
      imageUrl = `/temp/${fileName}`;
      console.log('Image saved to:', imageUrl);
    } catch (err) {
      console.error('Failed to save image:', err);
      return { error: 'Image upload failed' };
    }
  } else if (image === '0') {
    imageUrl = '/com.jpg'; // default fallback
  }

  // You can now use `imageUrl` to save in Firestore or return it
  return {
    message: 'Image processed successfully',
    imageUrl,
    name,
    price,
    discountPrice,
    sortOrder,
    categoryId,
    productDesc,
    isFeatured,
  };
}


export async function addNewProduct(formData: FormData) {
  console.log("formdata-----", formData);

  const featured_img = formData.get("isFeatured") === "ture";
  const name = formData.get("name");
  const price = formData.get("price");
  const discountPrice = formData.get("discountPrice");
  const sortOrder = formData.get("sortOrder") as string;
  const categoryId = formData.get("categoryId");
  const productDesc = formData.get("productDesc");
  const image = formData.get("image");
  const isFeatured = featured_img;
  const status = formData.get("status");

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
  if (image === "0") {
    imageUrl = "/com.jpg";
  } else {
    try {
      imageUrl = await upload(image);
      console.log(imageUrl);
    } catch (error) {
      console.log(error);
      return { errors: "image cannot uploaded" };
    }
  }

  const priceValue = formData.get("price") as string;
  const priceV = parseFloat(priceValue.replace(/,/g, ".")).toFixed(2);
  const priceF = new Number(parseFloat(priceV)).toFixed(2);

  const discountPriceValue = formData.get("discountPrice") as string;
  const discountPriceValueV = parseFloat(discountPriceValue.replace(/,/g, ".")).toFixed(2);
  const discountPriceValueF = new Number(parseFloat(discountPriceValueV)).toFixed(2);

  const sortOrderN = parseInt(sortOrder) as number;

  const data = {
    name,
    price: priceF,
    discountPrice: discountPriceValueF,
    flavors: false,
    sortOrder: sortOrderN,
    categoryId,
    productDesc,
    image: imageUrl,
    isFeatured,
    status
  };

  try {
    const docRef = await adminDb.collection("products").add(data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    return { errors: "Could not save product" };
  }

  return { message: "Product saved" };
}



export async function deleteProduct1(id: string, oldImgageUrl: string) {
  // Use Firestore Admin SDK to delete the document
  await adminDb.collection("products").doc(id).delete();

  // Parse the public image ID from the URL
  const imageUrlArray = oldImgageUrl.split("/");
  const imageName =
    imageUrlArray[imageUrlArray.length - 2] +
    "/" +
    imageUrlArray[imageUrlArray.length - 1];
  const image_public_id = imageName.split(".")[0];

  console.log("Deleting image:", image_public_id);

  // Attempt to delete the image from storage (e.g. Cloudinary or other service)
  try {
    const deleteResult = await deleteImage(image_public_id);
    console.log("image delete data", deleteResult);
  } catch (error) {
    console.log(error);
    return {
      errors: "Something went wrong, cannot delete product picture",
    };
  }

  return {
    message: { success: "Deleted product" },
  };
}

export async function editProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name");
  const priceRaw = formData.get("price") as string;
  const discountPriceRaw = formData.get("discountPrice") as string;
  const sortOrderRaw = formData.get("sortOrder") as string;
  const categoryId = formData.get("categoryId");
  const productDesc = formData.get("productDesc");
  const oldImageUrl = formData.get("oldImgageUrl") as string;
  const image = formData.get("image");
  const status = formData.get("status") || "published";

  const isFeatured = false; // static as in original code

  const receivedData = {
    name,
    price: priceRaw,
    discountPrice: discountPriceRaw,
    sortOrder: sortOrderRaw,
    categoryId,
    productDesc,
    image,
    isFeatured,
    status,
  };

  const result = editPorductSchema.safeParse(receivedData);

  if (!result.success) {
    const zodErrors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      zodErrors[issue.path[0]] = issue.message;
    });
    return { errors: zodErrors };
  }

  // Handle image update
  let imageUrl = oldImageUrl;

  if (image && image !== "undefined") {
    try {
      imageUrl = await upload(image);
      console.log("Uploaded new image URL:", imageUrl);

      // Optionally delete old image (set `true` to enable)
      const DELETE_OLD_IMAGE = false;
      if (DELETE_OLD_IMAGE && oldImageUrl) {
        const parts = oldImageUrl.split("/");
        const imageName =
          parts[parts.length - 2] + "/" + parts[parts.length - 1];
        const imagePublicId = imageName.split(".")[0];
        try {
          const deleteResult = await deleteImage(imagePublicId);
          console.log("Old image deleted:", deleteResult);
        } catch (error) {
          console.warn("Failed to delete old image:", error);
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      return { errors: "Image could not be uploaded" };
    }
  }

  // Handle price parsing
  const formatPrice = (val: string): string =>
    new Number(parseFloat(val.replace(/,/g, ".")).toFixed(2)).toFixed(2);

  const price = formatPrice(priceRaw);
  let discountPrice = "0.00";
  if (discountPriceRaw && discountPriceRaw !== "NaN") {
    discountPrice = formatPrice(discountPriceRaw);
  }

  const sortOrder = parseInt(sortOrderRaw);

  const productData = {
    name,
    price,
    discountPrice,
    flavors: false,
    sortOrder,
    categoryId,
    productDesc,
    image: imageUrl,
    isFeatured,
    status,
  };

  try {
    await adminDb.collection("products").doc(id).set(productData);
    return { message: "Product updated successfully" };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { errors: "Failed to update product" };
  }
}


export async function fetchProductById(id: string): Promise<ProductType | null> {
  try {
    const docSnap = await adminDb.collection("products").doc(id).get();

    if (!docSnap.exists) {
      console.warn(`No product found with ID: ${id}`);
      return null;
    }

    const product = { id: docSnap.id, ...docSnap.data() } as ProductType;
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Error fetching product");
  }
}


export async function fetchProducts(): Promise<ProductType[]> {
  
  try {
    const snapshot = await adminDb.collection("products").get();

    if (snapshot.empty) {
      console.warn("No products found in the database.");
      return [];
    }

    const products: ProductType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductType[];

   
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Error retrieving product list");
  }
}

export async function fetchProductByCategoryId(id: string): Promise<ProductType[]> {
 
 console.log("by id ---------------")
  try {
    const querySnapshot = await adminDb
      .collection("products")
      .where("categoryId", "==", id)
      .get();

    if (querySnapshot.empty) {
      console.warn(`No products found for categoryId: ${id}`);
      return [];
    }

    const products: ProductType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductType[];

    return products;
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    throw new Error("Failed to retrieve products for this category");
  }
}


export async function fetchProductsForExport(): Promise<ProductType[]> {
  const snapshot = await adminDb.collection("product").get();

  const data: ProductType[] = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as ProductType;
  });

  return data;
}

/**
 * Upload a product to Firestore from CSV data
 */
export async function uploadProductFromCSV(data: Partial<ProductType>) {
  if (!data.name || data.price === undefined) {
    throw new Error("Missing required fields: name or price");
  }

  console.log("data------",data)

  const productData: Omit<ProductType, "id"> = {
    name: data.name,
    price: Number(data.price),
    discountPrice:
      data.discountPrice !== undefined ? Number(data.discountPrice) : 0,
    categoryId: data.categoryId ?? "",
    productCat: data.productCat ?? "",
    baseProductId: data.baseProductId ?? "",
    productDesc: data.productDesc ?? "",
    sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : 0,
    image: data.image ?? "",
    isFeatured:
      String(data.isFeatured).toLowerCase() === "true" ? true : false,
    purchaseSession: data.purchaseSession ?? null,
    quantity:
      data.quantity !== undefined && data.quantity !== null
        ? Number(data.quantity)
        : null,
    flavors:
      String(data.flavors).toLowerCase() === "true" ? true : false,
    status:
      data.status === "published" ||
      data.status === "draft" ||
      data.status === "out_of_stock"
        ? data.status
        : undefined,
  };

  await adminDb.collection("products").add(productData);
}
