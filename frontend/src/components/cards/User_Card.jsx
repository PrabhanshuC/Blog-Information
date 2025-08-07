import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Person as PersonIconOutlined } from '@mui/icons-material';

export const User_Card = ({ user_profile }) =>
{
  const get_excerpt = (text, char_limit = 80) =>
  {
    if (!text) return 'No bio available.';

    text = text.trim();

    if (text.length > char_limit)
        return text.substring(0, char_limit) + '...';
    
    return text;
  };

  const truncate_username = (username, char_limit = 20) => {
    if (!username) return '';
    if (username.length > char_limit) {
      return username.substring(0, char_limit) + '...';
    }
    return username;
  };

  return (
    <Card 
      raised 
      sx={{ 
        height: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: `0px 2px 4px -1px rgba(102, 56, 0, 0.2), 0px 4px 5px 0px rgba(102, 56, 0, 0.14), 0px 1px 10px 0px rgba(102, 56, 0, 0.12)`,
        transition: 'box-shadow 0.2s', 
        '&:hover': { boxShadow: `0px 5px 5px -3px rgba(102, 56, 0, 0.3), 0px 8px 10px 1px rgba(102, 56, 0, 0.2), 0px 3px 14px 2px rgba(102, 56, 0, 0.18)`, cursor: 'pointer' }, 
        width: '100%', 
        maxWidth: '300px', // Set a max-width for user cards
        position: 'relative' 
      }}
    >
      <Link to={`/users/${user_profile._id}`} style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          textDecoration: 'none', 
          zIndex: 1 
      }} aria-label={`View ${user_profile.username}'s profile`}></Link>

      <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', alignItems: 'center' }}>
        <PersonIconOutlined sx={{ fontSize: 40, color: 'primary.main', mr: 2, zIndex: 2 }} />
        <Box sx={{ flexGrow: 1, zIndex: 2 }}>
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    fontWeight: 'bold', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap', 
                    minHeight: '1.5em',
                    color: 'text.primary'
                }}
            >
                {truncate_username(user_profile.username, 20)}
            </Typography>
            <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 1, 
                    WebkitBoxOrient: 'vertical',
                    minHeight: '1.5em' 
                }}
            >
                {get_excerpt(user_profile.about, 80)}
            </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
