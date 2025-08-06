import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
    Logout as LogoutIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Menu as MenuIcon,
    Home as HomeIcon,
    Login as LoginIcon,
    HowToReg as HowToRegIcon
} from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';

export const Header = () =>
{
    const { user, logout } = useAuth();
    const [drawer_open, set_drawer_open] = useState(false);

    const toggle_drawer = (open) => (event) =>
    {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        set_drawer_open(open);
    };

    const nav_links_desktop = user ? (
        <>
            <Button color="inherit" component={Link} to="/create-article" startIcon={<AddIcon />}>Create Article</Button>
            <IconButton color="inherit" component={Link} to="/dashboard" aria-label="dashboard">
                <PersonIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/account-settings" aria-label="account settings">
                <SettingsIcon />
            </IconButton>
            <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>Logout</Button>
        </>
    ) : (
        <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
        </>
    );

    const nav_list_items = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggle_drawer(false)}
            onKeyDown={toggle_drawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                {user ? (
                    <>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/create-article">
                            <ListItemIcon><AddIcon /></ListItemIcon>
                            <ListItemText primary="Create Article" />
                        </ListItem>
                        <ListItem button component={Link} to="/account-settings">
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Account Settings" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={logout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button component={Link} to="/login">
                            <ListItemIcon><LoginIcon /></ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={Link} to="/register">
                            <ListItemIcon><HowToRegIcon /></ListItemIcon>
                            <ListItemText primary="Register" />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                    Sahayogi
                </Typography>
                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                    {nav_links_desktop}
                </Box>
                {/* Mobile Navigation (Hamburger) */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggle_drawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="right"
                        open={drawer_open}
                        onClose={toggle_drawer(false)}
                    >
                        {nav_list_items}
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
