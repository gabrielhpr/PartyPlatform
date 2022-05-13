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
                h='80vh'
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
                    O Festafy foi fundada por dois sócios: Gabriel e Adenilson. 
                    <br/>
                    Gabriel é do 
                    setor de tecnologia e já trabalhou com Ciência de Dados. 
                    <br/>
                    Adenilson é do ramo de festas e aluga espaços para festas e 
                    decoração.
                </Text>

                <Text
                    fontSize={{base:28, lg:32}}
                    fontWeight={500}
                    py='2'
                    mt='3'
                >
                    Missão
                </Text>

                <Text
                    textAlign='center'
                    fontSize={{base:18,lg:20}}
                    mt='0'
                >
                    Nossa missão é criar uma plataforma especializada em festas 
                    <br />
                    de aniversários e outros eventos. 
                    <br/>
                    Ajudando clientes a encontrarem profissionais perfeitos para 
                    <br />
                    o que as suas festas precisam e ajudando fornecedores a 
                    <br />
                    encontrarem clientes que se identificam com o serviço 
                    realizado.
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