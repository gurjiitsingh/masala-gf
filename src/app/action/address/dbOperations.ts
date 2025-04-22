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

  console.log("-----", recievedData);

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

type Task = {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  email: string;
  firstName: string;
  lastName: string;
  mobNo: string;
  state: string;
  userId: string;
  zipCode: string;
}[];


export async function searchAddressEmail1(email: string): Promise<addressResType> {

  const result = await getDocs(collection(db, "address"));
  
    const data = {} as addressResType;

    result.forEach((doc) => {
      console.log("find or not--------",doc.data().email)
    //  const pData = { id: doc.id, ...doc.data() } as addressResType;
     // data.push(pData);
     if(doc.data().email===email){
      Object.assign(data, doc.data());
     }
    });

    console.log("llllllll",data)
    return {
      addressLine2: 'Avenue 7',
      email: 'gurjiitsingh4@gmail.com',
      firstName: 'Gim',
      mobNo: '9838883323',
      state: 'undefined',
      addressLine1: '25 Street H No. 1',
      userId: 'gDqlXKIfvis6SgnwaOc7',
      lastName: 'Kari',
      zipCode: '38518',
      city: 'Hostin'
    } as addressResType;

}

export async function searchAddressEmail(email: string): Promise<addressResType> {

  let data = {
    addressLine2: '',
    email: email,
    firstName: '',
    mobNo: '',
    state: '',
    addressLine1: '',
    userId: '',
    lastName: '',
    zipCode: '',
    city: ''
  } as addressResType;

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
    
  querySnapshot.forEach((doc) => {
      data = doc.data() as addressResType;
  });
  
  return data;
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
  //console.log("validation result in addaddressDirect ----", result, recievedData);

  const q = query(collection(db, "address"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let recordId = null;
  querySnapshot.forEach((doc) => {
    recordId = doc.id;
    //console.log("address allredy exist ------", doc.id);
    return recordId;
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.data());
  });

  // if customer address not in address table, add adress of cutomer
  if (result && !recordId) {
    // add address

    const addressData = {
      email,
      firstName,
      lastName,
      userId: userId,
      mobNo,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    };

    try {
      const aadDocRef = await addDoc(collection(db, "address"), addressData);
      console.log("new address added ------", aadDocRef.id);
      recordId = aadDocRef.id;
      return recordId;
      // Clear the form
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return recordId;
}
