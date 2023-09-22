import { ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';

import { theme } from '@/assets/theme';
import Wrapper from './wrapper';

export const metadata: Metadata = {
  title: 'JMS'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ThemeProvider theme={theme}>
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </html>
  );
}
