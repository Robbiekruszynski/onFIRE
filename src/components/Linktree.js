import React, { useEffect } from 'react';
import { Button, Container, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import caronImage from '../assets/images/caron.png';
import './Linktree.css';

const Linktree = () => {
  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const links = [
    { title: 'Telegram', url: 'https://t.me/caronfire', background: 'linear-gradient(45deg, #009688 30%, #4db6ac 90%)' },
    { title: 'Twitter', url: 'https://twitter.com/caronfiree', background: 'linear-gradient(45deg, #009688 30%, #4db6ac 90%)' },
   { title: 'GitHub', url: 'https://github.com/CaronSch', background: 'linear-gradient(45deg, #009688 30%, #4db6ac 90%)' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/caronschaller/', background: 'linear-gradient(45deg, #009688 30%, #4db6ac 90%)' },
  ];

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        style={{ color: 'white' }}
      >
        <Avatar alt="Profile Photo" src={caronImage} />
        <Typography variant="h4" component="h1" gutterBottom>
          CarOnFire
        </Typography>
        {links.map((link, index) => (
          <Box mt={3} width={1 / 2} key={index}>
            <Button
              className="gradient-button"  // Add this line
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => window.open(link.url, '_blank')}
            >
              {link.title}
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Linktree;




