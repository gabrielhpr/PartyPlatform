import { Box, Flex, Text, Input, Link as NavLink, Button } from "@chakra-ui/react";
import Image from 'next/image';
import { useState } from "react";
import FotoDebutante from '../../assets/imgs/festaDebutante.jpg';
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import { useRouter } from "next/router";
import { Header } from "../../../components/Header";

interface userRegisterDataProps {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    partyType: string;
    partyDate: string;
    city: string;
    state: string;
    country: string;
}

const userRegisterDataNullState = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    partyType: '',
    partyDate: '',
    city: '',
    state: '',
    country: ''
}

export default function registerUser() {
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
    const { loginUser } = useEnterpriseAuthContext();
    const routerNext = useRouter();

    function handleChange( event: any ) {
        setUserRegisterData({...userRegisterData, [event.currentTarget.name]: event.currentTarget.value });
        console.log( userRegisterData );
    }
    
    function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit');
        console.log( userRegisterData );
        loginUser( userRegisterData );
    }

    return (
        <Box>
            {/* Header */}
            <Header name="" position='relative' />
            
            <Flex w='100%' h='auto' position='relative' 
                justifyContent='center'
            >
                {/* 
                <Image src={FotoDebutante}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                
                */}
                
                {/* Shadow */}
                <Flex w='100%' h='100%'
                    justifyContent='center'
                    bg='rgba(0,0,0,0.80)' 
                    zIndex={3}
                >

                    <Flex w='70%' h='100%' justifyContent='space-between'
                        alignItems='center' 
                        my='10'
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
                            
                        </Flex>
                        
                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={450} 
                            height='80%'
                            py='8'
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
                                INSCREVA-SE
                            </Text>


                            <Flex direction="column" mt="3">
                                <Text color="brand.white_40" fontSize={19}>
                                    Nome completo
                                </Text>

                                <Input 
                                    name="fullName"
                                    onChange={handleChange}
                                />
                            </Flex>


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

                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Confirmação da Senha
                                </Text>

                                <Input placeholder="********"
                                    name="passwordConfirmation"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </Flex>

                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Telefone
                                </Text>

                                <Input 
                                    name="phone"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Flex>

                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Onde reside
                                </Text>

                                <Flex>
                                    <Input placeholder="Cidade"
                                        name="city"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                    <Input placeholder="Estado"
                                        name="state"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                    <Input placeholder="País"
                                        name="country"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </Flex>
                            </Flex>

                            <Flex direction="row"
                                mt="3"
                            >
                                <Flex direction='column'>
                                    <Text color="brand.white_40" fontSize={19}>
                                        Tipo de festa
                                    </Text>
                                    <Input
                                        name="partyType"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </Flex>

                                <Flex direction='column' ml='2'>
                                    <Text color="brand.white_40" fontSize={19}>
                                        Data da festa
                                    </Text>
                                    <Input
                                        name="partyDate"
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </Flex>
                            </Flex>

                            <Button 
                                mt="8"
                                bg="brand.red"
                                color="brand.white"
                                fontSize={18}
                                py="6"
                                onClick={handleSubmit}
                            >
                                Cadastrar
                            </Button>
                            
                        </Flex>
                    
                    </Flex>

                </Flex>

            </Flex>
        </Box>
    );
}