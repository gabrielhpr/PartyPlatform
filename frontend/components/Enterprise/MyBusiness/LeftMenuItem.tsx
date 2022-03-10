import { Box, Divider, Flex, Icon, Stack, Text, Link as NavLink, Button } from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

interface LeftMenuItemEditProps {
    title: string;
    value: string;
    subMenu?: string[];
    handleOnClick: () => {};
    selectedOption: string;
}

export function LeftMenuItemMyBusiness({title, value, subMenu, handleOnClick, selectedOption, ...rest}: LeftMenuItemEditProps) {
    /* 
        if(!isSelected) {
            return (
    */
    return (
        <Button
            justifyContent='flex-start'
            //onClick={() => setIsSelected(true)}
            onClick={handleOnClick}
            value={value}
            borderRadius={0}
            fontSize={18}
            bg={value == selectedOption ? 'brand.light_blue' : 'brand.dark_blue'}
            _hover={value == selectedOption ? {bg: 'brand.light_blue'} : {bg: 'black'} }
            color="brand.white"
            leftIcon={
                <Icon as={RiArrowRightSLine}
                    color="brand.white"
                    height="100%"
                    fontSize={27}
                /> 
            }
            {...rest}
        >
            {title}
        </Button>
    );
    /* 
            );
        }
    else {
        return (
            <Stack w='20vw'>
                <Flex alignItems="center"
                    py="2"
                    onClick={(event: any) => {
                            setIsSelected(false);
                            handleOnClick(event);
                        }
                    }
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

                {
                subMenu
                ?
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
                :
                <>
                </>
                }
            </Stack>

        );
    }
    */
    

}