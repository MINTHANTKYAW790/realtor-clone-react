import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";
export default function OAuth() {
    const navigate = useNavigate();
    async function onGoogleClick() {
        console.log("CWG button Clicked!");
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success("Signed up with Google account");
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            toast.error("Could not authorized with Google!");
        }
    }
    return (
        <div>
            <button
                To="/"
                type="button"
                onClick={onGoogleClick}
                className="bg-red-500 flex justify-center items-center py-2 mb-5 w-full shadow-md active:bg-red-900
 text-white rounded-md text-lg font-bold hover:bg-red-600 uppercase transition duration-300 ease-in-out"
            >
                <FcGoogle className="bg-white rounded-full uppercase mx-2" />
                continue with google
            </button>
        </div>
    );
}
