import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { RiMailFill } from "react-icons/ri";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Logo from "../assets/imgs/logo.png";
import Image from "next/image"

export default function AboutPage() {
    return (
        <Box>
            {/* Header */}
            <Header name='' position='relative' />

            <Sidebar/>

            <Flex
                direction='column'
                alignItems='center'
                justifyContent='center'
                h='60vh'
            >
                <Text
                    fontSize={{base:28, lg:32}}
                    fontWeight={500}
                    py='2'
                >
                    Sobre nós
                </Text>

                <Text
                    textAlign='center'
                    fontSize={{base:18,lg:20}}
                    mt='0'
                >
                    Nós somos 
                </Text>

                



                <Flex
                    position='relative'
                    h={432/4}
                    w={571/4}
                    mx={{base:'auto', lg:'auto'}}
                    mt='6'
                    //h='auto'
                >
                    <Image
                        src={Logo}
                        layout="fill"
                        //width={150}
                    />
                </Flex>



            </Flex>

            <Footer/>
        </Box>
    );
}