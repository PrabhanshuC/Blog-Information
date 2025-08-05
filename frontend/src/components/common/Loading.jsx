import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = ({ message = "Loading...", size = 40 }) =>
{
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
            gap={2}
        >
            <CircularProgress size={size} />
            <Typography variant="body1" color="text.secondary">
            {message}
            </Typography>
        </Box>
    );
};

export const FullScreenLoading = ({ message = "Loading..." }) =>
{
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            flexDirection="column"
            gap={2}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" color="text.secondary">
            {message}
            </Typography>
        </Box>
    );
};
