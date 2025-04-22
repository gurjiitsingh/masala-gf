"use server";
import { categorySchema, editCategorySchema } from "@/lib/types/categoryType";
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
import { categoryType } from "@/lib/types/categoryType";

//type TcategorySchemaArray = TcategorySchema[]

export const fetchCategories = async (): Promise<categoryType[]> => {
  //const userQuery = await db.users.get()
  // const result = await getDocs(collection(db, "category"))
  // const docdata = result.docs.map(x => x.data() as categoryType)
  // return docdata;

  const result = await getDocs(collection(db, "category"));
  const data = [] as categoryType[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as categoryType;
    data.push(pData);
  });
  return data;
};

export async function deleteCategory(id: string, oldImgageUrl: string) {
  const docRef = doc(db, "category", id);
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

export async function addNewCategory(formData: FormData) {
  const name = formData.get("name");
  const desc = formData.get("desc");
  const sortOrder = formData.get("sortOrder");
  const image = formData.get("image");
  const isFeatured = formData.get("isFeatured");
  const recievedData = {
    name,
    desc,
    sortOrder,
    image,
    isFeatured,
  };
  

  const result = categorySchema.safeParse(recievedData);
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

  let imageUrl;
  try {
  
    imageUrl = await upload(image);
  } catch (error) {
    console.log(error);
    return { errors: "image cannot uploaded" };
  }

  const data = {
    name,
    desc,
    // slug,
    sortOrder,
    image: imageUrl,
    isFeatured,
  };

  try {
    const docRef = await addDoc(collection(db, "category"), data);
    console.log("Document written with ID: ", docRef.id);
    return {
      message: { sucess: "Category Created" },
    };
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function editCategory(formData: FormData) {
 // console.log("inside cat edit -------", formData);
  const id = formData.get("id") as string;
  const image = formData.get("image");
  const name = formData.get("name");
  const desc = formData.get("desc");
  const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const isFeatured = formData.get("isFeatured");
  const sortOrder = formData.get("sortOrder");

  //console.log("is featured----------------", isFeatured)


  const receivedData = {
    id,
    oldImgageUrl,
    name,
    desc,
    sortOrder,
    image,
    isFeatured,
  };

  const result = editCategorySchema.safeParse(receivedData);

 
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
      console.log("image_public_id ---", image_public_id);
      try {
        const deleteResult = await deleteImage(image_public_id);
        console.log(deleteResult);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const categoryUpdateData = {
    name,
    desc,
    sortOrder,
    image: imageUrl,
    isFeatured,
  };
  
  // update database
  try {
    const docRef = doc(db,"category", id);
   await setDoc(docRef, categoryUpdateData);

  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchCategoryById(id: string): Promise<categoryType> {
  const docRef = doc(db, "category", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    //  console.log("Document data:", docSnap.data());
  } else {
    //   docSnap.data() //will be undefined in this case
    //  console.log("No such document!");
  }
  const category = { id: docSnap.id, ...docSnap.data() } as categoryType;

  return category;
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
