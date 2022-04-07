import { Box } from "@chakra-ui/react";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../components/Header";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";



export default function SettingsEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Header name="" position="relative" />
                <TopMenuEnterprise />
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