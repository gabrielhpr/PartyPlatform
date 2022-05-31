import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { EnterpriseProvider } from '../context/enterpriseContext';
import { UserProvider } from '../context/userContext';
import { SidebarDrawerProvider } from '../context/sidebarDrawerContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Festafy - Portal de Festas</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <UserProvider>
        <EnterpriseProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
          </ChakraProvider>
        </EnterpriseProvider>
      </UserProvider>
    </>
  )
}

export default MyApp;
