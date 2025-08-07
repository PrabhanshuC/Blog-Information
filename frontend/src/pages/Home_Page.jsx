import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Grid,
  CircularProgress,
  Typography,
  Alert,
  Container,
  Paper,
  Button,
  Collapse,
  InputAdornment,
  Divider,
  Stack
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Article_Card } from '../components/cards/Article_Card';
import { User_Card } from '../components/cards/User_Card';
import { api_request } from '../api';
import { Loading } from '../components/feedback/Loading';

const Home_Page = () =>
{
  const [articles, set_articles] = useState([]);
  const [users, set_users] = useState([]);
  const [loading, set_loading] = useState(true);
  const [error, set_error] = useState(null);
  
  const [search_query, set_search_query] = useState('');
  const [author_username_filter, set_author_username_filter] = useState('');
  const [tags_filter, set_tags_filter] = useState('');
  const [start_date_filter, set_start_date_filter] = useState('');
  const [end_date_filter, set_end_date_filter] = useState('');
  const [show_filters, set_show_filters] = useState(false);

  const perform_search = async (query = '', filter_params = {}) =>
  {
    set_loading(true);
    set_error(null);
    set_articles([]);
    set_users([]);

    try
    {
      const params = {};
      if (query) params.q = query;
      if (filter_params.author_username) params.author_username = filter_params.author_username;
      if (filter_params.tags) params.tags = filter_params.tags;
      if (filter_params.start_date) params.start_date = filter_params.start_date;
      if (filter_params.end_date) params.end_date = filter_params.end_date;

      const query_string = new URLSearchParams(params).toString();
      
      let data;
      if (!query_string) { 
        data = await api_request('/api/articles');
        set_articles(data);
        set_users([]); 
      } else { 
        data = await api_request(`/api/search?${query_string}`);
        set_articles(data.articles || []);
        set_users(data.users || []);
        if (data.articles.length === 0 && data.users.length === 0) {
          set_error("No results found matching your query or filter criteria.");
        }
      }
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
    perform_search();
  }, []);

  const handle_search_and_filter_submit = () => {
    const filter_params = {};
    if (author_username_filter) filter_params.author_username = author_username_filter;
    if (tags_filter) filter_params.tags = tags_filter;
    if (start_date_filter) filter_params.start_date = start_date_filter;
    if (end_date_filter) filter_params.end_date = end_date_filter;

    perform_search(search_query, filter_params);
  };

  const handle_clear_filters = () => {
    set_search_query('');
    set_author_username_filter('');
    set_tags_filter('');
    set_start_date_filter('');
    set_end_date_filter('');
    set_show_filters(false);
    perform_search();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            label="Search articles or users"
            variant="outlined"
            value={search_query}
            onChange={(e) => set_search_query(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handle_search_and_filter_submit(); }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handle_search_and_filter_submit} edge="end" aria-label="perform search">
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

        <Collapse in={show_filters}>
          <Paper elevation={1} sx={{ p: 2, mb: 2, boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)` }}>
            <Typography variant="subtitle1" gutterBottom color="text.primary">Advanced Article Filters</Typography>
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
              <Button variant="contained" onClick={handle_search_and_filter_submit} startIcon={<SearchIcon />}>
                Apply Filters
              </Button>
            </Box>
          </Paper>
        </Collapse>
      </Box>

      {loading ? (
        <Loading message="Fetching results..." />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : (
        <Paper elevation={0} sx={{ p: { xs: 1, md: 2 }, minHeight: '400px' }}>
          {users.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }} color="text.primary">
                Users ({users.length})
              </Typography>
              <Stack spacing={2}>
                {users.map((user_profile) => (
                  <User_Card key={user_profile._id} user_profile={user_profile} />
                ))}
              </Stack>
              <Divider sx={{ my: 4 }} />
            </Box>
          )}

          {articles.length > 0 && (
            <Box>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }} color="text.primary">
                Articles ({articles.length})
              </Typography>
              <Stack spacing={2}>
                {articles.map((article) => (
                  <Article_Card key={article._id} article={article} />
                ))}
              </Stack>
            </Box>
          )}

          {articles.length === 0 && users.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '300px', 
                py: 4, 
                textAlign: 'center',
                backgroundColor: (theme) => theme.palette.grey[50], 
                borderRadius: 1,
                border: '1px dashed',
                borderColor: (theme) => theme.palette.grey[300],
                color: (theme) => theme.palette.text.secondary
              }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No results found.
                </Typography>
                <Typography variant="body1">
                  Try a different search query or adjust your filters.
                </Typography>
              </Box>
            </Grid>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default Home_Page;
