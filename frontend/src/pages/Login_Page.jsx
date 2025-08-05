import React from 'react';
import { Container, Card, CardContent } from '@mui/material';

import { Login_Form } from '../components/auth/Login_Form';

export const Login_Page = () =>
{
    return (
        <Container maxWidth="sm">
            <Card raised sx={{ mt: 5, p: 3 }}>
                <CardContent>
                    <Login_Form />
                </CardContent>
            </Card>
        </Container>
    );
};