import React from "react";
import spinner from "../assets/svg/spinner.svg";
export function Spinner() {
    return (
        <div className="h-screen flex justify-center items-center left-0 right-0 bottom-0 top-0 flex-col bg-black bg-opacity-30 z-60">
            <div>
                <img src={spinner} alt="Loading..." />
            </div>
        </div>
    );
}
