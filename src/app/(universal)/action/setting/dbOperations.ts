"use server";

import { db } from "@/lib/firebaseConfig";
import { deleteImage, upload } from "@/lib/cloudinary";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "@firebase/firestore";
import { editSettingSchema, settingSchema, settingSchemaType } from "@/lib/types/settingType";
import { SettingsDataType, SettingValue } from "@/lib/types/settings";


//type TsettingSchemaArray = TsettingSchema[]

export const fetchSettings = async (): Promise<settingSchemaType[]> => {
  //const userQuery = await db.users.get()
  // const result = await getDocs(collection(db, "setting"))
  // const docdata = result.docs.map(x => x.data() as settingSchemaType)
  // return docdata;

  const result = await getDocs(collection(db, "settings"));
  const data = [] as settingSchemaType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as settingSchemaType;
    data.push(pData);
  });
  return data;
};

export async function deletesetting(id: string, oldImgageUrl: string) {
  const docRef = doc(db, "settings", id);
  await deleteDoc(docRef);
  //return { errors: "Delete not implimented jet" };
  // if (result?.rowCount === 1) {

  const imageUrlArray = oldImgageUrl.split("/");
  console.log(imageUrlArray[imageUrlArray.length - 1]);
  const imagesettingName =
    imageUrlArray[imageUrlArray.length - 2] +
    "/" +
    imageUrlArray[imageUrlArray.length - 1];

  const image_public_id = imagesettingName.split(".")[0];
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

export async function addNewsetting(formData: FormData) {
  const settingName = formData.get("settingName");
  const settingValue = formData.get("settingValue");
 
  const recievedData = {
    settingName,
    settingValue,
   
  };
  
  console.log("recievedData--------", recievedData)

  const result = settingSchema.safeParse(recievedData);
  console.log(result);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }



  const data = {
    settingName,
    settingValue,
   };

  try {
    const docRef = await addDoc(collection(db, "settings"), data);
    console.log("Document written with ID: ", docRef.id);
    return {
      message: { sucess: "setting Created" },
    };
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }






}

export async function editsetting(formData: FormData) {
  const id = formData.get("id") as string;
  const settingValue = formData.get("settingValue") as string;

  


  const receivedData = {
    id,
    settingValue,
  };

  const result = editSettingSchema.safeParse(receivedData);

 
 
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }



  const settingUpdateData = {
    id,
    settingValue,
   
  };
  
  // update database
  try {
    const docRef = doc(db,"settings", id);
   await setDoc(docRef, settingUpdateData);

  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchsettingById(id: string): Promise<settingSchemaType> {
  const docRef = doc(db, "settings", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //  console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    //  console.log("No such document!");
  }
  const setting = { id: docSnap.id, ...docSnap.data() } as settingSchemaType;

  return setting;
  // const docRef = doc(db, "product", id);
  // const docSnap = await getDoc(docRef);
  //  return docSnap.data();

  //  let data = [] as ProductType[];
  //   const q = query(collection(db, "product", id));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     data = doc.data() as ProductTypeArr;
  //   });
  //   return data;
}



/**
 * Adds or updates the pickup discount in Firestore
 * @param value - Discount percentage (1 to 30)
 */

export const setPickupDiscount = async (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Invalid discount value");
  }

  try {
    const ref = doc(db, "settings", "pickup_discount");
    await setDoc(ref, { value }); // Ensure you're sending { value: number }
    console.log("Pickup discount updated:", value);
  } catch (error) {
    console.error("Error updating pickup discount:", error);
    throw error;
  }
};

export const setDisplayCategory = async ( value: string) => {

   if (typeof value !== "string") {
    throw new Error("Invalid  value");
  }

  try {
    const ref = doc(db, "settings", "display_category");
    await setDoc(ref, { value }); // Ensure you're sending { value: number }
    console.log("display category updated:", value);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
  // if (!id || !name) {
  //   throw new Error("Both category id and name are required");
  // }
  // try {
  //   const ref = doc(db, "settings", "display_category");
  //   await setDoc(ref, { id, name }); // Save both id and name
  //   console.log("Display category updated:", { id, name });
  // } catch (error) {
  //   console.error("Error updating display category:", error);
  //   throw error;
  // }
};



export async function getAllSettings(): Promise<SettingsDataType> {
  const snapshot = await getDocs(collection(db, "settings"));
  const allSettings: SettingsDataType = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data?.value !== undefined) {
      allSettings[doc.id] = data.value as SettingValue;
    }
  });

  return allSettings;
}