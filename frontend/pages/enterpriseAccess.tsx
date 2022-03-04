import { Box, Flex, Text, Input, Link as NavLink, Button } from "@chakra-ui/react";
import Image from 'next/image';
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';





export default function enterpriseAccess() {
    function handleChange() {

    }
    function handleSubmit() {

    }

    return (
        <Box>
            {/* Header */}
            <Box w='100%' h={20} bg='gray'>

            </Box>

            
            <Flex w='100%' h={500} position='relative' 
                justifyContent='center'
            >
                <Image src={FotoDebutante}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                
                {/* Shadow */}
                <Flex w='100%' h='100%'
                    justifyContent='center'
                    bg='rgba(0,0,0,0.45)' 
                    zIndex={3}
                >

                    <Flex w='70%' h='100%' justifyContent='space-between'
                        alignItems='center' 
                    >

                        <Flex direction='column'
                        >
                            <Flex color='white' direction='column' mb='5'>
                                <Text as='h2' fontSize={30} fontWeight={600}
                                    mb='2'
                                >
                                    Anuncie o seu serviço aqui!
                                </Text>

                                <Text as='h3' fontSize={20} fontWeight={500}>
                                    Fique visível para centenas de novos clientes
                                </Text>

                            </Flex>
                            <NavLink href='AuthEnterprise/register'>
                                <Button bg='brand.pink' color='white' h={12} fontSize={18}>
                                    Cadastre-se gratuitamente!
                                </Button>
                            </NavLink>
                        </Flex>
                        
                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={400} 
                            height='80%'
                            pt="1"
                            pb="1"
                            px="10" 
                            justifyContent="center"
                            bg="white" 
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            fontSize={20}
                        >
                            <Text as="h2" textAlign="center" my="1" fontSize={22} 
                                fontWeight={500}
                            >
                                SEJA BEM-VINDO!
                            </Text>

                            <Flex direction="column" mt="3">
                                <Text color="brand.white_40" fontSize={19}>
                                    E-mail
                                </Text>

                                <Input placeholder="email@example.com"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Flex>

                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Senha
                                </Text>

                                <Input placeholder="********"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </Flex>

                            <Button 
                                mt="8"
                                bg="brand.pink"
                                color="brand.white"
                                fontSize={18}
                                py="6"
                                onClick={handleSubmit}
                            >
                                LOGIN
                            </Button>

                            <Flex direction="column" justifyContent="center" mt='4'>
                                <NavLink href="/prices">
                                    <Text textAlign="center" fontSize={16}
                                        color="brand.light_blue_40"
                                    >
                                        Esqueceu sua senha ?
                                    </Text>
                                </NavLink>
                            </Flex>

                        </Flex>
                    
                    </Flex>

                </Flex>

            </Flex>
        </Box>
    );
}