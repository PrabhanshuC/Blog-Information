import React from 'react';
import { Container } from '@mui/material';

import { Edit_Article } from '../components/article/Edit_Article';

export const Edit_Article_Page = () =>
{
    return (
        <Container maxWidth="md">
            <Edit_Article />
        </Container>
    );
};
