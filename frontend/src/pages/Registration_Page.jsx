import React from 'react';
import { Container, Paper } from '@mui/material';

import { Register_Form } from '../components/auth/Registration_Form';

export const Register_Page = () =>
{
    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, mt: 5, borderRadius: 2 }}>
                <Register_Form />
            </Paper>
        </Container>
    );
};
