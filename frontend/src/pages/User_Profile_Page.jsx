import React from 'react';
import { Container } from '@mui/material';

import { User_Profile } from '../components/user/User_Profile';

export const User_Profile_Page = () =>
{
    return (
        <Container maxWidth="md">
            <User_Profile />
        </Container>
    );
};
