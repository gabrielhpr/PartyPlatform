import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { RiMailFill } from "react-icons/ri";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Logo from "../assets/imgs/logo3.png";
import Image from "next/image"

export default function ContactPage() {
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
                    Entre em contato conosco!
                </Text>

                <Text
                    textAlign='center'
                    fontSize={{base:18,lg:20}}
                    mt='0'
                >
                    Envie um email para nós, e lhe responderemos o mais breve possível.
                </Text>

                <Flex 
                    justifyContent='center' 
                    mt='8'
                    alignItems='center'
                    border='1px solid rgba(0,0,0,0.4)'
                    borderRadius={8}
                    py='2'
                    px={{base:'8', lg:'14'}}
                    w='auto'
                >
                    <Icon as={RiMailFill} color='brand.dark_blue'
                        fontSize={{base: 20, lg:20}}
                    />
                    <Text ml='2' fontSize={23}>
                        contato@festafy.com.br
                    </Text>
                </Flex>



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