import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';

export const Create_Article_Form = () =>
{
    const navigate = useNavigate();
    const { token } = useAuth();
    const [title, set_title] = useState('');
    const [content, set_content] = useState('');
    const [loading, set_loading] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');

    const handle_submit = async (event) =>
    {
        event.preventDefault();
        set_loading(true);
        try
        {
            await api_request('/api/articles', 'POST', { title, content }, token);
            set_snackbar_message('Article created successfully!');
            set_snackbar_severity('success');
            set_open_snackbar(true);
            navigate('/');
        }
        catch (err)
        {
            set_snackbar_message(err.message);
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
        <Box component="form" onSubmit={handle_submit} noValidate sx={{ mt: 1, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography component="h1" variant="h5" align="center">
                Create New Article
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Article Title"
                name="title"
                autoFocus
                value={title}
                onChange={(e) => set_title(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="content"
                label="Article Content"
                name="content"
                multiline
                rows={10}
                value={content}
                onChange={(e) => set_content(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Publish Article'}
            </Button>
            <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                    {snackbar_message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
