import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

export default function ListingItem({ listing, id }) {
    return (
        <li className="m-[10px] relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow duration-150 ease-in-out">
            <Link to={`/category/${listing.type}/${id}`} className="contents">
                <img
                    src={listing.imgUrls[0]}
                    alt=""
                    loading="lazy"
                    className="h-[170px] w-full object-cover hover:scale-105 duration-200 ease-in "
                />
                <Moment
                    fromNow
                    className="top-2 left-2 bg-blue-500 px-2 py-1 shadow-lg absolute text-white uppdercase text-xs font-semibold rounded-md "
                >
                    {listing.timestamp?.toDate()}
                </Moment>

                <div className="w-full p-[10px] ">
                    <div className="flex items-center space-x-1 left-0">
                        <CiLocationOn className="h-4 w-4 text-blue-500" />
                        <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
                            {listing.address}
                        </p>
                    </div>
                    <p className="font-semibold m-0 text-xl truncate">
                        {listing.name}
                    </p>

                    <p className="text-blue-500 mt-2 font-semibold">
                        {listing.offer
                            ? "$ " +
                              listing.discountprice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : "$ " +
                              listing.regularprice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === "rent" && " / month"}
                    </p>

                    <div className="flex items-center mt-[10px] space-x-3 ">
                        <div className="flex items-center space-x-1">
                            <p className="font-bold text-xs">
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} Beds`
                                    : "1 Bed"}
                            </p>
                            <p className="font-bold text-xs">
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} Baths`
                                    : "1 Bath"}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
