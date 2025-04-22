//import NextAuth from "next-auth";
import { verifyPassword } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { collection, getDocs,  query, where } from "@firebase/firestore";
import { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";


const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any, req): Promise<any> {
        const { email, password } = credentials;

        //  console.log("-----------------inside NextAuth -----------------");

        const collectionRef = query(
          collection(db, "user"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(collectionRef);
        const current_user = querySnapshot.docs.map((doc) => doc.data())[0];
        const current_id = querySnapshot.docs.map((doc) => doc.id)[0];

        if (!current_user) {
          throw new Error("No user found!");
          return null;
        }

        const isVaildPass = await verifyPassword(
          password,
          current_user.hashedPassword
        );
        //console.log("user is autenticate--------", isVaildPass)

        if (!isVaildPass) {
          throw new Error("Wrong Credentials");
          return null;
        }

        const user = {
          id: current_id, //current_user.id,
          name: current_user.username,
          role: current_user.role,
          email: current_user.email,
        };
        //console.log("user in provider ---",user )
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        //   return '/unauthorized'
      }
    },

    async redirect({ url, baseUrl }) {
      //  baseUrl =  process.env.NEXT_PUBLIC_BASE_PATH as string;
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, user }) {
      // console.log("in jwt --------",user,"token ----- ",token )
      // call stack 1
      // you can get user values from databas directly here
      if (user) {
      //  user.role = user?.role === null ? "user" : user?.role;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: DefaultSession;
      token: JWT;
      
    }) {
      session.user = token.user as User;
      //   console.log("session -------",session)
      return session;
    },

    //   async jwt({ token, user, session }:any) {
    // //  console.log("in jwt --------",user,"session--------", session,"token ----- ",token )
    //  // call stack 1
    //   // you can get user values from databas directly here
    //   if (user) {
    //    // User is available during sign-in
    //    // can take value from user to assing to token
    //     return {
    //       id: user.id,
    //       name: user.name,
    //       role: user.role,
    //       email: user.email,
    //       picture: user.image,
    //     };
    //   }
    //   return token;
    // },

    // async session({ session, token, user }:{session:CustomSessionType,token:JWT, user:CustomUserType}) {
    //   // call stack 2
    //  //token pocess all values, assign value to session

    //   session.user.id = token.id;
    //   session.user.name = token.name;
    //   session.user.email = token.email;
    //   session.user.role = token.role;
    //   session.user.image = token.picture;
    // // console.log("in session --------", session, token )
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
