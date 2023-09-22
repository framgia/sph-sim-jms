'use client';

import { Box, Container } from '@mui/material';
import { Open_Sans } from 'next/font/google';
import { FC, useState } from 'react';

import Header from '@/components/organisms/Header';
import NavBar from '@/components/organisms/Navbar';

const openSansFont = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

interface Props {
  children: React.ReactNode;
}

export const Wrapper: FC<Props> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  let isOpen = true;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    isOpen = !isOpen;
  };

  return (
    <Box
      className={openSansFont.className}
      component={'body'}
      sx={{
        margin: 0,
        backgroundColor: 'background-primary'
      }}>
      <Header />
      <Box display={'flex'}>
        <NavBar expanded={isExpanded} handleToggle={handleToggle} />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            marginLeft: isExpanded ? '200px' : '66px',
            transition: 'margin 0.3s'
          }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Wrapper;
