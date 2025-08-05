import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Grid,
    CircularProgress,
    Typography,
    Alert
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { Article_Card } from './Article_Card';
import { api_request } from '../../api';

export const Article_Search = () =>
{
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);
    const [search_query, set_search_query] = useState('');

    const fetch_articles = async () =>
    {
        set_loading(true);
        try
        {
            const data = await api_request('/api/articles');
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
    };

    useEffect(() =>
    {
        fetch_articles();
    }, []);

    const handle_search = async () =>
    {
        if (!search_query)
        {
            fetch_articles();
            return;
        }
        set_loading(true);
        try
        {
            const data = await api_request(`/api/articles/search?q=${search_query}`);
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
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <TextField
                fullWidth
                label="Search articles..."
                variant="outlined"
                value={search_query}
                onChange={(e) => set_search_query(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handle_search(); }}
                />
                <IconButton color="primary" onClick={handle_search} sx={{ ml: 1 }} aria-label="search">
                <SearchIcon />
                </IconButton>
            </Box>
            <Grid container spacing={3}>
                {articles.length > 0 ? (
                articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article._id}>
                    <Article_Card article={article} />
                    </Grid>
                ))
                ) : (
                <Grid item xs={12}>
                    <Typography variant="h6" align="center" color="text.secondary">No articles found.</Typography>
                </Grid>
                )}
            </Grid>
        </>
    );
};
