import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box,
         Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
         Snackbar, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';

export const Article_Card = ({ article, is_dashboard_view = false, on_delete_success }) =>
{
    const { user, token } = useAuth();
    const is_author = user && article.author && article.author._id === user._id;

    const [open_delete_dialog, set_open_delete_dialog] = useState(false);
    const [deleting, set_deleting] = useState(false);
    const [open_snackbar, set_open_snackbar] = useState(false);
    const [snackbar_message, set_snackbar_message] = useState('');
    const [snackbar_severity, set_snackbar_severity] = useState('success');

    const handle_delete_confirm_open = () =>
    {
        set_open_delete_dialog(true);
    };

    const handle_delete_confirm_close = () =>
    {
        set_open_delete_dialog(false);
    };

    const handle_delete_article = async () =>
    {
        set_deleting(true);
        set_open_delete_dialog(false);
        try
        {
            await api_request(`/api/articles/${article._id}`, 'DELETE', null, token);
            set_snackbar_message("Article deleted successfully!");
            set_snackbar_severity('success');
            set_open_snackbar(true);
            on_delete_success(article._id);
        }
        catch(error)
        {
            console.error("Failed to delete article:", error);
            set_snackbar_message("Failed to delete article: " + error.message);
            set_snackbar_severity('error');
            set_open_snackbar(true);
        }
        finally
        {
            set_deleting(false);
        }
    };

    const handle_close_snackbar = (event, reason) =>
    {
        if (reason === 'clickaway') return;
        
        set_open_snackbar(false);
    };

    // Function to get a plain text excerpt, preserving some structure for readability
    const get_excerpt = (markdown_content, char_limit = 150) => {
        if (!markdown_content) return 'No content preview available.';

        // Remove common markdown syntax but keep line breaks for better readability
        let plain_text = markdown_content
            .replace(/#{1,6}\s/g, '') // Remove headings
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
            .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
            .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove code blocks/inline code
            .replace(/>\s/g, '') // Remove blockquotes
            .replace(/-\s/g, ''); // Remove list markers

        // Trim and truncate to character limit
        plain_text = plain_text.trim();
        if (plain_text.length > char_limit)
            return plain_text.substring(0, char_limit) + '...';
        
        return plain_text;
    };

    return (
        <Card raised sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: 3, 
        transition: 'transform 0.2s', 
        '&:hover': { transform: 'scale(1.03)' } ,
        width: '100%' // Ensure card takes full width of its Grid item
        }}>
            <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                {/* Title with ellipsis */}
                <Typography 
                gutterBottom 
                variant="h5" 
                component="div" 
                sx={{ 
                    fontWeight: 'bold', 
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, // Limit title to 2 lines
                    WebkitBoxOrient: 'vertical',
                    minHeight: '2.5em' // Ensure consistent height even for short titles
                }}
                >
                {article.title}
                </Typography>
                
                {/* Plain text excerpt with ellipsis and consistent height */}
                <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                    flexGrow: 1, // Allow content box to grow
                    lineHeight: 1.5,
                    minHeight: '4.5em', // Enforce minimum height for 3 lines (1.5 * 3 = 4.5)
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Limit description to 3 lines
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-wrap' // Preserve line breaks from excerpt
                }}
                >
                {get_excerpt(article.content, 150)} {/* Use the excerpt function */}
                </Typography>

                {article.author && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    By <Link to={`/users/${article.author._id}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>{article.author.username}</Link>
                </Typography>
                )}
            </CardContent>
            <CardActions sx={{ px: 3, pb: 2, justifyContent: 'space-between' }}>
                <Button size="small" component={Link} to={`/articles/${article._id}`} variant="contained">Read More</Button>
                {is_dashboard_view && is_author && (
                <Box>
                    <Button size="small" component={Link} to={`/edit-article/${article._id}`} variant="outlined" sx={{ mr: 1 }}>Edit</Button>
                    <Button size="small" color="error" variant="outlined" onClick={handle_delete_confirm_open}>Delete</Button>
                </Box>
                )}
            </CardActions>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={open_delete_dialog}
                onClose={handle_delete_confirm_close}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    Are you sure you want to permanently delete this article? This action cannot be undone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handle_delete_confirm_close}>Cancel</Button>
                <Button onClick={handle_delete_article} color="error" autoFocus disabled={deleting}>
                    {deleting ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
                </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar open={open_snackbar} autoHideDuration={6000} onClose={handle_close_snackbar}>
                <Alert onClose={handle_close_snackbar} severity={snackbar_severity} sx={{ width: '100%' }}>
                {snackbar_message}
                </Alert>
            </Snackbar>
        </Card>
    );
};
