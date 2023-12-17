import React from "react";
import { useState } from "react";

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 0,
        bathrooms: 1,
        parking: false,
        furnished: true,
        address: "",
        description: "",
        offer: true,
        regularprice: 500,
        discountprice: 0,
    });
    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        description,
        offer,
        regularprice,
        discountprice,
    } = formData;
    function onChange() {}
    return (
        <main className="max-w-md px-2 mx-auto">
            <h1 className="w-full font-bold text-center text-3xl my-2 ">
                Create a Listing
            </h1>
            <p className="w-full font-medium mx-auto">Sell / Rent</p>
            <div className="flex justify-center items-center mb-6">
                <button
                    id="type"
                    onClick={onChange}
                    value="sale"
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 mr-3  ${
                         type === "rent"
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    Sell
                </button>
                <button
                    id="type"
                    onClick={onChange}
                    value="rent"
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 ${
                         type === "sale"
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    Rent
                </button>
            </div>
            <p className="w-full font-medium mx-auto">Name</p>
            <input
                type="text"
                id="name"
                value={name}
                placeholder="Name"
                onChange={onChange}
                maxLength="50"
                minLength="5"
                required
                className="px-3 py-2 rounded w-full hover:bg-white border border-gray-400 
                 hover:text-gray-400 hover:border-gray-400 transition duration-200
                  ease-in-out mb-6"
            />
            <div className="flex  items-center mb-6">
                <div className="mr-6">
                    <p className="w-full font-medium mx-auto ">Beds</p>
                    <input
                        type="number"
                        id="bedrooms"
                        value={bedrooms}
                        min="1"
                        max="50"
                        required
                        onChange={onChange}
                        className="w-full px-4 py-2 rounded text-gray-400 bg-white
                        border border-gray-400 hover:bg-white hover:text-gray-400
                        hover:border-gray-400 transition duration-200 ease-in-out
                    "
                    />
                </div>
                <div>
                    <p className="w-full font-medium mx-auto">Baths</p>
                    <input
                        type="number"
                        id="bathrooms"
                        value={bathrooms}
                        min="1"
                        max="50"
                        required
                        onChange={onChange}
                        className="w-full px-4 py-2 rounded text-gray-400 bg-white
                        border border-gray-400 hover:bg-white hover:text-gray-400
                        hover:border-gray-400 transition duration-200 ease-in-out
                    "
                    />
                </div>
            </div>
            <p className="w-full font-medium mx-auto">Parking spot</p>
            <div className="flex justify-center items-center mb-6">
                <button
                    id="parking"
                    onClick={onChange}
                    value={true}
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 mr-3  ${
                         !parking
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    Yes
                </button>
                <button
                    id="parking"
                    onClick={onChange}
                    value={false}
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 ${
                         parking
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    No
                </button>
            </div>
            <p className="w-full font-medium mx-auto">Furnished</p>
            <div className="flex justify-center items-center mb-6">
                <button
                    id="furnished"
                    onClick={onChange}
                    value={true}
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 mr-3  ${
                         !furnished
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    Yes
                </button>
                <button
                    id="furnished"
                    onClick={onChange}
                    value={false}
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 ${
                         furnished
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    No
                </button>
            </div>
            <p className="w-full font-medium mx-auto">Address</p>
            <textarea
                type="text"
                id="address"
                value={address}
                placeholder="Address"
                onChange={onChange}
                required
                className="px-3 py-2 rounded w-full hover:bg-white border border-gray-400 
                 hover:text-gray-400 hover:border-gray-400 transition duration-200
                  ease-in-out mb-6"
            />
            <p className="w-full font-medium mx-auto">Description</p>
            <textarea
                type="text"
                id="description"
                value={description}
                placeholder="Description"
                onChange={onChange}
                required
                className="px-3 py-2 rounded w-full hover:bg-white border border-gray-400 
                 hover:text-gray-400 hover:border-gray-400 transition duration-200
                  ease-in-out mb-6"
            />
            <p className="w-full font-medium mx-auto">Offer</p>
            <div className="flex justify-center items-center mb-6">
                <button
                    id="offer"
                    onClick={onChange}
                    value={true}
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 mr-3  ${
                         !offer
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    Yes
                </button>
                <button
                    id="offer"
                    onClick={onChange}
                    value={false}
                    className={`w-full font-semibold px-4 py-2 rounded shadow-md
                     hover:shadow-lg transition duration-200 ease-in-out mt-1 ${
                         offer
                             ? "bg-white text-black"
                             : "bg-slate-500 text-white"
                     } `}
                >
                    No
                </button>
            </div>
            <div className=" mb-6 flex">
                <div className="">
                    <p className="w-full font-medium mx-auto">Regular price</p>

                    <div className="flex items-center space-x-6">
                        <input
                            type="number"
                            id="regularprice"
                            value={regularprice}
                            min="500"
                            max="5000000"
                            required
                            onChange={onChange}
                            className="w-full px-4 py-2 rounded text-gray-400 bg-white
                        border border-gray-400 hover:bg-white hover:text-gray-400
                        hover:border-gray-400 transition duration-200 ease-in-out text-center
                    "
                        />
                        {type === "rent" && (
                            <div className="w-full whitespace-nowrap">
                                <p className="text-center "> $/Month</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className=" mb-6">
                <div className="">
                    {offer && (
                        <div className="">
                            <p className="w-full font-medium mx-auto">
                                Discount price
                            </p>
                            <div className="flex">
                                <div className="flex items-center space-x-6">
                                    <input
                                        type="number"
                                        id="discountprice"
                                        value={discountprice}
                                        min="500"
                                        max="5000000"
                                        required
                                        onChange={onChange}
                                        className="w-full px-4 py-2 rounded text-gray-400 bg-white
                                  border border-gray-400 hover:bg-white hover:text-gray-400
                                 hover:border-gray-400 transition duration-200 ease-in-out text-center
"
                                    />
                                    {type === "rent" && (
                                        <div className="w-full whitespace-nowrap">
                                            <p className="text-center ">
                                                {" "}
                                                $/Month
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <p className="w-full font-medium mx-auto">Images</p>
            <p className="w-full  mx-auto">
                The first image will be cover (max 6)
            </p>
            <input
                type="file"
                id="images"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={onChange}
                required
                className="px-4 py-2 rounded w-full bg-white hover:bg-white border border-gray-400 
                 hover:text-gray-400 hover:border-gray-400 transition duration-200
                  ease-in-out mb-6"
            />
            <button
                type="submit"
                className="mb-6 w-full px-4 py-2 bg-blue-700 text-white uppercase hover:bg-blue-800  focus:bg-blue-800  font-semibold  rounded shadow-md
                     focus:shadow-lg transition duration-200 ease-in-out"
            >
                Create Listing
            </button>
        </main>
    );
}
