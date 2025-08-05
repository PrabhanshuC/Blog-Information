import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Grid,
    CircularProgress,
    Alert
} from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { api_request } from '../../api';
import { Article_Card } from '../article/Article_Card';

export const Dashboard = () =>
{
    const { user, token } = useAuth();
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);

    useEffect(() =>
    {
        const fetch_user_articles = async () =>
        {
            if (user && token)
            {
                set_loading(true);
                try
                {
                    const data = await api_request(`/api/users/${user._id}/articles`, 'GET', null, token);
                    set_articles(data);
                }
                catch (err)
                {
                    set_error(err.message);
                }
                finally
                {
                    set_loading(false);
                }
            }
        };

        fetch_user_articles();
    }, [user, token]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <Typography variant="h3" gutterBottom>
                Welcome, {user?.username || 'User'}
            </Typography>
            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                My Articles
            </Typography>
            <Grid container spacing={3}>
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <Grid item xs={12} sm={6} md={4} key={article._id}>
                            <Article_Card article={article} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary">You have not created any articles yet.</Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
};
