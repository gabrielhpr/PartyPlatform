import { Box } from "@chakra-ui/react";
import { FlashMessageComponent } from "../../components/FlashMessageComponent";
import { Header } from "../../components/Header";





export default function HomeUser() {
    return (
        <Box>
            <Header name='' position="relative" />
            <FlashMessageComponent/>

            HOME
        </Box>
    );
}