import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import { Auth_Provider } from './context/Auth_Context';
import { Protected_Route } from './components/auth/Protected_Route';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home_Page } from './pages/Home_Page';
import { Login_Page } from './pages/Login_Page';
import { Register_Page } from './pages/Registration_Page';
import { Dashboard_Page } from './pages/Dashboard_Page';
import { Account_Settings_Page } from './pages/Account_Settings_Page';
import { User_Profile_Page } from './pages/User_Profile_Page';
import { Create_Article_Page } from './pages/Create_Article_Page';
import { Article_Details_Page } from './pages/Article_Details_Page';
import { Edit_Article_Page } from './pages/Edit_Article_Page';

export const App = () =>
{
    return (
        <Auth_Provider>
            <CssBaseline />
            <BrowserRouter>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <Box component="main" sx={{ flexGrow: 1, py: 4 }}> {/* Added flexGrow and padding */}
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home_Page />} />
                            <Route path="/articles/:id" element={<Article_Details_Page />} />
                            <Route path="/users/:id" element={<User_Profile_Page />} />
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
                            <Route path="/edit-article/:id" element={
                                <Protected_Route>
                                    <Edit_Article_Page />
                                </Protected_Route>
                            } />
                            <Route path="/account-settings" element={
                                <Protected_Route>
                                    <Account_Settings_Page />
                                </Protected_Route>
                            } />
                            
                            {/* 404 Route */}
                            <Route path="*" element={<h1>404: Page Not Found</h1>} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </BrowserRouter>
        </Auth_Provider>
    );
}

export default App;
