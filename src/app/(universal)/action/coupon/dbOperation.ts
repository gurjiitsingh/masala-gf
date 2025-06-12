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
  updateDoc,
  where,
} from "@firebase/firestore"; //doc, getDoc,
import { couponType, couponSchema } from "@/lib/types/couponType";

export async function addNewcoupon(formData: FormData) {
  const code = formData.get("code");
  const discount = formData.get("discount") as string;
  const minSpend = formData.get("minSpend") as string;
  const productCat = formData.get("productCat");
  const couponDesc = formData.get("couponDesc");
  const offerType = formData.get("offerType");
  const expiry = formData.get("expiry");
  const discountType = formData.get("discountType");
  const isFeatured = false;
  const isActivated = true;
  // formData.append("isFeatured", data.isFeatured);

  //image = formData.get("image"),

  //console.log("isFeatured ", typeof formData.get("isFeatured"));

  const receivedData = {
    code,
    discount,
    minSpend,
    productCat,
    couponDesc,
    offerType,
    expiry,
    discountType,
    isFeatured,
    //image: formData.get("image"),
  };

  const result = couponSchema.safeParse(receivedData);
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

  const now_german = new Date().toLocaleString("en-DE", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Europe/Berlin",
  });

  const discountF = parseFloat(discount) as number;
  const minSpendF = parseFloat(minSpend) as number;
  const data = {
    code,
    discount: discountF,
    minSpend: minSpendF,
    productCat,
    couponDesc,
    offerType,
    expiry,
    discountType,
    isFeatured,
    isActivated,
    startDate: now_german,
    date: now_german,
  };
  console.log("data to be saved ---", data);

  try {
    const docRef = await addDoc(collection(db, "coupon"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return { message: "coupon saved" };
} //end of add new coupon

type rt = {
  success: string;
};

export async function deletecoupon(id: string): Promise<rt> {
  const docRef = doc(db, "coupon", id);
  await deleteDoc(docRef);
  return { success: "Delete implimented" };
}

export async function editcoupon(id: string, formData: FormData) {
  try {
    const updatedData: any = {
      code: formData.get("code"),
      discount: formData.get("discount"),
      offerType: formData.get("offerType"),
      expiry: formData.get("expiry"),
      discountType: formData.get("discountType"),
      productCat: formData.get("productCat"),
      couponDesc: formData.get("couponDesc"),
      message: formData.get("message"),
      minSpend: formData.get("minSpend"),
      isFeatured: formData.get("isFeatured") === "true",
    };

    const couponRef = doc(db, "coupon", id);
    await updateDoc(couponRef, updatedData);

    return { success: true };
  } catch (error) {
    console.error("Failed to update coupon:", error);
    return { success: false, error: "Failed to update coupon." };
  }
}

export async function editcoupon1(formData: FormData) {
  const id = formData.get("id") as string;
  const image = formData.get("image");
  // const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const featured_img: boolean = false;
  // featured_img = formData.get("oldImgageUrl");

  const receivedData = {
    code: formData.get("code"),
    discount: formData.get("discount"),
    productCat: formData.get("productCat"),
    couponDesc: formData.get("couponDesc"),
    minSpend: formData.get("minSpend"),
    // image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = couponSchema.safeParse(receivedData);

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

  const couponUpdtedData = {
    code: formData.get("code"),
    discount: formData.get("discount"),
    productCat: formData.get("productCat"),
    couponDesc: formData.get("couponDesc"),
    minSpend: formData.get("minSpend"),
    //image: imageUrl,
    isFeatured: featured_img,
  };
  //console.log("update data ------------", couponUpdtedData)
  // update database
  try {
    const docRef = doc(db, "coupon", id);
    await setDoc(docRef, couponUpdtedData);
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

// export async function fetchcoupon(): Promise<couponType[]> {
//   const result = await getDocs(collection(db, "coupon"));

//   const data = [] as couponType[];
//   result.forEach((doc) => {
//     const pData = { id: doc.id, ...doc.data() } as couponType;
//     data.push(pData);
//   });
//   return data;
// }

export async function fetchcoupon(): Promise<couponType[]> {
  const result = await getDocs(collection(db, "coupon"));

  const data: couponType[] = [];

  result.forEach((doc) => {
    const raw = doc.data();

    const converted: couponType = {
      id: doc.id,
      code: raw.code,
      discount: raw.discount,
      discountType: raw.discountType,
      message: raw.message,
      minSpend: raw.minSpend,
      expiry: raw.expiry,
      startDate: raw.startDate,
      offerType: raw.offerType,
      isActivated: raw.isActivated,
      isFeatured: raw.isFeatured,
      productCat: raw.productCat,
      couponDesc: raw.couponDesc,
      excludedCategoryIds: raw.excludedCategoryIds,
      createdAt: raw.createdAt?.toDate?.() ?? undefined,
      date: raw.date?.toDate?.() ?? new Date(),
      image: raw.image,
    };

    data.push(converted);
  });

  return data;
}

export async function fetchcouponById(id: string): Promise<couponType> {
  const docRef = doc(db, "coupon", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.warn("No such document!");
    throw new Error("Coupon not found");
  }

  const raw = docSnap.data();

  const couponData: couponType = {
    id: docSnap.id,
    code: raw.code,
    discount: raw.discount,
    discountType: raw.discountType,
    message: raw.message,
    minSpend: raw.minSpend,
    expiry: raw.expiry,
    startDate: raw.startDate,
    offerType: raw.offerType,
    isActivated: raw.isActivated,
    isFeatured: raw.isFeatured,
    applyPickup: raw.applyPickup ?? true, // fallback to true if undefined
    applyDelivery: raw.applyDelivery ?? true,
    productCat: raw.productCat,
    couponDesc: raw.couponDesc,
    excludedCategoryIds: raw.excludedCategoryIds,
    createdAt: raw.createdAt?.toDate?.() ?? undefined,
    date: raw.date?.toDate?.() ?? undefined,
    image: raw.image,
  };

  return couponData;
}

// export async function fetchcouponByCode(
//   condname: string
// ): Promise<couponType[]> {

//   const data = [] as couponType[];
//   const q = query(collection(db, "coupon"), where("code", "==", condname));
//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     const datas = doc.data() as couponType;
//     data.push(datas);
//   });
//   console.log("data-----------------",data)

//   return data;
// }

export async function fetchcouponByCode(
  condname: string
): Promise<couponType[]> {
  const data: couponType[] = [];

  const q = query(collection(db, "coupon"), where("code", "==", condname));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const raw = doc.data();

    const converted: couponType = {
      code: raw.code,
      discount: raw.discount,
      discountType: raw.discountType,
      message: raw.message,
      minSpend: raw.minSpend,
      expiry: raw.expiry,
      startDate: raw.startDate,
      offerType: raw.offerType,
      isActivated: raw.isActivated,
      isFeatured: raw.isFeatured,
      applyPickup: raw.applyPickup ?? true, // fallback to true if undefined
    applyDelivery: raw.applyDelivery ?? true,
      productCat: raw.productCat,
      couponDesc: raw.couponDesc,
      excludedCategoryIds: raw.excludedCategoryIds,
      createdAt: raw.createdAt?.toDate?.() ?? undefined,
      date: raw.date?.toDate?.() ?? new Date(), // <--- FIX HERE
    };

    data.push(converted);
  });

  return data;
}

// export async function fetchCouponByCode(condname: string): Promise<couponType | null> {
//   const q = query(collection(db, "coupon"), where("code", "==", condname));
//   const querySnapshot = await getDocs(q);

//   if (querySnapshot.empty) {
//     return null; // No coupon found
//   }

//   const raw = querySnapshot.docs[0].data();

//   const converted: couponType = {
//     code: raw.code,
//     discount: raw.discount,
//     discountType: raw.discountType,
//     message: raw.message,
//     minSpend: raw.minSpend,
//     expiry: raw.expiry,
//     startDate: raw.startDate,
//     offerType: raw.offerType,
//     isActivated: raw.isActivated,
//     isFeatured: raw.isFeatured,
//     productCat: raw.productCat,
//     couponDesc: raw.couponDesc,
//     excludedCategoryIds: raw.excludedCategoryIds,
//     createdAt: raw.createdAt?.toDate?.() ?? undefined,
//     date: raw.date?.toDate?.() ?? new Date(),
//   };

//   return converted;
// }

export async function updateCouponExcludedCategories(
  couponId: string,
  categoryIds: string[]
) {
  console.log("categoryIds-------------", categoryIds);
  const couponRef = doc(db, "coupon", couponId);
  await updateDoc(couponRef, {
    excludedCategoryIds: categoryIds,
  });
}

export async function fetchSingleCoupon(id: string) {
  const docRef = doc(db, "coupon", id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}
