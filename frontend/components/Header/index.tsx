import { Box, Flex, Text, Link as NavLink, Button, Stack, Icon, 
    useBreakpointValue, IconButton } from "@chakra-ui/react";
import Image from "next/image"
import { HeaderMenuItem } from "./HeaderMenuItem";
import { useEffect, useState } from "react";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import { useSidebarDrawer } from "../../context/sidebarDrawerContext";
import { RiBriefcaseLine, RiMenuLine, RiUserLine } from "react-icons/ri";
import { useUserAuthContext } from "../../context/userContext";
import { useRouter } from 'next/router';
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Logo from "../../assets/imgs/logo.png";

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
    const { onOpen } = useSidebarDrawer();
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false
    });


    async function handleLogoutEnterprise() {
        await logoutEnterprise();
    }

    async function handleLogoutUser() {
        await logoutUser();
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
            py="10"
            alignItems="center"
            maxHeight={70}
            px={{base:"5",lg:"12"}}
            position={position}
            top="0"
            zIndex={1}
            justifyContent="space-between"
        >

            {
                isMobileVersion 
                &&
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                />
            }



            {/* Logo and enterprise name */}
            <Flex width={{base:"80%",lg:"30%"}}
                ml='3'
                textAlign='center'
                //mx='auto'
                justifyContent='center'
                //py='1'
                
            >
                <NavLink width='100%' href='/'
                    _hover={{outline: 'none'}}
                    _focus={{border:'none'}}
                    //mr='auto'
                    //justifyContent='center'
                >
                    <Flex
                        position='relative'
                        h={432/5.5}
                        w={571/5.5}
                        mx={{base:'auto', lg:'0'}}
                        //h='auto'
                    >
                        <Image
                            src={Logo}
                            layout="fill"
                            //width={150}
                        />
                    </Flex>
                    {/* <Text
                        textAlign='center'
                        fontSize={25}
                        fontWeight={500}
                    >
                        {authenticatedEnterprise ? 'Festafy Business': 'Festafy'}
                    </Text> */}
                </NavLink>
            </Flex>
        

            {   
                /* USER AUTHENTICATED */
                authenticatedUser
                ?
                    <Flex width="70%" justifyContent="flex-end">
                        <Flex>
                            {/* HOME */}
                            <NavLink
                                href="/User/home"
                                _hover={{textDecoration:"none"}}
                            >
                                <Button bg="none"
                                    //border="2px solid"
                                    //borderColor={scrollHeader ? "brand.dark_blue": "brand.dark_blue"}
                                    color={scrollHeader ? "brand.dark_blue": "brand.dark_blue"}
                                    transition="0.3s"
                                    _hover={{bg:"brand.white", color:"brand.dark_blue"}}
                                >
                                    HOME
                                </Button>
                            </NavLink>

                            <Button
                                bg='none'
                                //border="2px solid"
                                //borderColor={"brand.dark_blue"}
                                color="brand.dark_blue"
                                transition="0.3s"
                                _hover={{bg:"brand.yellow_60", color:"brand.dark_blue"}}
                                onClick={handleLogoutUser}
                            >
                                <Icon
                                    fontSize={25}
                                    as={MdLogout}
                                />
                            </Button>
                        </Flex>

                    </Flex>
                :
                
                /* ENTERPRISE AUTHENTICATED */
                authenticatedEnterprise
                ?
                    <Flex width="20%" justifyContent="flex-end">
                        <Flex>
                            <Button
                                bg='none'
                                //border="2px solid"
                                //borderColor={"brand.dark_blue"}
                                color={"brand.dark_blue"}
                                transition="0.3s"
                                _hover={{bg:"brand.yellow_60", color:"brand.dark_blue"}}
                                onClick={handleLogoutEnterprise}
                            >
                               
                                <Icon
                                    fontSize={25}
                                    as={MdLogout}
                                />
                            </Button>
                        </Flex>

                    </Flex>
                :

                /* ENTERPRISE AREA (NOT AUTHENTICATED) */
                enterpriseArea
                ?
                    <>
                    </>
                    /* USER BUTTON */

                    // <NavLink
                    //     href="/Enterprise/enterpriseAccess"
                    // >
                    //     <IconButton
                    //         aria-label="Open navigation"
                    //         icon={<Icon as={FaRegUser} />}
                    //         fontSize="24"
                    //         variant="unstyled"
                    //         //onClick={}
                    //     />
                    // </NavLink>

                :
                    /* GENERAL */
                    
                isMobileVersion == true
                ?
                    /* USER BUTTON */
                    <NavLink
                        href="/User/userAccess"
                    >
                        <IconButton
                            aria-label="Open navigation"
                            icon={<Icon as={FaRegUser} />}
                            fontSize="24"
                            variant="unstyled"
                            color='brand.dark_blue'
                            //onClick={}
                        />
                    </NavLink>
                :
                    <Flex width="70%" justifyContent="flex-end">                        

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
