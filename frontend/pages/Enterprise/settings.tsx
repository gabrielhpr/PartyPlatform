import { Box, Flex, Text } from "@chakra-ui/react";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import { Sidebar } from "../../components/Sidebar";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";



export default function SettingsEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Header name="" position="relative" />
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
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}