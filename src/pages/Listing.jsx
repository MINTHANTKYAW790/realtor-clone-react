import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { Spinner } from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaShare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaBath } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { getAuth } from "firebase/auth";

import { FaBed } from "react-icons/fa";

import SwiperCore, {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination,
} from "swiper";
import "swiper/css/bundle";
import Contact from "../components/Contact";

export default function Listing() {
    const auth = getAuth();
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [contactLandlord, setContactLandlord] = useState(false);
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
                console.log(listing);
            }
        }
        fetchListing();
    }, [params.listingId]);
    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 3000 }}
            >
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative w-full overflow-hidden h-[300px]"
                            style={{
                                backgroundSize: "cover",
                                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                            }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className="fixed top-[13%] right-[3%] z-50 bg-white cursor-pointer border-2 border-gray-400  rounded-full w-12 h-12 flex justify-center items-center "
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setShareLinkCopied(true);
                    setTimeout(() => {
                        setShareLinkCopied(false);
                    }, 2000);
                }}
            >
                <FaShare className="text-lg text-slate-500" />
            </div>
            {shareLinkCopied && (
                <p
                    className="p-1 text-sm z-10 fixed top-[23%] right-[5%] font-semibold border-2
                 border-gray-400 rounded-md bg-white"
                >
                    Link Copied
                </p>
            )}
            <div className="m-4 flex flex-col md:flex-row md:flex-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                <div className=" w-full ">
                    <p className="text-2xl font-bold mb-3 text-blue-900">
                        {listing.name} - ${" "}
                        {listing.offer
                            ? listing.discountprice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : listing.regularprice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === "rent" ? " / month" : ""}
                    </p>
                    <div className="flex items-center mt-6 mb-3 font-semibold">
                        <CiLocationOn className="mr-1 text-blue-700" />
                        <p className="font-semibold mb-[2px] text-gray-600 ">
                            {listing.address}
                        </p>
                    </div>
                    <div className="flex justify-start items-center space-x-4 w-[75%]">
                        {" "}
                        <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                            {listing.type === "rent" ? "Rent" : "Sale"}
                        </p>
                        {listing.offer && (
                            <p className="bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                                $
                                {+listing.regularprice - +listing.discountprice}{" "}
                                discount
                            </p>
                        )}
                    </div>
                    <p className="mt-3 mb-3">
                        <span className="font-semibold">Description -</span>
                        {listing.description}
                    </p>
                    <ul className="mb-6 flex items-center space-x-2 text-sm font-semibold sm:space-x-10">
                        <li className="flex items-center whitespace-nowrap ">
                            <FaBed />
                            {+listing.bedrooms > 1
                                ? `${listing.bedrooms} Beds`
                                : "1 Bed"}
                        </li>
                        <li className="flex items-center whitespace-nowrap ">
                            <FaBath />

                            {+listing.bathrooms > 1
                                ? `${listing.bathrooms} Baths`
                                : "1 Bath"}
                        </li>
                        <li className="flex items-center whitespace-nowrap ">
                            <FaParking />

                            {+listing.parking ? "Parking Spot" : "No Parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap ">
                            <FaChair />

                            {+listing.furnished ? "Furnished" : "Not Furnished"}
                        </li>
                    </ul>
                    {listing.userRef !== auth.currentUser?.uid &&
                        !contactLandlord && (
                            <div className="mt-6">
                                <button
                                    onClick={() => setContactLandlord(true)}
                                    className="z-10 px-7 py-3 bg-blue-600 text-white font-medium
                    text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
                                >
                                    Contact LandLord
                                </button>
                            </div>
                        )}
                    {contactLandlord && (
                        <Contact userRef={listing.userRef} listing={listing} />
                    )}
                </div>
                <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-hidden"></div>
            </div>
        </main>
    );
}
