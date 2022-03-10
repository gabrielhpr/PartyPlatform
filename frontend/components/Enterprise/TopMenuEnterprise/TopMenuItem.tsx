import { Flex, Icon, Text, Link as NavLink } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";


interface TopMenuItemProps {
    name: string;
    icon: IconType;
    href: string;
}

export function TopMenuItem({name, icon, href}: TopMenuItemProps) {

    return (
        <NavLink h='100%'
            href={href}
        >
            <Flex direction='column' 
                borderBottom='4px solid'
                borderColor={name=='Meus anúncios' ? 'brand.dark_blue' : 'brand.white'}
                h='100%'
                alignItems='center'
                justifyContent='center'
                _hover={{bg:'brand.white_85'}}
                px='4'
                bg='brand.white'
            >
                    <Icon as={icon} 
                        color='brand.dark_blue'
                        fontSize={33}
                    />
                    <Text
                        mt='2'
                        color='brand.dark_blue'
                        fontSize={17}
                        fontWeight={500}
                    >
                        {name}
                    </Text>
            </Flex>  
        </NavLink>
    );
}