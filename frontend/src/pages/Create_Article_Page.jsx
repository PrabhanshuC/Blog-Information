import React from 'react';
import { Container } from '@mui/material';

import { Create_Article_Form } from '../components/article/Create_Article_Form';

export const Create_Article_Page = () =>
{
    return (
        <Container maxWidth="md">
            <Create_Article_Form />
        </Container>
    );
};
