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
  updateDoc,
} from "@firebase/firestore";
import { editSettingSchema, settingSchema, settingSchemaType } from "@/lib/types/settingType";
import { SettingsDataType, value } from "@/lib/types/settings";


//type TsettingSchemaArray = TsettingSchema[]



function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_") // spaces to underscores
    .replace(/[^\w_]+/g, ""); // remove non-word characters
}

export async function addNewsetting(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const value = formData.get("value")?.toString().trim();

  if (!name) {
    return { errors: { value: "Value is required" } };
  }

  const validated = settingSchema.safeParse({
    name,
    value,
  });

  if (!validated.success) {
    const zodErrors = validated.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {} as Record<string, string>);
    return { errors: zodErrors };
  }

  const docId = slugify(name);
  const docRef = doc(db, "settings", docId);
  const existingDoc = await getDoc(docRef);

  if (existingDoc.exists()) {
    return {
      errors: {
        name: "A setting with this name already exists.",
      },
    };
  }

  try {
    await setDoc(docRef, {
      name: name,    // Human readable
      value: value,  // Actual value
      type: "settings",
    });

    return {
      message: {
        success: "Setting created successfully",
      },
    };
  } catch (error) {
    console.error("Firestore error:", error);
    return {
      errors: { firebase: "Failed to write setting." },
    };
  }
}



export async function fetchSettings(): Promise<settingSchemaType[]> {
  const settingsSnapshot = await getDocs(collection(db, "settings"));

  const settings: settingSchemaType[] = [];

  settingsSnapshot.forEach((doc) => {
    const data = doc.data();

    settings.push({
      name: data.name,
      value: data.value,
      key: doc.id, // ✅ this is the actual Firestore doc ID
      type: data.type
    });
  });

  return settings;
}


/**
 * Fetch a single setting document by ID (docId)
 */
export async function fetchSettingById(docId: string): Promise<settingSchemaType | null> {
  try {
    const docRef = doc(db, "settings", docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();

    return {
      name: data.name || docId, // fallback
      value: data.value || "",
      key: docId,
    };
  } catch (error) {
    console.error("Error fetching setting:", error);
    return null;
  }
}



/**
 * Update a setting by ID
 */
export async function updateSettingById(docId: string, data: settingSchemaType) {
  try {
    const docRef = doc(db, "settings", docId);
    await updateDoc(docRef, {
      name: data.name,
      value: data.value,
      type:"settings"
      
    });
  } catch (error) {
    console.error("Error updating setting:", error);
    throw error;
  }
}

/**
 * Deletes a setting document from Firestore by its document ID.
 * @param docId - The document ID (same as the setting key).
 */
export async function deleteSettingById(docId: string): Promise<void> {
  try {
    const docRef = doc(db, "settings", docId);
    await deleteDoc(docRef);
    console.log(`Setting "${docId}" deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete setting:", error);
    throw error;
  }
}






export async function deletesetting(id: string, oldImgageUrl: string) {
  const docRef = doc(db, "settings", id);
  await deleteDoc(docRef);
  //return { errors: "Delete not implimented jet" };
  // if (result?.rowCount === 1) {

  const imageUrlArray = oldImgageUrl.split("/");
  console.log(imageUrlArray[imageUrlArray.length - 1]);
  const imagename =
    imageUrlArray[imageUrlArray.length - 2] +
    "/" +
    imageUrlArray[imageUrlArray.length - 1];

  const image_public_id = imagename.split(".")[0];
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

export async function addNewsetting1(formData: FormData) {
  const name = formData.get("name");
  const value = formData.get("value");
 
  const recievedData = {
    name,
    value,
   
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
    name,
    value,
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
  const value = formData.get("value") as string;

  


  const receivedData = {
    id,
    value,
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
    value,
   
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
    await setDoc(ref, { value:value }); // Ensure you're sending { value: number }
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




export async function fetchsettingById(id: string): Promise<settingSchemaType> {
  const docRef = doc(db, "settings", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //  console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    //  console.log("No such document!");
  }
  const setting = { key: docSnap.id, ...docSnap.data() } as settingSchemaType;

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



export async function getAllSettings(): Promise<SettingsDataType> {
  const snapshot = await getDocs(collection(db, "settings"));
  const allSettings: SettingsDataType = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
  //  if (data?.value !== undefined) {
 // console.log("data.value------------",doc.id, data.value)
      allSettings[doc.id] = data.value as value;
   // }
  });

  return allSettings;
}






// export async function addNewsetting2(formData: FormData) {
//   const name = formData.get("name")?.toString().trim();
//   const value = formData.get("value")?.toString().trim();

//   if (!name || !value) {
//     return { errors: { value: "Value is required" } };
//   }

//   const validated = settingSchema.safeParse({
//     name,
//     value,
//   });

//   if (!validated.success) {
//     const zodErrors = validated.error.issues.reduce((acc, issue) => {
//       acc[issue.path[0]] = issue.message;
//       return acc;
//     }, {} as Record<string, string>);

//     return { errors: zodErrors };
//   }

//   const docRef = doc(db, "settings", name); // use name as docId
//   const existingDoc = await getDoc(docRef);

//   try {
//     await setDoc(docRef, {
//       value,
//     });

//     return {
//       message: {
//         success: existingDoc.exists()
//           ? "Setting updated successfully"
//           : "Setting created successfully",
//       },
//     };
//   } catch (error) {
//     console.error("Firestore error:", error);
//     return {
//       errors: { firebase: "Failed to write setting." },
//     };
//   }
// }



// export async function fetchSettings2(): Promise<settingSchemaType[]> {
//   const settingsSnapshot = await getDocs(collection(db, "settings"));

//   const settings: settingSchemaType[] = [];

//   settingsSnapshot.forEach((doc) => {
//     settings.push({
//       name: doc.id,
//       value: doc.data().value,
//     });
//   });

//   return settings;
// }

// export const fetchSettings1 = async (): Promise<settingSchemaType[]> => {
//   //const userQuery = await db.users.get()
//   // const result = await getDocs(collection(db, "setting"))
//   // const docdata = result.docs.map(x => x.data() as settingSchemaType)
//   // return docdata;

//   const result = await getDocs(collection(db, "settings"));
//   const data = [] as settingSchemaType[];
//   result.forEach((doc) => {
//     const pData = { id: doc.id, ...doc.data() } as settingSchemaType;
//     data.push(pData);
//   });
//   return data;
// };