import { Box, Flex, Text, Link as NavLink, Button, Stack, Icon } from "@chakra-ui/react";
import Image from "next/image"
import { HeaderMenuItem } from "./HeaderMenuItem";
import { useEffect, useState } from "react";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import { RiBriefcaseLine } from "react-icons/ri";
import { useUserAuthContext } from "../../context/userContext";
import { useRouter } from 'next/router';

interface HeaderProps {
    name: string;
    position: 'relative' | 'sticky';
    type?: 'oneColor' | 'changeColor'; 
}

export function Header( {name, position, type='oneColor'} : HeaderProps ) {
    const { authenticatedEnterprise, logoutEnterprise } = useEnterpriseAuthContext();
    const { authenticatedUser, logoutUser } = useUserAuthContext();
    const [ enterpriseArea, setEnterpriseArea ] = useState(false);
    const [scrollHeader, setScrollHeader] = useState(false);
    const routerNext = useRouter();



    function handleLogoutEnterprise() {
        logoutEnterprise();
    }

    function handleLogoutUser() {
        logoutUser();
    }

    const listenScrollEvent = (event) => {
        if (type == 'changeColor') {
            if (window.scrollY < 73) {
                setScrollHeader(false);
            } 
            else if (window.scrollY > 70) {
                setScrollHeader(true);
            } 
        }
      }
      
    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
    
        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        }
    }, []);

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        if( routerNext.pathname == '/Enterprise/enterpriseAccess' ) {
            setEnterpriseArea(true);
        }
        else {
            setEnterpriseArea(false);
        }
        console.log( routerNext.pathname );

    }, [routerNext.pathname]);

    return (
        <Flex as="header"
            width="100%"
            bg={scrollHeader ? "brand.yellow" : "brand.yellow"}
            color="brand.dark_blue"
            py="6"
            alignItems="center"
            maxHeight={70}
            px="12"
            position={position}
            top="0"
            zIndex={1}
            justifyContent="space-between"
        >
            {/* Logo and enterprise name */}
            <Flex width="30%">
                <NavLink width='100%' href='/'
                    _hover={{outline: 'none'}}
                    _focus={{border:'none'}}
                >
                    <Text
                        fontSize={25}
                        fontWeight={500}
                    >
                        Festafy
                    </Text>
                </NavLink>
            </Flex>
        

            {   
                /* USER */
                authenticatedUser
                ?
                    <Flex width="70%" justifyContent="flex-end">
                        <Flex>
                            <Button
                                bg='none'
                                border="2px solid"
                                borderColor={"brand.dark_blue"}
                                color={"brand.dark_blue"}
                                transition="0.3s"
                                _hover={{bg:"brand.yellow_60", color:"brand.dark_blue"}}
                                onClick={handleLogoutUser}
                            >
                                Logout
                            </Button>
                        </Flex>

                    </Flex>
                :
                
                /* ENTERPRISE AUTHENTICATED */
                authenticatedEnterprise
                ?
                    <Flex width="70%" justifyContent="flex-end">
                        <Flex>
                            <Button
                                bg='none'
                                border="2px solid"
                                borderColor={"brand.dark_blue"}
                                color={"brand.dark_blue"}
                                transition="0.3s"
                                _hover={{bg:"brand.yellow_60", color:"brand.dark_blue"}}
                                onClick={handleLogoutEnterprise}
                            >
                                Logout
                            </Button>
                        </Flex>

                    </Flex>
                :

                /* ENTERPRISE AREA (NOT AUTHENTICATED) */
                enterpriseArea
                ?
                    <Flex>
                        
                    </Flex>

                :
                /* GENERAL */
                    <Flex width="70%" justifyContent="flex-end">
                        {/* Menu */}
                        <Stack direction="row" spacing={10}
                            justifyContent="center" alignItems="center"
                        > 
                            <HeaderMenuItem title="Home" pathTo="/" scroll={scrollHeader}/>
                    
                        </Stack>

                        {/* Demo and Login */}
                        <Stack direction="row" mx={50}>
                            {/* LOGIN */}
                            <NavLink
                                href="/User/userAccess"
                                _hover={{textDecoration:"none"}}
                            >
                                <Button bg="none"
                                    //border="2px solid"
                                    //borderColor={scrollHeader ? "brand.dark_blue": "brand.dark_blue"}
                                    color={scrollHeader ? "brand.dark_blue": "brand.dark_blue"}
                                    transition="0.3s"
                                    _hover={{bg:"brand.white", color:"brand.dark_blue"}}
                                >
                                    LOGIN
                                </Button>
                            </NavLink>

                             {/* CADASTRE-SE */}
                            <NavLink
                                href="/User/Auth/register"
                                _hover={{textDecoration:"none"}}
                            >
                                <Button bg="none"
                                    //border="2px solid"
                                    //borderColor={scrollHeader ? "brand.dark_blue": "brand.dark_blue"}
                                    color={scrollHeader ? "brand.dark_blue": "brand.dark_blue"}
                                    transition="0.3s"
                                    _hover={{bg:"brand.white", color:"brand.dark_blue"}}
                                >
                                    CADASTRE-SE
                                </Button>
                            </NavLink>

                    

                            {/* ACESSO EMPRESAS */}
                            <NavLink href='/Enterprise/enterpriseAccess'
                                _hover={{
                                    textDecor:'none'
                                }}
                            >
                                <Button
                                    bg='brand.yellow'
                                    color='brand.dark_blue'
                                    border='2px solid'
                                    borderColor='brand.dark_blue'
                                    mr='3'
                                    _hover={{ bg:'#ffcf4d' }}
                                    leftIcon={
                                        <Icon as={RiBriefcaseLine} mr='2'/>
                                    }
                                >
                                    Acesso Empresas
                                </Button>
                            </NavLink>
                        </Stack>
                    </Flex>
                
            }
            
            
        </Flex>
    );
}