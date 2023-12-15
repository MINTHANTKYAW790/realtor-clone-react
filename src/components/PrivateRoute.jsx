import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus();
    if (checkingStatus) {
        return <h4>Loading...</h4>;
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
