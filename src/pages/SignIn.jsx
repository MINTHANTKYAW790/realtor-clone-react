import React, { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";

import OAuth from "../components/OAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;
    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    const navigate = useNavigate();
    async function onSubmit(e) {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCredential.user) {
                navigate("/");
            }
            toast.success("Logged in as " + auth.currentUser.displayName);
        } catch (error) {
            toast.error("Bad user credentials");
        }
    }
    return (
        <section>
            <h1 className="text-center text-2xl mt-2 font-bold">SignIn</h1>;
            <div className="flex flex-wrap mx-10 justify-between items-center ">
                <img
                    src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="key"
                    className="w-full md:w-[50%] lg:w-[50%] rounded-lg"
                />
                <div className=" w-full md:w-[40%] lg:w-[40%] rounded-lg mt-10  ">
                    <form onSubmit={onSubmit}>
                        <div>
                            <input
                                type="email"
                                className="w-full text-black rounded-lg my-5 border-gray-400 transition ease-in-out"
                                id="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full text-black rounded-lg mb-5  border-gray-400 transition ease-in-out"
                                id="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                            />
                            {showPassword ? (
                                <IoIosEye
                                    className="absolute right-6 top-3 text-lg cursor-pointer"
                                    onClick={() => {
                                        setShowPassword(
                                            (prevState) => !prevState
                                        );
                                    }}
                                />
                            ) : (
                                <IoEyeOff
                                    className="absolute right-6 top-3 text-lg cursor-pointer"
                                    onClick={() => {
                                        setShowPassword(
                                            (prevState) => !prevState
                                        );
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex justify-between mb-5">
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    to={"/sign-up"}
                                    className="text text-red-600 cursor-pointer hover:text-red-700 transition duration-300 ease-in-out"
                                >
                                    Register
                                </Link>
                            </p>
                            <Link
                                to={"/forgot-password"}
                                className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out"
                            >
                                Forget Password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 mb-5 py-2 w-full uppercase shadow-md active:bg-blue-900
                         text-white rounded-md text-lg font-bold hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            Sign In
                        </button>
                        <div
                            className="my-4 before:border-t flex before:flex-1 items-center  before:border-gray-300
                        after:border-t  after:flex-1  after:border-gray-300"
                        >
                            <p className="text-center font-semibold mx-4  ">
                                OR
                            </p>
                        </div>
                        <OAuth></OAuth>
                    </form>
                </div>
            </div>
        </section>
    );
}
