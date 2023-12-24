import React, { useState } from "react";
import Slider from "../components/Slider";
import { useEffect } from "react";
import { db } from "../firebase";
import { Spinner } from "../components/Spinner";

import {
    query,
    orderBy,
    limit,
    collection,
    getDocs,
    doc,
} from "firebase/firestore";

export default function Home() {
    
    return (
        <div>
            <Slider />
        </div>
    );
}
