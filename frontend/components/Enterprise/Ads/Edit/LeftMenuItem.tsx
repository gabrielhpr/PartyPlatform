import { Box, Divider, Flex, Icon, Stack, Text, Link as NavLink } from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

interface LeftMenuItemEditProps {
    title: string;
    subMenu: string[];
    selectedState?: boolean;
}

export function LeftMenuItemEdit({title, subMenu, selectedState=false, ...rest}: LeftMenuItemEditProps) {
    const [isSelected, setIsSelected] = useState( selectedState );

    if(!isSelected) {
        return (
            <Flex 
                alignItems="center"
                py="2" {...rest}
                onClick={() => setIsSelected(true)}
            >
                <Icon as={RiArrowRightSLine}
                    color="brand.white"
                    height="100%"
                    fontSize={27}
                /> 
                <Text
                    fontSize={18}
                    color="brand.white"
                >
                    {title}
                </Text>
            </Flex>
        );
    }
    else {
        return (
            <Stack w='20vw'>
                <Flex alignItems="center"
                    py="2"
                    onClick={() => setIsSelected(false)}
                >
                    <Icon as={RiArrowRightSLine}
                        color="brand.white"
                        height="100%"
                        fontSize={27}
                    /> 
                    <Text
                        fontSize={18}
                        color="brand.white"
                    >
                        {title}
                    </Text>
                </Flex>


                <Stack>
                    {
                        subMenu.map((e,i) => {
                            return(
                                <NavLink href={"#"+e}>
                                    <Flex alignItems="center"
                                        py="2" px='4'
                                    >
                                        <Icon as={RiArrowRightSLine}
                                            color="brand.white"
                                            height="100%"
                                            fontSize={22}
                                        /> 
                                        <Text
                                            fontSize={17}
                                            color="brand.white"
                                        >
                                            {e}
                                        </Text>
                                    </Flex>
                                </NavLink>
                                    
                            )
                        })
                    }
                </Stack>
            </Stack>

        );
    }
    

}