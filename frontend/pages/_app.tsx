import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { EnterpriseProvider } from '../context/enterpriseContext';
import { UserProvider } from '../context/userContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <EnterpriseProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </EnterpriseProvider>
    </UserProvider>
  )
}

export default MyApp
