import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Grid,
    CircularProgress,
    Typography,
    Alert,
    Paper,
    Button,
    Collapse,
    InputAdornment
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';

import { Article_Card } from './Article_Card';
import { api_request } from '../../api';

export const Article_Search = () =>
{
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);
    
    const [search_query, set_search_query] = useState('');
    const [author_username_filter, set_author_username_filter] = useState('');
    const [tags_filter, set_tags_filter] = useState('');
    const [start_date_filter, set_start_date_filter] = useState('');
    const [end_date_filter, set_end_date_filter] = useState('');
    const [show_filters, set_show_filters] = useState(false);

    const fetch_articles = async (params = {}) =>
    {
        set_loading(true);
        set_error(null); // Clear previous errors before new fetch
        try
        {
        const query_string = new URLSearchParams(params).toString();
        const endpoint = query_string ? `/api/articles/search?${query_string}` : '/api/articles';
        const data = await api_request(endpoint);
        set_articles(data);
        }
        catch (err)
        {
        if (err.message.includes("404")) { // No articles found is not a critical error
            set_articles([]);
        } else {
            set_error(err.message);
        }
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

    const handle_search_and_filter = () => {
        const params = {};
        if (search_query) params.q = search_query;
        if (author_username_filter) params.author_username = author_username_filter;
        if (tags_filter) params.tags = tags_filter;
        if (start_date_filter) params.start_date = start_date_filter;
        if (end_date_filter) params.end_date = end_date_filter;

        fetch_articles(params);
    };

    const handle_clear_filters = () => {
        set_search_query('');
        set_author_username_filter('');
        set_tags_filter('');
        set_start_date_filter('');
        set_end_date_filter('');
        fetch_articles(); // Fetch all articles again
    };

    return (
        <>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4, mt: 2 }}>
            {/* Main Search Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
                fullWidth
                label="Search articles by title or content"
                variant="outlined"
                value={search_query}
                onChange={(e) => set_search_query(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handle_search_and_filter(); }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={handle_search_and_filter} edge="end" aria-label="perform search">
                        <SearchIcon />
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
            <IconButton onClick={() => set_show_filters(!show_filters)} sx={{ ml: 1 }} aria-label="toggle filters">
                <FilterListIcon fontSize="large" color={show_filters ? 'primary' : 'inherit'} />
            </IconButton>
            </Box>

            {/* Collapsible Filters */}
            <Collapse in={show_filters}>
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Advanced Filters</Typography>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Author Username"
                    variant="outlined"
                    value={author_username_filter}
                    onChange={(e) => set_author_username_filter(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Tags (comma-separated)"
                    variant="outlined"
                    value={tags_filter}
                    onChange={(e) => set_tags_filter(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={start_date_filter}
                    onChange={(e) => set_start_date_filter(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={end_date_filter}
                    onChange={(e) => set_end_date_filter(e.target.value)}
                    />
                </Grid>
                </Grid>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={handle_clear_filters} startIcon={<ClearIcon />}>
                    Clear Filters
                </Button>
                <Button variant="contained" onClick={handle_search_and_filter} startIcon={<SearchIcon />}>
                    Apply Filters
                </Button>
                </Box>
            </Paper>
            </Collapse>
        </Box>

        {/* Conditional Rendering for Loading, Error, or Articles */}
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
        ) : error ? (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : (
            <Paper elevation={0} sx={{ p: { xs: 1, md: 2 }, minHeight: '400px' }}>
            <Grid container spacing={3}>
                {articles.length > 0 ? (
                articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article._id}>
                    <Article_Card article={article} />
                    </Grid>
                ))
                ) : (
                <Grid item xs={12}>
                    <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '300px', 
                    py: 4, 
                    textAlign: 'center' 
                    }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No articles found.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Adjust your search or filter criteria.
                    </Typography>
                    </Box>
                </Grid>
                )}
            </Grid>
            </Paper>
        )}
        </>
    );
};
