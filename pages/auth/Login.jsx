import { auth } from "@/utils/firebase-config"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function Login() {

    const route = useRouter();

    const [user, loading] = useAuthState(auth);

    //Sign in wiht google
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, googleProvider)
            console.log(user);
            route.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            route.push("/")
        } else {
            console.log("Login")
        }
    }, [user])

    return (
        <div className="shadow-xl mt-32 py-10 text-gray-700 rounded-lg flex flex-col items-center">
            <h2 className="text-5xl font-semibold">Join Today</h2>
            <div className="py-4 flex flex-col items-center">
                <h3 className="py-2">Sign in with one of the providers</h3>
                <button onClick={signInWithGoogle} className="mt-3 bg-transparent hover:bg-cyan-500 text-cyan-500 font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded">Sign in with Google</button>
            </div>
        </div>
    )
}

export default Login