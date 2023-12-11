import React from "react";

export default function SignIn() {
    return (
        <section>
            <h1 className="text-center text-2xl mt-2 font-bold">SignIn</h1>;
            <div className="flex flex-wrap mx-10 justify-between items-center ">
                <img
                    src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="key image"
                    className="w-full md:w-[50%] lg:w-[50%] rounded-lg"
                />
                <div className=" w-full md:w-[40%] lg:w-[40%] rounded-lg mt-10">
                    <form>
                        <input type="text" className="w-full" />
                    </form>
                </div>
            </div>
        </section>
    );
}
