import { Box, Flex, List, Text, Link as NavLink, Stack, Icon } from "@chakra-ui/react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";



export function Footer() {
    return (
        <Box 
            h={{base: 'auto', lg: 300}}
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
                py='12'
            >
                <Flex
                    w='90%'
                    direction='column'
                >
                    <Text
                        color='brand.white'
                        fontSize={{base: 21, lg:21}}
                        fontWeight={500}
                    >
                        Informação
                    </Text>
                    <Stack
                        direction='row'
                        flexWrap='wrap'
                        spacing={3}
                        fontSize={{base: 19, lg:16}}
                        
                    >
                        <NavLink 
                            href="/contact"
                            py='3'
                            px='2'
                        >
                            Entrar em contato
                        </NavLink>

                        <NavLink 
                            href="https://www.iubenda.com/privacy-policy/19023979" 
                            isExternal
                            py='3'
                            px='2'
                        >
                            Política de Privacidade
                        </NavLink>

                        <NavLink 
                            py='3'
                            px='2'
                            href="/about"
                        >
                            Quem somos ?
                        </NavLink>

                        <NavLink 
                            href="https://www.iubenda.com/termos-e-condicoes/19023979" 
                            isExternal
                            py='3'
                            px='2'
                        >
                            Termos e Condições
                        </NavLink>

                        <NavLink 
                            href="https://www.iubenda.com/privacy-policy/19023979/cookie-policy" 
                            isExternal
                            py='3'
                            px='2'
                        >
                            Política de Cookies
                        </NavLink>

                        <NavLink 
                            href="/Enterprise/enterpriseAccess"
                            py='3'
                            px='2'
                        >
                            Cadastro de empresas
                        </NavLink>

                        <NavLink 
                            href="/image-attribution"
                            py='3'
                            px='2'
                        >
                            Imagens - Direitos Autorais
                        </NavLink>
                    </Stack>
                </Flex>

                <Flex
                    w='90%'
                    direction='column'
                    py='2'
                    mt='2'
                >
                    <Text
                        color='brand.white'
                        fontSize={{base: 21, lg:21}}
                        fontWeight={500}
                    >
                        Nossas redes sociais
                    </Text>
                    <Stack
                        spacing={2}
                        direction='row'
                        fontSize={{base: 46, lg: 32}}

                    >
                        <NavLink
                            href='https://www.instagram.com/festafyportal/'
                        >
                            <Icon as={AiOutlineInstagram} 
                            />
                        </NavLink>
                        <NavLink
                            href='https://www.facebook.com/profile.php?id=100081325641420'
                        >
                            <Icon as={AiOutlineFacebook} 
                            />
                        </NavLink>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}