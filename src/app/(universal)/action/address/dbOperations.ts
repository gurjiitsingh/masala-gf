"use server";

import { db } from "@/lib/firebaseConfig";
import { addressResT, addressResType, addressSchima, addressSchimaCheckout } from "@/lib/types/addressType"; //, TaddressSchema
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "@firebase/firestore";

export async function addNewAddress(formData: FormData) {
  const name = formData.get("name");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const addressLine1 = formData.get("addressLine1");
  const addressLine2 = formData.get("addressLine2");
  const city = formData.get("city");
  const state = formData.get("state");
  const zipCode = formData.get("zipCode");

  const recievedData = {
    name,
    userId,
    mobNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

 

  const result = addressSchima.safeParse(recievedData);
  console.log(result);
  if (result) {
    //  const row = await db.insert(address).values(recievedData);
  }
}

export async function editCustomerAddress(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const password = formData.get("password");
  const addressLine1 = formData.get("addressLine1");
  const addressLine2 = formData.get("addressLine2");
  const city = formData.get("city");
  const state = formData.get("state");
  const zipCode = formData.get("zipCode");

  const recievedData = {
    email,
    firstName,
    lastName,
    userId,
    mobNo,
    password,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  const result = addressSchimaCheckout.safeParse(recievedData);

  if (result) {
    const addressData = {
      // email,
      firstName,
      lastName,
      // userId,
      mobNo,
      password,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };
    // find address id from userId/email
    // const q = query(collection(db, "address"), where("userId", "==", id));
    const q = query(collection(db, "address"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let data = null;
    let docId = "";
    //let i = 0;
    querySnapshot.forEach((doc) => {
      docId = doc.id;
      // doc.data() is never undefined for query doc snapshots
      data = doc.data();
    });

    try {
      const editDocRef = doc(db, "address", docId);
      updateDoc(editDocRef, addressData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}



export async function searchAddressEmail(email: string): Promise<addressResType | null> {
  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const doc = querySnapshot.docs[0];
  const docData = doc.data();

  const result: addressResType = {
    id: doc.id,
    addressLine1: docData.addressLine1 || '',
    addressLine2: docData.addressLine2 || '',
    city: docData.city || '',
    state: docData.state || '',
    zipCode: docData.zipCode || '',
    email: docData.email || '',
    firstName: docData.firstName || '',
    lastName: docData.lastName || '',
    mobNo: docData.mobNo || '',
    userId: docData.userId || '',
    // ✅ Convert Firestore Timestamp to ISO string
    createdAt: docData.createdAt?.toDate().toISOString() || '',
  };

  return result;
}


export async function searchAddressByAddressId(
  id: string
): Promise<addressResT> {
 // console.log("---- search address by addressid ---", id);
  const docRef = doc(db, "address", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
 //   console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return docSnap.data() as addressResT;
}




export const searchAddressByUserId = async (
  id: string | undefined
): Promise<addressResT> => {
  
  let data = {} as addressResT;
  if (id !== undefined) {
    const q = query(collection(db, "address"), where("userId", "==", id));
    const querySnapshot = await getDocs(q);

   
    querySnapshot.forEach((doc) => {
      data = doc.data() as addressResT;
    });
    return data;
  }else{
    return data;
  }
};


export async function addCustomerAddressDirect(formData: FormData) {
  const email = formData.get("email");
  const lastName = formData.get("lastName");
  const firstName = formData.get("firstName");
  const userId = formData.get("userId");
  const mobNo = formData.get("mobNo");
  const password = formData.get("password");
  const addressLine1 = formData.get("addressLine1");
  const addressLine2 = formData.get("addressLine2");
  const city = formData.get("city");
  const state = formData.get("state");
  const zipCode = formData.get("zipCode");

  const receivedData = {
    email,
    firstName,
    lastName,
    userId,
    mobNo,
    password,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
  };

  const result = addressSchimaCheckout.safeParse(receivedData);

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = null;

  querySnapshot.forEach((doc) => {
    recordId = doc.id;
  });

  if (result.success && !recordId) {
    const addressData = {
      ...receivedData,
      createdAt: serverTimestamp(), // 🔥 Recommended
    };

    try {
      const addDocRef = await addDoc(collection(db, "address"), addressData);
      console.log("New address added ------", addDocRef.id);
      return addDocRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return recordId;
}

