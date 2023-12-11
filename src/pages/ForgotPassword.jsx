import React, { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";

import OAuth from "../components/OAuth";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    function onChange(e) {
        setEmail(e.target.value);
    }
    return (
        <section>
            <h1 className="text-center text-2xl mt-2 font-bold">
                Forgot Password
            </h1>
            ;
            <div className="flex flex-wrap mx-10 justify-between items-center ">
                <img
                    src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="key image"
                    className="w-full md:w-[50%] lg:w-[50%] rounded-lg"
                />
                <div className=" w-full md:w-[40%] lg:w-[40%] rounded-lg mt-10  ">
                    <form>
                        <div>
                            <input
                                type="email"
                                className="w-full text-black rounded-lg my-5 border-gray-400 transition ease-in-out"
                                id="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email address"
                            />
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
                                to={"/sign-in"}
                                className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out"
                            >
                                sign in instead
                            </Link>
                        </div>
                        <button
                            className="bg-blue-500 mb-5 py-2 w-full uppercase shadow-md active:bg-blue-900
                         text-white rounded-md text-lg font-bold hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            send reset email
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
