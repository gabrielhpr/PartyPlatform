import { Box, Flex, Text, Input, Link as NavLink, Button } from "@chakra-ui/react";
import Image from 'next/image';
import { useState } from "react";
import { useUserAuthContext } from "../../context/userContext";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import FotoFestaEntregaPresente from '../../assets/imgs/entrega-presente.png';
import { Footer } from "../../components/Footer";

export default function userAccess() {
    const [userAccessData, setUserAccessData] = useState({email: '', password:''});
    const { loginUser, authenticatedUser } = useUserAuthContext();
    const routerNext = useRouter();

    function handleChange( event: any ) {
        setUserAccessData({...userAccessData, [event.currentTarget.name]: event.currentTarget.value });
    }
    
    async function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit');
        console.log( userAccessData );

        await loginUser( userAccessData );
    }

    return (
        <Box>
            {/* Header */}
            <Header name="" position='relative' />
            
            <Sidebar/>

            <Flex 
                w='100%' 
                h={600} 
                position='relative' 
                justifyContent='center'
            >
                <Image src={FotoFestaEntregaPresente}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                
                
                {/* Shadow */}
                <Flex w='100%' h='100%'
                    justifyContent='center'
                    bg={{base:'brand.white', lg:'rgba(0,0,0,0.20)'}}
                    zIndex={3}
                >

                    <Flex w={{base:'100%', lg:'70%'}}
                        h='100%' justifyContent='space-between'
                        alignItems='center' 
                    >
                        {/* Texto User Access - DESKTOP */}
                        <Flex direction='column'
                            display={{base:'none', lg:'flex'}}
                        >
                            <Flex color='white' direction='column' mb='5'>
                                <Text as='h2' fontSize={30} fontWeight={600}
                                    mb='2'
                                >
                                    Planeje sua festa
                                </Text>

                                <Text as='h3' fontSize={20} fontWeight={500}>
                                    * Encontre o melhor fornecedor para a sua 
                                    festa
                                </Text>

                                <Text as='h3' fontSize={20} fontWeight={500}>
                                    * Peça orçamentos
                                </Text>

                            </Flex>
                            <NavLink href='/User/Auth/register'>
                                <Button bg='brand.red' color='white' h={12} fontSize={18}>
                                    Cadastre-se gratuitamente!
                                </Button>
                            </NavLink>
                        </Flex>
                        
                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={{base:'100%', lg:400}}
                            height={{base:'100%', lg:'80%'}}
                            pt="1"
                            pb="1"
                            px="10" 
                            justifyContent="center"
                            bg="white" 
                            boxShadow={{base:'0', lg:"0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"}}
                            borderRadius={{base:0, lg:8}} 
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
                                bg="brand.red"
                                color="brand.white"
                                fontSize={18}
                                py="6"
                                onClick={handleSubmit}
                            >
                                LOGIN
                            </Button>

                            <Flex direction="column" justifyContent="center" mt='4'>
                                <NavLink href="/prices">
                                    <Text textAlign="center" 
                                        fontSize={{base:18, lg:16}}
                                        color="brand.light_blue_40"
                                    >
                                        Esqueceu sua senha ?
                                    </Text>
                                </NavLink>
                            </Flex>

                            {/* MOBILE */}
                            <Flex direction="column" justifyContent="center" mt='4'
                                display={{base:'flex', lg:'none'}}
                            >
                                <Text textAlign="center" 
                                    fontSize={{base:17, lg:16}}
                                    color="black"
                                >
                                    Não possui uma conta ? 
                                </Text>
                                
                                <NavLink href="/User/Auth/register">
                                    <Text textAlign="center" 
                                        fontSize={{base:18, lg:16}}
                                        color="brand.light_blue_40"
                                    >
                                        Cadastre-se gratuitamente
                                    </Text>
                                </NavLink>
                            </Flex>



                        </Flex>
                    
                    </Flex>

                </Flex>

            </Flex>

            <Footer/>
        </Box>
    );
}