import React, { useEffect } from 'react';
import { Button, Container, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import caronImage from '../assets/images/caron.png';
import backgroundImage from '../assets/images/m3.png';  
import './Linktree.css';

const Linktree = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.margin = 0;
    document.body.style.height = '100vh';
    document.body.style.width = '100%';
    return () => {
      document.body.style.backgroundImage = null;
      document.body.style.backgroundSize = null;
      document.body.style.backgroundPosition = null;
      document.body.style.margin = null;
      document.body.style.height = null;
      document.body.style.width = null;
    };
  }, []);

  const links = [
    { title: 'Telegram', url: 'https://t.me/caronfire' },
    { title: 'Twitter', url: 'https://twitter.com/caronfiree' },
    { title: 'GitHub', url: 'https://github.com/CaronSch' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/caronschaller/' },
  ];

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        minWidth="100vw"
        style={{ color: 'white' }}
      >
        <Avatar 
          alt="Profile Photo" 
          src={caronImage}
          sx={{ width: '120px', height: '120px', marginBottom: '20px' }}  
        />
        <Typography variant="h4" component="h1" gutterBottom color="black">
          CarOnFire
        </Typography>
        {links.map((link, index) => (
          <Box mt={3} width={1 / 3} key={index}>
            <Button
              className="angled-button"
              variant="contained"
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
