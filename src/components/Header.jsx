import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [pageState, setPageState] = useState("Sign in");
    const auth = getAuth();
    console.log(auth);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("Profile");
            } else {
                setPageState("Sign in");
            }
        });
    }, [auth]);

    function pathMatchRouth(Route) {
        if (Route === location.pathname) {
            return true;
            //console.log(location.pathname);
        }
    }

    return (
        <div>
            <header className="sticky z-10 bg-white">
                <div className="flex justify-between items-center  px-20 border-b-0 shadow-md h-12 ">
                    <img
                        src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                        alt="realtor logo"
                        className="h-5 cursor-pointer"
                        onClick={() => navigate("/")}
                    />
                    <ul className="flex justify-center items-center space-x-10 space-y-0 h-5/5 ">
                        <li
                            className={`cursor-pointer border-b-2 border-b-transparent text-gray "${
                                pathMatchRouth("/") &&
                                "border-b-orange-800 text-black font-bold"
                            }`}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer border-b-2 border-b-transparent text-gray"${
                                pathMatchRouth("/offers") &&
                                "text-black border-b-orange-800 font-bold"
                            }`}
                            onClick={() => navigate("/offers")}
                        >
                            Offers
                        </li>
                        <li
                            className={`cursor-pointer border-b-2 border-b-transparent text-gray "${
                                (pathMatchRouth("/sign-in") ||
                                    pathMatchRouth("/profile")) &&
                                "text-black border-b-blue-800 font-bold"
                            }`}
                            onClick={() => navigate("/profile")}
                        >
                            {pageState}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
