import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Article_Card = ({ article }) =>
{
    return (
        <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
            {article.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
            {article.content}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" component={Link} to={`/articles/${article._id}`}>Read More</Button>
        </CardActions>
        </Card>
    );
};