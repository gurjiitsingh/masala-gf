"use server";

import { db } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { setDoc, serverTimestamp } from "firebase/firestore";

import { Timestamp } from "firebase/firestore";
import { addUserDirect } from "../user/dbOperation";
import { addCustomerAddressDirect } from "../address/dbOperations";
import { TOrderMaster, orderMasterDataT } from "@/lib/types/orderMasterType";
import { orderProductsT } from "@/lib/types/orderType";
import { orderDataType, purchaseDataT } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";

export async function createNewOrderCustomerAddress(
  purchaseData: purchaseDataT
) {
  //  console.log("--------------------- cart data in cart save draft  ",purchaseData)
  //1. user id
  //2. user address
  //3. cart data

  const email = purchaseData.address.email;
  const lastName = purchaseData.address.lastName;
  const firstName = purchaseData.address.firstName;
  // const total = purchaseData.total;
  // const totalDiscountG = purchaseData.totalDiscountG;
  //const userId = purchaseData.address.userId;
  // const password = purchaseData.address.password;
  const password = "123456";
  const username = firstName + "" + lastName;
  //if(purchaseData.userId === undefined){
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("confirmPassword", password);
  // const result = await addUser(formData);
  const UserAddedId = (await addUserDirect(formData)) as string;
  

  // Now check address or add new address
  const formDataAdd = new FormData();
  formDataAdd.append("firstName", purchaseData.address.firstName);
  formDataAdd.append("lastName", purchaseData.address.lastName);
  formDataAdd.append("userId", UserAddedId);
  formDataAdd.append("email", purchaseData.address.email);
  formDataAdd.append("mobNo", purchaseData.address.mobNo);
  formDataAdd.append("password", "123456");
  formDataAdd.append("addressLine1", purchaseData.address.addressLine1!);
  formDataAdd.append("addressLine2", purchaseData.address.addressLine2!);
  formDataAdd.append("city", purchaseData.address.city);
  formDataAdd.append("state", purchaseData.address.state);
  formDataAdd.append("zipCode", purchaseData.address.zipCode);

  const addressAddedId = await addCustomerAddressDirect(formDataAdd);
  // enter data in order master

  const customerName = firstName + " " + lastName;

  return { addressAddedId, UserAddedId, customerName };
}

export async function createNewOrder(purchaseData: orderDataType) {
  //  console.log("--------------------- cart data in cart save draft  ",purchaseData)
  //1. user id
  //2. user address
  //3. cart data

  //const now = new Date();
  // const now_india = now.toLocaleString("en-IN", {
  //   dateStyle: "medium",
  //   timeStyle: "medium",
  //   timeZone: "Asia/Kolkata",
  // });

  //"de-DE"
  const now_german = new Date().toLocaleString("en-DE", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Europe/Berlin",
  });
  // const order = await fetchOrdersMaster()
  const collectionRef = collection(db, "orderMaster");
  const targetQuery = query(collectionRef, orderBy("srno", "desc"), limit(1));
  const querySnapshot = await getDocs(targetQuery);
  //  const q = query(collectionRef);
  //  const querySnapshot = await getDocs(q);
  let new_srno = 1;
  const orderData = [] as orderMasterDataT[];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as orderMasterDataT;
    //   console.log("last order ----------", data)
    orderData.push(data);
  });
  if (orderData[0]?.srno !== undefined) {
    new_srno = orderData[0].srno + 1;
  }
  //  console.log("sr No ----------", new_srno)
  // const timeId = new Date().toISOString();
  const total = purchaseData.endTotalG;
  const totalDiscountG = purchaseData.totalDiscountG;
  const addressId = purchaseData.addressId;
  const userAddedId = purchaseData.userId as string;
  const customerName = purchaseData.customerName;
  const email = purchaseData.email;
  const paymentType = purchaseData.paymentType;

  const itemTotal = purchaseData.itemTotal;

  const deliveryCost = purchaseData.deliveryCost;
  const calculatedPickUpDiscountL = purchaseData.calculatedPickUpDiscountL;

  const flatDiscount = purchaseData.flatDiscount;
  const calCouponDiscount = purchaseData.calCouponDiscount;
  const couponCode = purchaseData.couponCode;
  const couponDiscountPercentL = purchaseData.couponDiscountPercentL;
  const pickUpDiscountPercentL = purchaseData.pickUpDiscountPercentL;
  const noOffers = purchaseData.noOffers;

  let status = "Payment Pending";
  if (paymentType === "cod") {
    status = "Completed";
  }

  const orderMasterData = {
    // also add auto increment to order,
    customerName: customerName,
    email,
    userId: userAddedId,
    addressId: addressId,
    itemTotal,
    endTotalG: total,

    deliveryCost,
    calculatedPickUpDiscountL,
    flatDiscount,
    calCouponDiscount,
    couponCode,
    couponDiscountPercentL,
    pickUpDiscountPercentL,

    paymentType,
    status,
    totalDiscountG,
    createdAt: serverTimestamp(),
    time: now_german,
    srno: new_srno,
  } as orderMasterDataT;
  //console.log("order master---------", orderMasterData);

  const orderMasterId = (await addOrderToMaster(orderMasterData)) as string;

  // add product to productOrder

  // unique id ->   purchaseSession: '1737704030168',
  const purchaseProducts = purchaseData.cartData as ProductType[];

  purchaseProducts.forEach((element) => {
    //  console.log("order item---------", element,userAddedId, orderMasterId)
    addProductDraft(element, userAddedId, orderMasterId);
  });

  // save marketing data

  await marketingData({
    name: customerName,
    userId: userAddedId,
    addressId,
    email,
    noOfferEmails: noOffers,
  });

if (noOffers) {
  const normalizedEmail = email.toLowerCase();

  const ref = collection(db, 'campaignEmailListFinal');
  const q = query(ref, where('email', '==', normalizedEmail));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, {
      unsubscribed: true,
      source: 'app',
      updatedAt: serverTimestamp(),
    });
  } else {
    await addDoc(ref, {
      email: normalizedEmail,
      unsubscribed: true,
      source: 'app',
      createdAt: serverTimestamp(),
    });
  }
}



  return orderMasterId;

  //  const toBeDeleted = cartData[0].purchaseSession;
  //  console.log(toBeDeleted)
  //  await deleteDoc(doc(db, "orderProducts", toBeDeleted));
} //end of cart to orderProduct

/**
 * Save or update customer info in Firestore
 * @param name - Customer's full name
 * @param userId - Unique customer ID
 * @param email - Customer email address
 * @param marketingConsent - Boolean (true if allowed to send marketing)
 */
export async function marketingData({
  name,
  userId,
  addressId,
  email,
  noOfferEmails,
}: {
  name: string;
  userId: string;
  addressId:string;
  email: string;
  noOfferEmails: boolean;
}) {
  console.log("this is inside marketing data");
  // Use serverTimestamp for updatedAt
  const now = new Date();

  // Convert current German time to Firestore Timestamp
  const germanDateStr = now.toLocaleString("en-DE", {
    timeZone: "Europe/Berlin",
  });

  const germanDate = new Date(germanDateStr);

  await setDoc(
    doc(db, "customerRecentOrder", userId),
    {
      name,
      email,
      userId,
      addressId,
      noOfferEmails,
      lastOrderDate: serverTimestamp(), // Always use server time for tracking updates
      updatedAt: Timestamp.fromDate(germanDate), // Easily comparable in Firestore
    },
    { merge: true } // Will update if document already exists
  );
}

export async function updateOrderMaster(id: string, status: string) {
  try {
    const docRef = doc(db, "orderMaster", id);
    await updateDoc(docRef, { status });
    console.log("Document updated successfully!");
  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function addProductDraft(
  element: ProductType,
  userAddedId: string,
  orderMasterId: string
) {
  const product = {
    id: element.id,
    name: element.name,
    price: element.price,
    quantity: element.quantity,
    orderMasterId,
    //purchaseSession: element.purchaseSession,
    userId: userAddedId,
    //  status: element.status,
  };
  // console.log("UserAddedId in add products ----",  product)
  try {
    const docRef = await addDoc(collection(db, "orderProducts"), product);
    console.log("purchased product document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addOrderToMaster(element: orderMasterDataT) {
  let userDocRef = "" as string;
  let recordId = undefined;
  try {
    userDocRef = (await addDoc(collection(db, "orderMaster"), element)).id;
    recordId = userDocRef;
    return userDocRef;
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  // try {
  //   const docRef = await addDoc(collection(db, "orderMaster"), element1);
  //   console.log("Document written with ID: ", docRef.id);
  //   return docRef.id;
  //   // Clear the form
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
}

// export async function fetchOrdersMaster(): Promise<orderMasterDataT[]> {
//   const data = [] as orderMasterDataT[];
//   //  const q = query(collection(db, "orderMaster"));
//   //  const querySnapshot = await getDocs(q);

//   const collectionRef = collection(db, "orderMaster");

//   const targetQuery = query(collectionRef, orderBy("srno", "desc"), limit(20));
//   const querySnapshot = await getDocs(targetQuery);

//   querySnapshot.forEach((doc) => {
//     const pData = { id: doc.id, ...doc.data() } as orderMasterDataT;
//     data.push(pData);
//   });
//   return data;
// }



type orderMasterDataSafeT = Omit<orderMasterDataT, "createdAt"> & {
  createdAt: string; // ISO string
};

export async function fetchOrdersMaster(): Promise<orderMasterDataSafeT[]> {
  const data: orderMasterDataSafeT[] = [];

  const collectionRef = collection(db, "orderMaster");
  const targetQuery = query(collectionRef, orderBy("srno", "desc"), limit(20));
  const querySnapshot = await getDocs(targetQuery);

  querySnapshot.forEach((doc) => {
    const raw = doc.data() as orderMasterDataT;

    const createdAtStr =
      raw.createdAt instanceof Timestamp
        ? raw.createdAt.toDate().toISOString()
        : new Date().toISOString(); // fallback

    const pData: orderMasterDataSafeT = {
      ...raw,
      id: doc.id,
      createdAt: createdAtStr,
    };

    data.push(pData);
  });

  return data;
}


export async function deleteOrderMasterRec(id: string) {
  const docRef = doc(db, "orderMaster", id);
  await deleteDoc(docRef);

  return {
    message: { sucess: "Order Deleted" },
  };
  // }else{
  //   return {errors:"Somthing went wrong, can not delete product"}
  // }
}

export async function fetchOrdersMasterByUserId(
  userId: string
): Promise<Array<TOrderMaster>> {
  //  const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
  // const querySnapshot = await getDocs(q);
  //  let data = [];
  //  querySnapshot.forEach((doc) => {
  //    data.push({id:doc.id, ...doc.data()});
  //  });
  //  return data;

  let data = [] as orderMasterDataT[];

  const q = query(collection(db, "orderMaster"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = doc.data() as orderMasterDataT[];
  });
  return data;
}

// export async function addOrder(element) {
//   try {
//     const docRef = await addDoc(collection(db, "orderProducts"), element);
//     console.log("Document written with ID: ", docRef.id);
//     // Clear the form
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// export async function fetchOrders(){

//  // const result = await db.select().from(product);
//   const result = await getDocs(collection(db, "product"))
// //  console.log(result.docs)

// let data;
// data = [];
//   result.forEach((doc) => {
//     data.push({id:doc.id, ...doc.data()});
//   });
//  // console.log(data)
//   return data;
// }

export async function fetchOrderMasterById(id: string) {
  const docRef = doc(db, "orderMaster", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("No such document!");
    return null;
  }

  const raw = docSnap.data() as orderMasterDataT;

  const createdAtStr =
    raw.createdAt instanceof Timestamp
      ? raw.createdAt.toDate().toISOString()
      : new Date().toISOString();

  return {
    ...raw,
    createdAt: createdAtStr,
    id: docSnap.id,
  } as orderMasterDataSafeT;
}


/***************** Order detail  **************************/

export async function fetchOrderProductsByOrderMasterId(OrderMasterId: string) {
  //console.log("---------- inside order -----------", OrderMasterId)
  const data = [] as orderProductsT[];
  const q = query(
    collection(db, "orderProducts"),
    where("orderMasterId", "==", OrderMasterId)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const orderData = doc.data() as orderProductsT;
    data.push(orderData);
  });
  // console.log(data)
  return data;
}
