import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';

export const Login_Form = () =>
{
    // Change 'email' state to 'uid' to reflect the backend change
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
            const data = await api_request("/api/auth/login", "POST", { uid, password });
            login(data.token);
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

    return (
        <Box component="form" onSubmit={handle_login} noValidate sx={{ mt: 1, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography component="h1" variant="h5" align="center">
                Login
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="uid" // Changed ID to uid
                label="Username or Email Address" // Updated label
                name="uid" // Changed name to uid
                autoComplete="username email" // Updated autocomplete
                autoFocus
                value={ uid }
                onChange={ (e) => set_uid(e.target.value) } // Updated state setter
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ password }
                onChange={(e) => set_password(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Typography variant="body2" align="center">
                New to our platform? Create an account <Link to="/register">here</Link>
            </Typography>
            <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                    {snackbar_message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
