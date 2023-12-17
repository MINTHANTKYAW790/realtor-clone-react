import React from "react";
import { useState } from "react";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import {
    fetchSignInMethodsForEmail,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile() {
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false);
    const auth = getAuth();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData;
    function onLogOut() {
        auth.signOut();
        navigate("/");
    }
    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    async function onSubmit() {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });
                const docRef = doc(db, "users", auth.currentUser.uid);
                //the role name in the firebase if users , not user, this make me to find the toast error!
                await updateDoc(docRef, {
                    name,
                });
            }
            toast.success("Profile Updated!");
        } catch (error) {
            console.log(error);
            toast.error("Coule not update the profile details!");
        }
    }
    return (
        <>
            <section className=" w-full flex justify-center items-center flex-col ">
                <h1 className="text-3xl font-bold my-3"> My Profile</h1>
                <div>
                    <form>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            disabled={!changeDetail}
                            onChange={onChange}
                            className={`mb-5 w-full rounded border border-gray-400 text-gray-700 transition duration-200 ease-in-out ${
                                changeDetail && "bg-red-200 focus:bg-red-200"
                            }`}
                        />
                        <input
                            type="text"
                            id="email"
                            value={email}
                            className="mb-5 w-full enable rounded border border-gray-400 text-gray-700 transition duration-200 ease-in-out "
                        />
                        <div className="flex justify-between items-center text-sm">
                            <p>
                                Do you want to change your name?
                                <span
                                    onClick={() => {
                                        changeDetail && onSubmit();
                                        setChangeDetail(
                                            (prevState) => !prevState
                                        );
                                    }}
                                    className={`ml-1 text-red-500 hover:text-red-700 cursor-pointer transition duration-200 ease-in-out `}
                                >
                                    {changeDetail ? "Apply Change" : "Edit"}
                                </span>
                            </p>
                            <p
                                onClick={onLogOut}
                                className="ml-1 text-blue-500 hover:text-blue-700 cursor-pointer transition duration-200 ease-in-out"
                            >
                                Sign out
                            </p>
                        </div>
                        <button className="bg-blue-500 rounded w-full shadow-md mt-5  hover:bg-blue-600 transition duration-200 ease-in-out active:bg-blue-700 active:shadow-lg">
                            <Link
                                to={"/create-listing"}
                                className="flex justify-center items-center"
                            >
                                <FcHome className="bg-white rounded-xl mr-2 text-3xl" />
                                <p className="uppercase py-2 text-white ">
                                    sell or rent your home
                                </p>
                            </Link>
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
