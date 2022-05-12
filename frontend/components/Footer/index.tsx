import { Box, Flex, List, Text, Link as NavLink, Stack, Icon } from "@chakra-ui/react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";



export function Footer() {
    return (
        <Box 
            h={300}
            bg='brand.dark_blue'
            color='brand.white'
            //position='absolute'
            //bottom={0}
            //top={0}
        > 
            <Flex
                alignItems='center'
                direction='column'
                w='100%'
                py='5'
            >
                <Flex
                    w='90%'
                    direction='column'
                    
                >
                    <Text
                        color='brand.white'
                        fontSize={{base: 21, lg:19}}
                        fontWeight={500}
                    >
                        Informação
                    </Text>
                    <Stack
                        direction='row'
                        flexWrap='wrap'
                        spacing={3}
                        fontSize={{base: 16, lg:14}}
                    >
                        <NavLink href="/contact">
                            Entrar em contato
                        </NavLink>
                        <NavLink href="">
                            Política de Privacidade
                        </NavLink>
                        <NavLink href="">
                            Definições de Cookies
                        </NavLink>
                        <NavLink href="/about">
                            Quem somos ?
                        </NavLink>
                        <NavLink href="">
                            Condições Legais
                        </NavLink>
                        <NavLink href="">
                            Política de Cookies
                        </NavLink>
                        <NavLink href="/Enterprise/enterpriseAccess">
                            Cadastro de empresas
                        </NavLink>
                    </Stack>
                </Flex>

                <Flex
                    w='90%'
                    direction='column'
                    py='2'
                >
                    <Text
                        color='brand.white'
                        fontSize={{base: 21, lg:19}}
                        fontWeight={500}
                    >
                        Nossas redes sociais
                    </Text>
                    <Stack
                        spacing={2}
                        direction='row'
                    >
                        <NavLink
                            href=''
                        >
                            <Icon as={AiOutlineInstagram} 
                                fontSize={{base: 42, lg: 28}}
                            />
                        </NavLink>
                        <NavLink
                            href=''
                        >
                            <Icon as={AiOutlineFacebook} 
                                fontSize={{base: 42, lg: 28}}
                            />
                        </NavLink>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}