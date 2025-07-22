"use server";
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

import { ProductType } from "@/lib/types/productType";

//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';


import { adminDb } from "@/lib/firebaseAdmin"; 




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
