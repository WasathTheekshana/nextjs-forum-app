import Link from "next/link"
import { auth } from "@/utils/firebase-config"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";

function Nav() {

  const [user, loading] = useAuthState(auth);

  //Sign out from google account
  const signOutFromGoogle = async() => {
    try{
      await signOut(auth);
      console.log("Sign Out")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <nav className="flex justify-between items-center py-5">
      <Link href={"/"}>
        <button className="text-lg font-semibold">Forum</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/Login"}>
            <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">Join Now</button>
          </Link>
        )}
        {user && (
          <div className="flex flex-row gap-5 items-center">
            <Link href={"/Post"}>
              <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-2">Post</button>
            </Link>
            <Link href={"/Dashboard"}>
              <img className="w-10 rounded-full cursor-pointer" src={user.photoURL} />
            </Link>
            <button onClick={signOutFromGoogle}>Sign Out</button>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Nav