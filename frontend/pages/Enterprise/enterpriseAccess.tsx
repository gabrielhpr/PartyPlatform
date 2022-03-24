import { Box, Flex, Text, Input, Link as NavLink, Button } from "@chakra-ui/react";
import Image from 'next/image';
import { useState } from "react";
import KidBirthday from '../../assets/imgs/kid-birthday.jpg';
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";





export default function enterpriseAccess() {
    const [enterpriseAccessData, setEnterpriseAccessData] = useState({email: '', password:''});
    const { loginEnterprise } = useEnterpriseAuthContext();
    const routerNext = useRouter();

    function handleChange( event: any ) {
        setEnterpriseAccessData({...enterpriseAccessData, [event.currentTarget.name]: event.currentTarget.value });
    }
    
    function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit');
        console.log( enterpriseAccessData );

        loginEnterprise( enterpriseAccessData );
    }

    return (
        <Box>
            {/* Header */}
            <Header name="" position='relative' />
            
            <Flex w='100%' h={550} position='relative' 
                justifyContent='center'
            >
                
                <Image src={KidBirthday}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                
                
                
                {/* Shadow */}
                <Flex w='100%' h='100%'
                    justifyContent='center'
                    bg='rgba(0,0,0,0.30)' 
                    zIndex={3}
                >

                    <Flex w='90%' h='100%' justifyContent='space-between'
                        alignItems='center' 
                    >

                        <Flex direction='column'
                            alignItems='center'
                        >
                            <Flex color='white' direction='column' mb='5'>
                                <Text as='h2' fontSize={39} fontWeight={600}
                                    mb='3'
                                >
                                    Anuncie o seu serviço aqui!
                                </Text>

                                <Text as='h3' fontSize={23} fontWeight={500}>
                                    * Fique visível para centenas de novos clientes
                                </Text>

                                <Text as='h3' fontSize={23} fontWeight={500}>
                                    * Seja encontrado por clientes interessados
                                </Text>

                            </Flex>

                            <NavLink href='/Enterprise/Auth/register'>
                                <Button bg='brand.red' color='white' py='7'
                                    
                                >
                                    <Text
                                        fontSize={20}
                                        fontWeight={600}
                                    >
                                        Cadastre-se gratuitamente!
                                    </Text>
                                </Button>
                            </NavLink>
                        </Flex>
                        
                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={400} 
                            height='80%'
                            pt="0"
                            pb="1"
                            px="10" 
                            justifyContent="center"
                            bg="brand.white" 
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            fontSize={20}
                        >
                            <Text as="h2" textAlign="center" my="3" 
                                fontSize={25} 
                                fontWeight={500}
                                color='brand.dark_blue'
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