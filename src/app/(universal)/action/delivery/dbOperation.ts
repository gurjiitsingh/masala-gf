"use server";


import { adminDb } from "@/lib/firebaseAdmin";
import { deliveryType, newPorductSchema, editPorductSchema } from "@/lib/types/deliveryType";
import { formatPriceStringToNumber } from "@/utils/formatters";


export async function addNewdelivery(formData: FormData) {
  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    minSpend: formData.get("minSpend"),
    productCat: formData.get("productCat"),
    deliveryDesc: formData.get("deliveryDesc"),
    deliveryDistance: formData.get("deliveryDistance"),
  };

  const result = newPorductSchema.safeParse(receivedData);
  if (!result.success) {
    const zodErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { errors: zodErrors };
  }

  const data = {
    name: receivedData.name,
    price: formatPriceStringToNumber(receivedData.price),
    productCat: receivedData.productCat,
    deliveryDesc: receivedData.deliveryDesc,
    minSpend: formatPriceStringToNumber(receivedData.minSpend),
    deliveryDistance: receivedData.deliveryDistance,
  };

  try {
    const docRef = await adminDb.collection("delivery").add(data);
    console.log("Delivery added with ID:", docRef.id);
    return { message: "Delivery saved" };
  } catch (error) {
    console.error("Error adding delivery:", error);
    return { errors: "Failed to save delivery" };
  }
}

export async function deletedelivery(id: string): Promise<{ success: string }> {
  await adminDb.collection("delivery").doc(id).delete();
  return { success: "Delete implemented" };
}

export async function editdelivery(formData: FormData) {
  const id = formData.get("id") as string;
  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    deliveryDesc: formData.get("deliveryDesc"),
    minSpend: formData.get("minSpend"),
    deliveryDistance: formData.get("deliveryDistance"),
  };

  const result = editPorductSchema.safeParse(receivedData);
  if (!result.success) {
    const zodErrors = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return { errors: zodErrors };
  }

  const updateData = {
    name: receivedData.name,
    price: formatPriceStringToNumber(receivedData.price),
    productCat: receivedData.productCat,
    deliveryDesc: receivedData.deliveryDesc,
    minSpend: formatPriceStringToNumber(receivedData.minSpend),
    deliveryDistance: receivedData.deliveryDistance,
  };

  try {
    await adminDb.collection("delivery").doc(id).set(updateData);
    return { message: "Delivery updated" };
  } catch (error) {
    console.error("Error updating delivery:", error);
    return { errors: "Cannot update delivery" };
  }
}

export async function fetchdelivery(): Promise<deliveryType[]> {
  const snapshot = await adminDb.collection("delivery").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as deliveryType));
}

export async function fetchdeliveryById(id: string): Promise<deliveryType> {
  const docSnap = await adminDb.collection("delivery").doc(id).get();
  if (!docSnap.exists) throw new Error("Delivery not found");
  return { id: docSnap.id, ...docSnap.data() } as deliveryType;
}

export async function fetchdeliveryByZip(zipname: string): Promise<deliveryType> {
  const querySnapshot = await adminDb.collection("delivery")
    .where("name", "==", zipname)
    .get();

   //   console.log("querySnapshot.docs[0].data()---------", querySnapshot.docs[0].data())
 if (querySnapshot.empty){
 
 // return querySnapshot.docs[0].data() as deliveryType;
  return {
    id:'',
  name: '',
  price: '',
  productCat: '',
  deliveryDesc: '',
  deliveryDistance: '',
  minSpend: 1
}
 } //throw new Error("No delivery data found for the provided zip");
  return querySnapshot.docs[0].data() as deliveryType;
 // return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as deliveryType;
}


// export async function fetchdeliveryByZip1(
//   zipname: string
// ): Promise<deliveryType> {
//  // console.log("insider delivery action------", zipname)
//   const data = [] as deliveryType[];
//   const q = query(
//     collection(db, "delivery"),
//     where("name", "==", zipname)
//   );
//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     const datas = doc.data() as deliveryType;
//     data.push(datas);
//   });
//   //console.log("email -------- ", data)
//   return data[0];
// }