import { Box, Flex, Text, Link as NavLink, Button, Stack } from "@chakra-ui/react";
import Image from "next/image"
import { HeaderMenuItem } from "./HeaderMenuItem";
import { useEffect, useState } from "react";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";

interface HeaderProps {
    name: string;
    position: 'relative' | 'sticky';
    type: 'oneColor' | 'changeColor'; 
}

export function Header( {name, position, type='oneColor'} : HeaderProps ) {
    const { authenticated, logout } = useEnterpriseAuthContext();
    const [scrollHeader, setScrollHeader] = useState(false);

    function handleLogout() {
        logout();
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

    return (
        <Flex as="header"
            width="100%"
            bg={scrollHeader ? "brand.white" : "brand.dark_blue"}
            color="brand.white"
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
                
            </Flex>
            
            {
                authenticated 
                ?
                
                    <Flex width="70%" justifyContent="flex-end">
                        <Flex>
                            <Button
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Flex>

                    </Flex>
            
                :
                
                    <Flex justifyContent="center" width="70%">
                        {/* Menu */}
                        <Stack direction="row" spacing={10}
                            justifyContent="center" alignItems="center"
                        > 
                            <HeaderMenuItem title="Home" pathTo="/" scroll={scrollHeader}/>
                        
                            <HeaderMenuItem title="Funcionalidades" pathTo="/" scroll={scrollHeader}/>

                            <HeaderMenuItem title="Preços" pathTo="/prices" scroll={scrollHeader}/>

                            <HeaderMenuItem title="Blog" pathTo="/" scroll={scrollHeader}/>

                        </Stack>

                        {/* Demo and Login */}
                        <Stack direction="row" mx={50}>
                            <NavLink
                                href="/Auth/login"
                                _hover={{textDecoration:"none"}}
                            >
                                <Button bg="none"
                                    border="2px solid"
                                    borderColor={scrollHeader ? "brand.dark_blue": "brand.white"}
                                    color={scrollHeader ? "brand.dark_blue": "brand.white"}
                                    transition="0.3s"
                                    _hover={{bg:"brand.white", color:"brand.dark_blue"}}
                                >
                                    Login
                                </Button>
                            </NavLink>
                        </Stack>

                    </Flex>
                
            }
            
            
        </Flex>
    );
}