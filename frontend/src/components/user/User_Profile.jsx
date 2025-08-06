import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert, Paper, Divider, Grid } from '@mui/material';
import { GitHub as GitHubIcon, Public as PublicIcon } from '@mui/icons-material';

import { api_request } from '../../api';
import { Article_Card } from '../article/Article_Card'; // Import Article_Card

export const User_Profile = () =>
{
    const { id } = useParams();
    const [profile, set_profile] = useState(null);
    const [articles, set_articles] = useState([]); // State for user's articles
    const [loading_profile, set_loading_profile] = useState(true);
    const [loading_articles, set_loading_articles] = useState(true);
    const [error_profile, set_error_profile] = useState(null);
    const [error_articles, set_error_articles] = useState(null);

    // Effect to fetch user profile
    useEffect(() => {
        const fetch_user_profile = async () => {
        set_loading_profile(true);
        set_error_profile(null);
        try {
            const data = await api_request(`/api/users/${id}`, 'GET');
            set_profile(data.user);
        } catch (err) {
            set_error_profile(err.message);
        } finally {
            set_loading_profile(false);
        }
        };
        fetch_user_profile();
    }, [id]);

    // Effect to fetch user's articles
    useEffect(() => {
        const fetch_user_articles = async () => {
        set_loading_articles(true);
        set_error_articles(null);
        try {
            const data = await api_request(`/api/users/${id}/public-articles`, 'GET');
            set_articles(data);
        } catch (err) {
            if (err.message.includes("404")) { // No articles found is not an error
            set_articles([]);
            } else {
            set_error_articles(err.message);
            }
        } finally {
            set_loading_articles(false);
        }
        };
        fetch_user_articles();
    }, [id]);

    if (loading_profile || loading_articles)
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

    if (error_profile) return <Alert severity="error" sx={{ mt: 2 }}>{error_profile}</Alert>;
    if (!profile) return <Alert severity="warning" sx={{ mt: 2 }}>User profile not found.</Alert>;

    return (
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            {profile.username}'s Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>About</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {profile.about || 'No information provided.'}
            </Typography>
            {profile.github && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GitHubIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                    <Link href={profile.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    GitHub Profile
                    </Link>
                </Typography>
                </Box>
            )}
            {profile.website && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body1">
                    <Link href={profile.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Personal Website
                    </Link>
                </Typography>
                </Box>
            )}
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Articles by {profile.username}
            </Typography>
            {error_articles ? (
            <Alert severity="error" sx={{ mt: 2 }}>{error_articles}</Alert>
            ) : (
            <Grid container spacing={3}>
                {articles.length > 0 ? (
                articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article._id}>
                    <Article_Card article={article} />
                    </Grid>
                ))
                ) : (
                <Grid item xs={12}>
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        This user hasn't published any articles yet.
                    </Typography>
                    </Box>
                </Grid>
                )}
            </Grid>
            )}
        </Paper>
    );
};
