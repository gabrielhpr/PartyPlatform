import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { EnterpriseProvider } from '../context/enterpriseContext';


function MyApp({ Component, pageProps }) {
  return (
    <EnterpriseProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </EnterpriseProvider>
  )
}

export default MyApp
