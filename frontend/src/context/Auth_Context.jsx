import React, { useState, useEffect, createContext } from "react";
import { api_request } from "../api";

const Auth_Context = createContext(null);

export const Auth_Provider = ({ children }) =>
{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true);

    useEffect(
        () =>
        {
            const fetch_user_profile = async () =>
            {
                if(token)
                {
                    try
                    {
                        const data = await api_request("/api/users/profile", "GET", null, token);
                        setUser(data.user);
                    }
                    catch (error)
                    {
                        console.error("Session expired or invalid:", error);
                        setToken(null);
                        localStorage.removeItem("authToken");
                        setUser(null);
                    }
                }
                else
                {
                    setUser(null);
                    localStorage.removeItem("authToken");
                }
                setLoading(false);
            };
            fetch_user_profile();
        },
        [token]
    );

    const login = async (new_token) =>
    {
        setToken(new_token);
        localStorage.setItem("authToken", new_token);
        try {
            const data = await api_request("/api/users/profile", "GET", null, new_token);
            setUser(data.user);
        } catch (error) {
            console.error("Failed to fetch user profile after login:", error);
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
        }
    };
    
    const logout = () =>
    {
        api_request("/api/auth/logout", "POST", null, token)
            .then(() => console.log("Logout successful"))
            .catch(err => console.error("Logout failed:", err));

        setToken(null);
        localStorage.removeItem("authToken");
        setUser(null);
    };

    const value = { user, token, loading, login, logout };

    return <Auth_Context.Provider value={value}>{children}</Auth_Context.Provider>;
};

export default Auth_Context;
