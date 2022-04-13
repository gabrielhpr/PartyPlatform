import { Box, Flex, Text, Input, Link as NavLink, Button, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, useBreakpointValue } from "@chakra-ui/react";
import Image from 'next/image';
import { useEffect, useState } from "react";
import PessoasFesta from '../../../assets/imgs/pessoas-festa.jpg';
import { useRouter } from "next/router";
import { Header } from "../../../components/Header";
import { useUserAuthContext } from "../../../context/userContext";
import { locationMap, typeOfParties } from "../../../utils/typeOfParties";
import { Footer } from "../../../components/Footer";
import { Sidebar } from "../../../components/Sidebar";

interface userRegisterDataProps {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    partyType: string;
    partyTypeTextToShow: string;
    partyDate: string;
    location: string;
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
    partyTypeTextToShow: '',
    partyDate: '',
    location: '',
    city: '',
    state: '',
    country: ''
}

export default function registerUser() {
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
    const { registerUser } = useUserAuthContext();
    const [menuWhere, setMenuWhere] = useState('none');
    const routerNext = useRouter();
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });
    
    // Close dropdown menu on click outside
    useEffect(() => {
        document.addEventListener('mouseup', function (e) {
            var menu1 = document.getElementById('menuLocation');

            if (!menu1?.contains(e.currentTarget)) {
                setMenuWhere('none');
            }
        }.bind(this));
    },[]);

    function handleChange( event: any ) {
        setUserRegisterData({...userRegisterData, [event.currentTarget.name]: event.currentTarget.value });
        console.log( userRegisterData );
    }
    
    function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit');
        console.log( userRegisterData );
        registerUser( userRegisterData );
    }

    // Used in Menu search
    function searchFunction( event: any, menuId: string ) {
        console.log( event.currentTarget.value );
        let inputValue = event.currentTarget.value.toUpperCase();
        let menu = document.getElementById( menuId );
        let itemList = menu.getElementsByTagName("button");
        
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].innerHTML.toUpperCase().indexOf(inputValue) > -1) {
                itemList[i].style.display = "";
            } 
            else {
                itemList[i].style.display = "none";
            }
        }
    }

    return (
        <Box>
            {/* Header */}
            <Header name="" position='relative' />
            
            <Sidebar/>

            <Flex w='100vw' h='auto' position='relative' 
                justifyContent='center'
            >
               
                <Image src={PessoasFesta}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                
                {/* Shadow */}
                <Flex 
                    w='100%' 
                    h='100%'
                    justifyContent={{base:'flex-start', lg:'center'}}
                    bg={{base:'brand.white', lg:'rgba(0,0,0,0.20)'}}
                    zIndex={3}
                >

                    <Flex w={{base:'100%', lg:'75%'}}
                        h='100%' 
                        justifyContent={{base:'center', lg:'space-between'}}
                        alignItems='center'
                        my={{base:'0', lg:'10'}}
                    >
                        
                        {/* DESKTOP VERSION */}
                        <Flex direction='column' w='50%'
                            display={{base:'none', lg:'flex'}}
                        >
                            <Flex direction='column' mb='5'
                                textColor='white'
                            >
                                <Text as='h2' fontSize={30} fontWeight={600}
                                    mb='2'
                                >
                                    Cadastre-se para achar os melhores fornecedores do mercado!
                                </Text>
                                <Text as='h3' fontSize={20} fontWeight={500}>
                                    Salve os fornecedores que gostou, peça orçamentos pela 
                                    plataforma, avalie os prestadores de serviço
                                </Text>
                            </Flex>
                        </Flex>
                        
                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={{base:'90%', lg:'40%'}}
                            height='80%'
                            py='8'
                            px={{base:'0', lg:"10"}}
                            justifyContent='center'
                            //alignItems='center'
                            bg={{base:"brand.white", lg:'rgba(255,255,255,0.95)'}}
                            //boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            fontSize={20}
                            //zIndex={5}
                        >
                            <Text as="h2" textAlign="center" my="1" fontSize={22} 
                                fontWeight={500}
                            >
                                INSCREVA-SE
                            </Text>


                            <Flex direction="column" mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}
                                >
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

                                <Flex direction='column'
                                >
                                    {/* Onde - Localização */}
                                    <Input 
                                        _focus={{outline:'none'}}
                                        value={userRegisterData.location}
                                        onChange={(event: any) => {
                                            setUserRegisterData({...userRegisterData, location: event.currentTarget.value});
                                            searchFunction(event, "menuWhere");
                                        }}
                                        onClick={() => {
                                            setMenuWhere('onclick')
                                        }}
                                    />
                                    <Box 
                                        id='menuLocation'
                                        height={230} 
                                        width={350}
                                        display={menuWhere}
                                        position='absolute'
                                        overflowY="scroll"
                                        bg='brand.white'
                                        mt={10}
                                        borderRadius={10}
                                        zIndex={3}
                                    >
                                        <Flex direction="column" id="menuWhere"
                                            h='100%'
                                        >
                                            {
                                            Object.values(locationMap).map((el, i) => {
                                                return(
                                                    <Button
                                                        bg='white'
                                                        h='25%'
                                                        py='4'
                                                        px='5'
                                                        borderRadius={0}
                                                        _focus={{outline:'none'}}
                                                        _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                        //name='partyType'
                                                        //value={el.value}
                                                        onClick={(event) => {
                                                            setUserRegisterData({...userRegisterData, location: el.textToShow, city: el.city, state: el.state, country: el.country})
                                                            setMenuWhere('none');
                                                        }}
                                                    >
                                                        <Text
                                                            width='100%'
                                                            textAlign='left'
                                                            fontWeight={400}
                                                            fontSize={18}
                                                        >
                                                            {el.textToShow}
                                                        </Text>
                                                    </Button>
                                                );
                                            })
                                            }
                                        </Flex>
                                    </Box>
                                </Flex>       
                            </Flex>

                            <Flex direction="row"
                                mt="3"
                                justifyContent='space-between'
                            >
                                <Flex direction='column'
                                    w='50%'
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Tipo de festa
                                    </Text>

                                    <Menu>
                                        <MenuButton as={Button} colorScheme='gray'>
                                            {userRegisterData.partyTypeTextToShow || 'Selecione'}
                                        </MenuButton>
                                        <MenuList minWidth='240px'>
                                            <MenuOptionGroup type='radio'
                                            >         
                                                {
                                                    Object.values( typeOfParties ).map((el, index) => {
                                                        return (
                                                            <MenuItemOption value={el.value}
                                                                onClick={() => {
                                                                    setUserRegisterData({...userRegisterData, partyType: el.value, partyTypeTextToShow: el.textToShow });
                                                                }}
                                                            >
                                                                {el.textToShow}
                                                            </MenuItemOption>
                                                        )
                                                    })
                                                }                                       
                                            </MenuOptionGroup>
                                        </MenuList>
                                    </Menu>

                                </Flex>

                                <Flex direction='column' ml='2'
                                    w='50%'
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Data da festa
                                    </Text>
                                    <Input
                                        name="partyDate"
                                        type="date"
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

            <Footer/>
        </Box>
    );
}