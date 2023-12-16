import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Spinner } from "../components/Spinner";

export default function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus();
    if (checkingStatus) {
        return <Spinner />;
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
