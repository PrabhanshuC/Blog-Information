import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Logout as LogoutIcon, Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';

export const Header = () =>
{
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Sahayogi
                </Typography>
                {user ? (
                    <Box>
                        <Button color="inherit" component={Link} to="/create-article" startIcon={<AddIcon />}>Create Article</Button>
                        <IconButton color="inherit" component={Link} to="/dashboard">
                            <PersonIcon />
                        </IconButton>
                        <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>Logout</Button>
                    </Box>
                ) : (
                    <Box>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
