# Frontend Scripts Documentation

This document contains all the JavaScript/JSX scripts from the frontend/src directory.

## Main Entry Points

### main.jsx
```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
);
```

### App.jsx
```jsx
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';

import { Auth_Provider } from './context/Auth_Context';
import { useAuth } from './hooks/useAuth';
import { Protected_Route } from './components/auth/Protected_Route';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Sidebar } from './components/layout/Sidebar';
import { Full_Screen_Loading } from './components/feedback/Full_Screen_Loading';
import { Error_Boundary } from './components/feedback/Error_Boundary';

// Lazy load page components
const Home_Page = lazy(() => import('./pages/Home_Page'));
const Login_Page = lazy(() => import('./pages/Login_Page'));
const Registration_Page = lazy(() => import('./pages/Registration_Page'));
const Dashboard_Page = lazy(() => import('./pages/Dashboard_Page'));
const Account_Management_Page = lazy(() => import('./pages/Account_Management_Page'));
const User_Profile_Page = lazy(() => import('./pages/User_Profile_Page'));
const Create_Article_Page = lazy(() => import('./pages/Create_Article_Page'));
const Article_Details_Page = lazy(() => import('./pages/Article_Details_Page'));
const Edit_Article_Page = lazy(() => import('./pages/Edit_Article_Page'));

// Define sidebar widths for consistent spacing
const drawer_width_collapsed = 60;
const drawer_width_expanded = 240;

// Custom Material-UI Theme
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(148, 47, 0)', // Deep orange-brown (dark)
            light: 'rgb(170, 70, 20)',
            dark: 'rgb(102, 30, 0)',
            contrastText: '#fff', // White for text/icons on primary background
        },
        secondary: {
            main: 'rgb(102, 56, 0)', // Darker brown (for accents/hover)
            light: 'rgb(120, 70, 10)',
            dark: 'rgb(80, 40, 0)',
            contrastText: '#fff',
        },
        background: {
            default: 'rgb(255, 230, 200)', // Light cream background for main content
            paper: '#fff', // White for cards/forms/paper components
        },
        text: {
            primary: 'rgb(148, 47, 0)', // Darker color for main headings/text
            secondary: '#555555', // Medium dark text for body/secondary info
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        error: { main: '#d32f2f' },
        warning: { main: '#ff9800' },
        info: { main: '#2196f3' },
        success: { main: '#4caf50' },
        },
        typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: { fontSize: '3rem', fontWeight: 700, color: 'text.primary' },
        h2: { fontSize: '2.5rem', fontWeight: 700, color: 'text.primary' },
        h3: { fontSize: '2rem', fontWeight: 700, color: 'text.primary' },
        h4: { fontSize: '1.75rem', fontWeight: 600, color: 'text.primary' },
        h5: { fontSize: '1.5rem', fontWeight: 600, color: 'text.primary' },
        h6: { fontSize: '1.25rem', fontWeight: 600, color: 'text.primary' },
        body1: { fontSize: '1rem', lineHeight: 1.6, color: 'text.secondary' },
        body2: { fontSize: '0.875rem', lineHeight: 1.5, color: 'text.secondary' },
        button: { textTransform: 'none', fontWeight: 500 },
        },
        components: {
        MuiButton: {
            styleOverrides: {
            root: { borderRadius: 8 },
            containedPrimary: {
                color: '#fff', // Ensure white text on primary contained buttons
            },
            },
        },
        MuiCard: {
            styleOverrides: {
            root: { borderRadius: 12 },
            },
        },
        MuiPaper: {
            styleOverrides: {
            root: { borderRadius: 12 },
            },
        },
        MuiTextField: {
            styleOverrides: {
            root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
            },
        },
        MuiAppBar: {
            styleOverrides: {
            root: {
                borderRadius: 0,
                backgroundColor: '#fff', // White background for AppBar
                color: 'text.primary', // Dark text/icons for AppBar content
            },
            },
        },
        MuiToolbar: {
            styleOverrides: {
            root: {
                color: 'text.primary', // Ensure Toolbar content (icons/text) is dark
            },
            },
        },
        MuiDrawer: {
            styleOverrides: {
            paper: {
                borderRadius: 0,
                backgroundColor: '#fff', // White background for Drawer paper
                color: 'text.primary', // Dark text/icons for Drawer content
            },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
            root: {
                color: 'text.primary', // Default color for list item text/icons
                '&:hover': {
                backgroundColor: 'rgba(148, 47, 0, 0.1)', // Light translucent hover
                },
            },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
            root: {
                color: 'inherit', // Icons inherit color from parent ListItemButton
            },
            },
        },
    },
});


const Main_App_Content = () => {
    const { loading, user } = useAuth(); // Get user from useAuth
    const [sidebar_open, set_sidebar_open] = useState(true);

    const toggle_sidebar = () => {
        set_sidebar_open(!sidebar_open);
    };

    if (loading) {
        return <Full_Screen_Loading message="Initializing application..." />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
            {/* Header now receives user object for conditional rendering */}
            <Header 
                drawer_width_collapsed={drawer_width_collapsed} 
                drawer_width_expanded={drawer_width_expanded} 
                sidebar_open={sidebar_open}
                toggle_sidebar={toggle_sidebar}
                user={user} // Pass user object
            />
            
            <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px' }}>
                {/* Sidebar component only rendered if user is logged in */}
                {user && (
                    <Sidebar 
                        drawer_width_collapsed={drawer_width_collapsed} 
                        drawer_width_expanded={drawer_width_expanded} 
                        sidebar_open={sidebar_open}
                    />
                )}
                
                {/* Main content area, offset by sidebar width and transitions */}
                <Box 
                    component="main" 
                    sx={{ 
                        flexGrow: 1, 
                        py: 4, 
                        px: 2, 
                        overflowX: 'hidden',
                        // Offset main content only if user is logged in and sidebar is open/collapsed
                        m: { md: "auto" },
                        transition: (theme) => theme.transitions.create(['margin', 'width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        // Width calculation also depends on sidebar visibility
                        width: { md: user ? (sidebar_open ? `calc(100% - ${drawer_width_expanded}px)` : `calc(100% - ${drawer_width_collapsed}px)`) : '100%' },
                    }}
                >
                    <Suspense fallback={<Full_Screen_Loading message="Loading page..." />}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home_Page />} />
                            <Route path="/articles/:id" element={<Article_Details_Page />} />
                            <Route path="/users/:id" element={<User_Profile_Page />} />
                            <Route path="/login" element={<Login_Page />} />
                            <Route path="/register" element={<Registration_Page />} />

                            {/* Protected User Routes */}
                            <Route path="/dashboard" element={
                                <Protected_Route>
                                    <Dashboard_Page />
                                </Protected_Route>
                            } />
                            <Route path="/create-article" element={
                                <Protected_Route>
                                    <Create_Article_Page />
                                </Protected_Route>
                            } />
                                <Route path="/edit-article/:id" element={
                                    <Protected_Route>
                                        <Edit_Article_Page />
                                    </Protected_Route>
                                } />
                            <Route path="/account-management" element={
                                <Protected_Route>
                                    <Account_Management_Page />
                                </Protected_Route>
                            } />
                            
                            {/* 404 Route */}
                            <Route path="*" element={<h1>404: Page Not Found</h1>} />
                        </Routes>
                    </Suspense>
                </Box>
            </Box>
            {/* Footer also depends on user and sidebar state */}
            <Footer 
                drawer_width_collapsed={drawer_width_collapsed} 
                drawer_width_expanded={drawer_width_expanded} 
                sidebar_open={sidebar_open}
                user={user} // Pass user object
            />
        </Box>
    );
};

export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Error_Boundary>
                    <Auth_Provider>
                        <Main_App_Content />
                    </Auth_Provider>
                </Error_Boundary>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
```

## API Layer

### api/index.js
```jsx
const api_url = import.meta.env.VITE_API_URL;

export const api_request = async (endpoint, method = "GET", body = null, token = null) =>
{
    const headers = { "Content-Type": "application/json" };

    if (token)
        headers["Authorization"] = `Bearer ${token}`;
    
    const options = { method, headers };

    if (body)
        options.body = JSON.stringify(body);
    
    const response = await fetch(`${api_url}${endpoint}`, options);

    const content_type = response.headers.get('content-type');
    if (content_type && content_type.includes('application/json'))
    {
        const data = await response.json();

        if (!response.ok)
        {
            if (response.status === 400 && data.errors && data.errors.length > 0)
            {
                const validation_errors = data.errors.map(err => err.msg).join('; ');
                throw new Error(validation_errors);
            }
            throw new Error(data.message || "An error occurred");
        }

        return data;
    }
    else
    {
        const text_data = await response.text();
        throw new Error(`Server responded with non-JSON content (Status: ${response.status}): ${text_data.substring(0, 100)}...`);
    }
};
```

## Context

### context/Auth_Context.jsx
```jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import { api_request } from "../api";
import { useNavigate } from 'react-router-dom';

const Auth_Context = createContext(null);

export const Auth_Provider = ({ children }) =>
{
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        [token, navigate]
    );

    const login = async (uid, password) =>
    {
        try
        {
            const data = await api_request("/api/auth/login", "POST", { uid, password });
            setToken(data.token);
            localStorage.setItem("authToken", data.token);
            const user_profile_data = await api_request("/api/users/profile", "GET", null, data.token);
            setUser(user_profile_data.user);
            return { success: true };
        }
        catch(error)
        {
            console.error("Login failed in AuthContext:", error);
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            throw error;
        }
    };

    const register = async (username, email, password) =>
    {
        try
        {
            const data = await api_request("/api/auth/register", "POST", { username, email, password });
            setToken(data.token);
            localStorage.setItem("authToken", data.token);
            const user_profile_data = await api_request("/api/users/profile", "GET", null, data.token);
            setUser(user_profile_data.user);
            return { success: true };
        }
        catch(error)
        {
            console.error("Registration failed in AuthContext:", error);
            setUser(null);
            setToken(null);
            localStorage.removeItem("authToken");
            throw error;
        }
    };
    
    const logout = () =>
    {
        api_request("/api/auth/logout", "POST", null, token)
            .then(() =>
                {
                    console.log("Logout successful");
                    setToken(null);
                    localStorage.removeItem("authToken");
                    setUser(null);
                    navigate('/');
                }
            )
            .catch(err =>
                {
                    console.error("Logout failed:", err);
                    setToken(null);
                    localStorage.removeItem("authToken");
                    setUser(null);
                    navigate('/');
                }
            );
    };

    const value = { user, token, loading, login, register, logout };

    return <Auth_Context.Provider value={value}>{children}</Auth_Context.Provider>;
};

export default Auth_Context;
```

## Hooks

### hooks/useAuth.js
```jsx
import { useContext } from "react";

import Auth_Context from "../context/Auth_Context";

export const useAuth = () =>
{
    const context = useContext(Auth_Context);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
};
```

## Components

### Auth Components

#### components/auth/Login_Form.jsx
```jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';

export const Login_Form = () =>
{
    const [uid, set_uid] = useState("");
    const [password, set_password] = useState("");
    const [loading, set_loading] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handle_login = async (e) =>
    {
        e.preventDefault();
        set_loading(true);
        try
        {
            await login(uid, password);
            set_snackbar_message('Login successful!');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            navigate('/dashboard');
        }
        catch(error)
        {
            set_snackbar_message(error.message);
            set_snackbar_severity('error');
            set_open_snackbar(true);
        }
        finally
        {
            set_loading(false);
        }
    };

    const handle_close_snackbar = () =>
    {
        set_open_snackbar(false);
    };

