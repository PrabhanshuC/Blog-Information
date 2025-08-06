import React from 'react';
import { Container } from '@mui/material';

import { Account_Settings } from '../components/user/Account_Settings';

export const Account_Settings_Page = () =>
{
    return (
        <Container maxWidth="md">
            <Account_Settings />
        </Container>
    );
};
