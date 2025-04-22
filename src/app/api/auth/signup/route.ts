import { NextRequest, NextResponse }  from 'next/server';
import { hashPassword } from '@/lib/auth';
import { addDoc, collection, getDocs, limit, query, where } from '@firebase/firestore';
import { db } from '@/lib/firebaseConfig';


export async function POST(req: NextRequest){
    console.log("-------- in signup route --------------")

    // const params = req.nextUrl.searchParams;
    // console.log(params)
        //const ReqBody = await req.json();
        //const { username, email, password } = ReqBody;
     

        const formData = await req.formData();

        const username =  formData.get("username");
        const email =  formData.get("email");
        const password =  formData.get("password");
      //  const confirmPassword =  formData.get("confirmPassword");
    
 
  
    const collectionRef = collection(db, 'user')
    const targetQuery = query(collectionRef, where('email', '==', email), limit(1))
    const querySnapshot = await getDocs(targetQuery)
    if (!querySnapshot.empty) return  NextResponse.json({error: "User allready exists", status: 400})
  //  let userData = querySnapshot.docs.map((doc) => doc.data())[0]
  //  console.log("already exist", userData)


 try {
    const hashedPassword = hashPassword(password);
        const  newuser = {
            username,email,hashedPassword,role:"user",isVerfied: true,isAdmin:false
        }


      const docRef = await addDoc(collection(db, "user"), newuser);
      console.log("Document written with ID: ", docRef.id);
      // Clear the form
  } catch (e) {
      console.error("Error adding document: ", e);
  }


return NextResponse.json({data:"User added"})

}