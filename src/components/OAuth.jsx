import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
    return (
        <div>
            <button
                className="bg-red-500 flex justify-center items-center py-2 mb-5 w-full shadow-md active:bg-red-900
 text-white rounded-md text-lg font-bold hover:bg-red-600 uppercase transition duration-300 ease-in-out"
            >
                <FcGoogle className="bg-white rounded-full uppercase mx-2" />
                continue with google
            </button>
        </div>
    );
}
