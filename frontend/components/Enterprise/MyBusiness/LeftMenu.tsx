import { Flex, Stack, Link as NavLink, Icon, Text, Divider, 
    Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { LeftMenuItemMyBusiness } from "./LeftMenuItem";
import Image from 'next/image';

interface LeftMenuEditProps {
    propertyName: string;
    srcImage?: string;
    menuOptions: { 
        [key: string]: {
            value: string,
            textToShow: string
        }
    };
    selectedOption: string;
    handleOnClick: () => {};
    rest: any;
}

export function LeftMenuMyBusiness({propertyName, srcImage, menuOptions, selectedOption, handleOnClick, ...rest }: LeftMenuEditProps) {
    
    return (
        <Flex 
            //position='sticky'
            //top={5}
            h='auto'
            bg="brand.dark_blue"
            borderTopLeftRadius={8}
            borderBottomLeftRadius={8}
            direction='column'
            {...rest}
        >
            <Flex justifyContent="flex-start"
                alignItems="center"
            >   
                <Text as="h2"
                    mx="auto"
                    fontSize={25}
                    fontWeight={500}
                    textAlign="center"
                    color="brand.white"
                    my="3"
                >
                    {propertyName}
                </Text>
            </Flex> 

            <Flex
                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                borderRadius={8} 
                height={250}
                width="100%"
                position='relative'
            >
                {/* <Image 
                    src={srcImage}
                    layout='fill'
                    objectFit="cover"
                /> */}
            </Flex>

            <Flex bg="brand.red"  height={2}/>
            
            <Flex 
                direction='column'

            >
                <LeftMenuItemMyBusiness
                    title={Object.values(menuOptions)[0].textToShow}
                    value={Object.values(menuOptions)[0].value}
                    selectedOption={selectedOption}
                    handleOnClick={handleOnClick}
                />
                <Divider color="white"/>                
                
                <LeftMenuItemMyBusiness
                    title={Object.values(menuOptions)[1].textToShow}
                    value={Object.values(menuOptions)[1].value}
                    selectedOption={selectedOption}
                    handleOnClick={handleOnClick}
                />
                <Divider color="white"/>
            </Flex>

        </Flex>
    );
}