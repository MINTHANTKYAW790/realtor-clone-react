import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

export default function Profile() {
    const navigate = useNavigate();
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
                            className="mb-5 w-full enable rounded border border-gray-400 text-gray-700 transition duration-200 ease-in-out "
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
                                <span className="ml-1 text-red-500 hover:text-red-700 cursor-pointer transition duration-200 ease-in-out">
                                    Edit
                                </span>
                            </p>
                            <p
                                onClick={onLogOut}
                                className="ml-1 text-blue-500 hover:text-blue-700 cursor-pointer transition duration-200 ease-in-out"
                            >
                                Sign out
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
