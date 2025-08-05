import React from 'react';
import { Container, Card, CardContent } from '@mui/material';

import { Registration_Form } from '../components/auth/Registration_Form';

export const Register_Page = () =>
{
    return (
        <Container maxWidth="sm">
            <Card raised sx={{ mt: 5, p: 3 }}>
                <CardContent>
                    <Registration_Form />
                </CardContent>
            </Card>
        </Container>
    );
};