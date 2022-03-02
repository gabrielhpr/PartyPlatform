import { Link as NavLink, Text } from "@chakra-ui/react";

interface MenuItemProps {
    title: string;
    pathTo: string;
    scroll: boolean;
}

export function HeaderMenuItem({ title, pathTo, scroll }: MenuItemProps) {
    return (
        <NavLink href={pathTo} 
            _hover={{textDecoration: "none"}} 
            _focus={{outline:"none"}}
        >
            <Text textTransform="uppercase"
                color={scroll ? "brand.dark_blue": "brand.white"}
                fontWeight={600}
                _hover={{color:"brand.white_80"}}
            >
                {title}
            </Text>
        </NavLink>
    );
}