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
        <meta name="description" content="O Festafy é uma plataforma de Festa Infantil, Debutantes e Aniversários. Encontre aqui tudo o que você precisa para a sua festa! Temos diversos fornecedores de festa como: Salões de Festa, Buffets, Doces, Bolos, Música, Assessoria entre outros."/>
        <meta property="og:title" content="Tudo para a sua Festa - Festafy"/>
        <meta property="og:description" content="Encontre o profissional perfeito para o que a sua festa precisa!"/>
        <meta property="og:url" content="https://www.festafy.com.br/"/>
        <meta property="og:type" content="website"/>
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
