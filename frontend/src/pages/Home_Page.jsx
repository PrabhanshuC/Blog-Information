import React from 'react';
import { Container } from '@mui/material';

import { Article_Search } from '../components/article/Article_Search';

export const Home_Page = () =>
{
    return (
        <Container>
            <Article_Search />
        </Container>
    );
};
