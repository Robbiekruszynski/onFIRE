import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const Linktree = () => {
  const links = [
    { title: 'My Portfolio', url: 'https://www.my-portfolio.com' },
    { title: 'GitHub', url: 'https://github.com/username' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/username/' },
    // Add more links as needed
  ];

  const angledButtonStyle = {
    margin: '10px 0',
    clipPath: 'polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)',
    WebkitClipPath: 'polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)', // For Safari
    width: '100%', // To ensure the wrapper takes the full width
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Links
      </Typography>
      {links.map((link, index) => (
        <span key={index} style={angledButtonStyle}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open(link.url, '_blank')}
          >
            {link.title}
          </Button>
        </span>
      ))}
    </Container>
  );
};

export default Linktree;

