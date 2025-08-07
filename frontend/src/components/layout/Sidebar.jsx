import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Toolbar // Import Toolbar to push content below AppBar
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
    Home as HomeIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Login as LoginIcon,
    HowToReg as HowToRegIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ drawer_width_collapsed, drawer_width_expanded, sidebar_open }) => {
    const { user, logout } = useAuth();

    // Only render sidebar if user is logged in
    if (!user) {
        return null;
    }

    const nav_list_items = (
        <List>
            <ListItem 
                button 
                component={Link} 
                to="/"
            >
                <ListItemIcon sx={{ color: 'primary.contrastText' }}><HomeIcon /></ListItemIcon>
                {sidebar_open && <ListItemText primary="Home" sx={{ color: 'primary.contrastText' }} />}
            </ListItem>
            {user && ( // Ensure these are only for logged-in user
                <>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/dashboard"
                    >
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><PersonIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Dashboard" sx={{ color: 'primary.contrastText' }} />}
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/create-article"
                    >
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><AddIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Create Article" sx={{ color: 'primary.contrastText' }} />}
                    </ListItem>
                    <ListItem 
                        button 
                        component={Link} 
                        to="/account-management"
                    >
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><SettingsIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Account Management" sx={{ color: 'primary.contrastText' }} />}
                    </ListItem>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                    <ListItem 
                        button 
                        onClick={logout}
                    >
                        <ListItemIcon sx={{ color: 'primary.contrastText' }}><LogoutIcon /></ListItemIcon>
                        {sidebar_open && <ListItemText primary="Logout" sx={{ color: 'primary.contrastText' }} />}
                    </ListItem>
                </>
            )}
        </List>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: sidebar_open ? drawer_width_expanded : drawer_width_collapsed,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: sidebar_open ? drawer_width_expanded : drawer_width_collapsed,
                    boxSizing: 'border-box',
                    transition: (theme) => theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    overflowX: 'hidden',
                    display: { xs: 'none', md: 'block' },
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 0,
                },
            }}
            open={sidebar_open}
        >
            <Toolbar />
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            {nav_list_items}
        </Drawer>
    );
};