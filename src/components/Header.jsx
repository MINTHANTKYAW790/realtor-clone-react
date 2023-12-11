import React from "react";
import { useLocation, useNavigate } from "react-router";
export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    function pathMathRouth(Route) {
        if (Route === location.pathname) {
            console.log(location.pathname);
            return true;
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
                                pathMathRouth("/") &&
                                "text-black border-b-orange-500 font-bold"
                            }`}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer border-b-2 border-b-transparent text-gray"${
                                pathMathRouth("/offers") &&
                                "text-black border-b-orange-500 font-bold"
                            }`}
                            onClick={() => navigate("/offers")}
                        >
                            Offers
                        </li>
                        <li
                            className={`cursor-pointer border-b-2 border-b-transparent text-gray "${
                                pathMathRouth("/sign-in") &&
                                "text-black border-b-orange-500 font-bold"
                            }`}
                            onClick={() => navigate("/sign-in")}
                        >
                            SignIn
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
