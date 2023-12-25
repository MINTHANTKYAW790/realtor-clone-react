import React, { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "../components/Spinner";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { useNavigate, useParams } from "react-router";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import { toast } from "react-toastify";

export default function EditListing() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [geolocationEnabled, setGeolocationEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null);
    const [formData, setFormData] = useState({
        type: "sale",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: true,
        furnished: true,
        address: "",
        description: "",
        offer: false,
        regularprice: 50,
        discountprice: 1,
        latitude: 1,
        longtitude: 1,
        images: {},
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
        latitude,
        longtitude,
        images,
    } = formData;

    const params = useParams();

    useEffect(() => {
        if (listing && listing.userRef !== auth.currentUser.uid) {
            toast.error("You can't edit this listing");
            navigate("/");
        }
    }, [auth.currentUser.uid, listing, navigate]);

    useEffect(() => {
        setLoading(true);
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setFormData({ ...docSnap.data() });
                setLoading(false);
            } else {
                navigate("/");
                toast.error("Listing does not exist!");
            }
        }
        fetchListing();
    }, [navigate, params.listingId]);

    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }));
        }
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (+regularprice < +discountprice) {
            setLoading(false);
            toast.error("Regular price must exceed than the discount price");
            return;
        }
        if (images.length > 6) {
            setLoading(false);
            toast.error("maximum 6 images are allowed!");
            return;
        }
        let geolocation = {};
        let location;
        if (geolocationEnabled) {
            const responce = await fetch(`https://maps.googleapis/maps/api/
            geocode/json?address=${address}&key=${process.env.REACT_APP_GEDCODE_API_KEY}`);
            const data = await responce.json();
            console.log(data);
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;
            location = data.status === "ZERO_RESULTS" && undefined;
            if (location === undefined) {
                toast.error("Please enter a correct address!");
            }
        } else {
            geolocation.lat = latitude;
            geolocation.lng = longtitude;
        }

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${
                    image.name
                }-${uuidv4()}`;
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                        }
                    },
                    (error) => {
                        reject(error);
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case "storage/unauthorized":
                                // User doesn't have permission to access the object
                                break;
                            case "storage/canceled":
                                // User canceled the upload
                                break;

                            // ...

                            case "storage/unknown":
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL);
                            }
                        );
                    }
                );
            });
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => {
                return storeImage(image);
            })
        ).catch((error) => {
            setLoading(false);
            toast.error("Images not uploaded !");
            return;
        });

        const formDataCopy = {
            ...formData,
            imgUrls,
            geolocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        };
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountprice;
        delete formDataCopy.latitude;
        delete formDataCopy.longtitude;
        const docRef = doc(db, "listings", params.listingId);
        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success("Updated the Listing !");
        navigate(`/category/${formDataCopy}/${docRef.id}`);
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <main className="max-w-md px-2 mx-auto">
            <h1 className="w-full font-bold text-center text-3xl my-2 ">
                Edit Listing
            </h1>
            <form onSubmit={onSubmit}>
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
                    onChange={onChange}
                    placeholder="Name"
                    maxLength="32"
                    minLength="10"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
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
                            enabled
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
                {!geolocationEnabled && (
                    <div className="flex space-x-6 mb-6">
                        <div>
                            <p className="w-full font-medium">Latitude</p>
                            <input
                                type="number"
                                step="0.00000000000001"
                                id="latitude"
                                value={latitude}
                                onChange={onChange}
                                required
                                min="-90"
                                max="90"
                                className="w-full px-4 py-2 rounded text-gray-400 bg-white
                        border border-gray-400 hover:bg-white hover:text-gray-400
                        hover:border-gray-400 transition duration-200 ease-in-out
                    "
                            />
                        </div>
                        <div>
                            <p className="w-full font-medium">Longtitude</p>
                            <input
                                type="number"
                                step="0.00000000000001"
                                id="longtitude"
                                value={longtitude}
                                onChange={onChange}
                                required
                                min="-180"
                                max="180"
                                className="w-full px-4 py-2 rounded text-gray-400 bg-white
                        border border-gray-400 hover:bg-white hover:text-gray-400
                        hover:border-gray-400 transition duration-200 ease-in-out
                    "
                            />
                        </div>
                    </div>
                )}
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
                        <p className="w-full font-medium mx-auto">
                            Regular price
                        </p>

                        <div className="flex items-center space-x-6">
                            <input
                                type="number"
                                id="regularprice"
                                value={regularprice}
                                min="50"
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
                                            min="0"
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
                    type="onSubmit"
                    className="mb-2 w-full px-4 py-2 bg-blue-700 text-white uppercase hover:bg-blue-800  focus:bg-blue-800  font-semibold  rounded shadow-md
                     focus:shadow-lg transition duration-200 ease-in-out"
                >
                    Update Listing
                </button>
                <p className="text-center mb-6">
                    Updating may takes a few seconds to complete!
                </p>
            </form>
        </main>
    );
}
