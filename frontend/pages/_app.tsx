import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { EnterpriseProvider } from '../context/enterpriseContext';
import { UserProvider } from '../context/userContext';
import { SidebarDrawerProvider } from '../context/sidebarDrawerContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
        <EnterpriseProvider>
          <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
        </EnterpriseProvider>
    </UserProvider>
  )
}

export default MyApp
