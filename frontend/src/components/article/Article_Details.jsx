import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';

import { api_request } from '../../api';

export const Article_Details = () =>
{
    const { id } = useParams();
    const [article, set_article] = useState(null);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);

    useEffect(() =>
    {
        const fetch_article = async () =>
        {
            set_loading(true);
            try
            {
                const data = await api_request(`/api/articles/${id}`);
                set_article(data);
            }
            catch (err)
            {
                set_error(err.message);
            }
            finally
            {
                set_loading(false);
            }
        };
        fetch_article();
    }, [id]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!article) return <Alert severity="error">Article not found.</Alert>;

    return (
        <>
            <Box sx={{ mb: 2 }}>
                <Button variant="outlined" component={Link} to="/">Back to articles</Button>
            </Box>
            <Typography variant="h3" gutterBottom>{article.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                By {article.author.username} | {new Date(article.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
                {article.content}
            </Typography>
        </>
    );
};
