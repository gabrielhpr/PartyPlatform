import { Flex, Icon, Text, Link as NavLink } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IconType } from "react-icons";


interface TopMenuItemProps {
    name: string;
    icon: IconType;
    href: string;
}

export function TopMenuItem({name, icon, href}: TopMenuItemProps) {
    const routerNext = useRouter();
    const [routerPathName, setRouterPathName] = useState('');

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        setRouterPathName( routerNext.pathname );
    }, [routerNext.pathname]);

    
    return (
        <NavLink h='100%'
            href={href}
            _hover={{outline: 'none'}}
        >
            <Flex direction='column' 
                borderBottom='4px solid'
                borderColor={href == routerPathName ? 'brand.dark_blue' : 'brand.white'}
                h='100%'
                alignItems='center'
                justifyContent='center'
                _hover={{bg:'brand.white_85'}}
                px={{base:'1',lg:'4'}}
                bg={href == routerPathName ? 'rgba(0,0,0,0.12)' : 'brand.white'}
                overflowX='hidden'
            >
                    <Icon as={icon} 
                        color='brand.dark_blue'
                        fontSize={33}
                    />
                    <Text
                        mt='2'
                        color='brand.dark_blue'
                        fontSize={{base:15,lg:17}}
                        fontWeight={500}
                        textAlign='center'
                    >
                        {name}
                    </Text>
            </Flex>  
        </NavLink>
    );
}