import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import LinkDropdown from "./LinkDropdown";

export default function Login() {
  const { data: session } = useSession(); 
//console.log("sessiong to find type----------------",session)
  return (
    <>
      <div className="flex items-center gap-2 justify-between  ">
        <div className="flex flex-row gap-5 py-5 justify-end">
          {!session && <Link href="/auth/login">Login</Link>}
          {/* {session&& <button onClick={()=>{signOut()}}>Logout</button>  } */}
          {session && (
            <button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          )}
          {/* {session&&  <Link href="/user">My Account</Link> } */}
          {!session && <Link href="/auth/register">Register</Link>}
          {session && <LinkDropdown session={session} />}
        </div>
      </div>
    </>
  );
}
