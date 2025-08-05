import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { Auth_Provider } from './context/Auth_Context';
import { Protected_Route } from './components/auth/Protected_Route';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home_Page } from './pages/Home_Page';
import { Login_Page } from './pages/Login_Page';
import { Register_Page } from './pages/Registration_Page';
import { Dashboard_Page } from './pages/Dashboard_Page';
import { Article_Details_Page } from './pages/Article_Details_Page';
import { Create_Article_Page } from './pages/Create_Article_Page';

export const App = () =>
{
    return (
        <Auth_Provider>
            <CssBaseline />
            <BrowserRouter>
                <div className="app-container">
                    <Header />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home_Page />} />
                        <Route path="/articles/:id" element={<Article_Details_Page />} />
                        <Route path="/login" element={<Login_Page />} />
                        <Route path="/register" element={<Register_Page />} />

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
                        
                        {/* 404 Route */}
                        <Route path="*" element={<h1>404: Page Not Found</h1>} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </Auth_Provider>
    );
}

export default App;
