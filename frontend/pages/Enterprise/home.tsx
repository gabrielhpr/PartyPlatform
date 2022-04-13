import { Box, Flex, Text } from "@chakra-ui/react";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise/index";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";






export default function HomePageEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();


    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Header name="" position="relative" />
                <TopMenuEnterprise />

                <Flex
                    h='50vh'
                    mt='5'
                    mb='14'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Text>
                        Home page da enterprise
                    </Text>
                </Flex>

                <Footer />

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