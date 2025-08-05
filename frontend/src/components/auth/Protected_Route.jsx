import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../common/Loading";

export const Protected_Route = ({ children }) =>
{
    const { user, token } = useAuth();

    if (!user && token) return <Loading message="Authenticating..." />;

    if (!user) return <Navigate to="/login" />;

    return children;
};
