import { Box, Flex, Text } from "@chakra-ui/react";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise";
import { FlashMessageComponent } from "../../components/FlashMessageComponent";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import { Sidebar } from "../../components/Sidebar";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import Head from 'next/head';

export default function SettingsEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Head>
                    <title>Configurações</title>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="description" content="Olhe e modifique as configurações acerca da sua conta."/>
                    <meta property="og:title" content="Configurações"/>
                    <meta property="og:description" content="Olhe e modifique as configurações acerca da sua conta."/>
                    <meta property="og:url" content="https://www.festafy.com.br/Enterprise/settings"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <Header name="" position="relative" />
                <FlashMessageComponent/>
                <TopMenuEnterprise />
                <Sidebar/>
                
                <Flex 
                    mt='5'
                    mb='14'
                >
                    <Text>
                        Settings
                    </Text>
                </Flex>

                <Footer/>
            </Box>
        );
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <Head>
                    <title>Configurações</title>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="description" content="Olhe e modifique as configurações acerca da sua conta."/>
                    <meta property="og:title" content="Configurações"/>
                    <meta property="og:description" content="Olhe e modifique as configurações acerca da sua conta."/>
                    <meta property="og:url" content="https://www.festafy.com.br/Enterprise/settings"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}