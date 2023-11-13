import React, { useEffect } from 'react';
import { Button, Container, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import caronImage from '../assets/images/caron.png';
import './Linktree.css';

const Linktree = () => {
    useEffect(() => {
        document.body.style.margin = 0;
        document.body.style.padding = 0;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.style.overflow = '';
        };
    }, []);

    const links = [
        { title: 'Telegram', url: 'https://t.me/caronfire' },
        { title: 'Twitter', url: 'https://twitter.com/caronfiree' },
        { title: 'GitHub', url: 'https://github.com/CaronSch' },
        { title: 'LinkedIn', url: 'https://www.linkedin.com/in/caronschaller/' },
    ];

    return (
        <>
            <div className="blurred-background"></div>
            <Container className="container-center">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                    style={{ color: 'white', position: 'relative', zIndex: 1 }}
                >
                    <Avatar 
                        className="glowing-avatar"
                        alt="Profile Photo" 
                        src={caronImage}
                        sx={{ width: '120px', height: '120px', marginBottom: '20px' }}  
                    />
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
        </>
    );
};

export default Linktree;




