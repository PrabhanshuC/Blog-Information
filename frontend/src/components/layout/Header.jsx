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
    Divider,
    TextField, // Import TextField for search bar
    InputAdornment // Import InputAdornment for search icon
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
    Logout as LogoutIcon,
    Person as PersonIcon,
    Add as AddIcon,
    Settings as SettingsIcon,
    Menu as MenuIcon,
    Home as HomeIcon,
    Login as LoginIcon,
    HowToReg as HowToRegIcon,
    Search as SearchIcon, // Import SearchIcon
    ChevronLeft as ChevronLeftIcon, // ADDED IMPORT
    ChevronRight as ChevronRightIcon // ADDED IMPORT
} from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';

export const Header = ({ drawer_width_collapsed, drawer_width_expanded, sidebar_open, toggle_sidebar, user }) => // Receive user
{
    const { logout } = useAuth();
    const navigate = useNavigate(); // Get navigate for search
    const [mobile_drawer_open, set_mobile_drawer_open] = useState(false);
    const [header_search_query, set_header_search_query] = useState(''); // State for header search bar

    const toggle_mobile_drawer = (open) => (event) =>
    {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        set_mobile_drawer_open(open);
    };

    const handle_header_search_submit = () => {
        if (header_search_query.trim()) {
            navigate(`/?q=${encodeURIComponent(header_search_query.trim())}`); // Navigate to home page with search query
            set_header_search_query(''); // Clear search bar after submit
        } else {
            navigate('/'); // Navigate to home page to show all articles if search is empty
        }
    };

    const mobile_nav_list_items = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggle_mobile_drawer(false)}
            onKeyDown={toggle_mobile_drawer(false)}
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
                        <ListItem button component={Link} to="/account-management">
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Account Management" />
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
        <AppBar 
            position="fixed" 
            sx={{ 
                boxShadow: 3,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                width: '100%', 
                ml: 0, 
            }}
        >
            <Toolbar sx={{ 
                // Offset Toolbar content by sidebar width on desktop
                ml: { md: user ? (sidebar_open ? `${drawer_width_expanded}px` : `${drawer_width_collapsed}px`) : 0 },
                // Adjust Toolbar width based on sidebar state on desktop
                width: { md: user ? (sidebar_open ? `calc(100% - ${drawer_width_expanded}px)` : `calc(100% - ${drawer_width_collapsed}px)`) : '100%' },
                transition: (theme) => theme.transitions.create(['width', 'margin-left'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }}>
                {/* Sidebar Toggle Button (Desktop Only) - Left-most side */}
                {user && ( // Only show toggle if user is logged in
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
                        <IconButton
                            color="inherit"
                            aria-label="toggle sidebar"
                            onClick={toggle_sidebar}
                            edge="start"
                        >
                            {sidebar_open ? <ChevronLeftIcon /> : <MenuIcon />}
                        </IconButton>
                    </Box>
                )}

                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                    Sahayogi
                </Typography>

                {/* Search Bar (Always visible) */}
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={header_search_query}
                    onChange={(e) => set_header_search_query(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handle_header_search_submit(); }}
                    sx={{ 
                        mr: { xs: 1, md: 2 }, // Margin right
                        width: { xs: '150px', sm: '200px', md: '300px' }, // Responsive width
                        backgroundColor: 'rgba(255, 230, 200)', // Slightly transparent background
                        borderRadius: 1,
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent !important' }, // Hide border
                        '& .MuiInputBase-input::placeholder': { color: 'rgba(102, 56, 0, 0.7)' }, // Placeholder color
                        '& .MuiInputBase-input': { color: 'rgba(102, 56, 0)' }, // Input text color
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'rgba(102, 56, 0)' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Desktop Navigation (if not logged in) / Mobile Hamburger */}
                {user ? (
                    // Mobile Hamburger for logged-in user
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggle_mobile_drawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={mobile_drawer_open}
                            onClose={toggle_mobile_drawer(false)}
                        >
                            {mobile_nav_list_items}
                        </Drawer>
                    </Box>
                ) : (
                    // Desktop Links for visitors
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};
