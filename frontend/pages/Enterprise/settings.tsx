import { Box } from "@chakra-ui/react";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../components/Header";



export default function SettingsEnterprise() {
    return (
        <Box>
            <Header name="" position="relative" />
            <TopMenuEnterprise />
        </Box>
    );
}