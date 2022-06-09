import { Flex, Stack, Link as NavLink, Icon, Text, Divider, 
    Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { LeftMenuItemMyBusiness } from "./LeftMenuItem";
import Image from 'next/image';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { typeOfServicesIcons } from "../../../utils/typeOfParties";

interface LeftMenuEditProps {
    propertyName: string;
    serviceCategory: string;
    serviceSpecificCategory: string;
    srcImage?: string;
    menuOptions: { 
        [key: string]: {
            value: string,
            textToShow: string
        }
    };
    selectedOption: string;
    handleOnClick: (event: any) => void;
    w?: {base: string, lg: string};
}

export function LeftMenuMyBusiness({propertyName, serviceCategory, serviceSpecificCategory, srcImage, menuOptions, selectedOption, handleOnClick, w, ...rest }: LeftMenuEditProps) {
    
    return (
        <Flex 
            //position='sticky'
            //top={5}
            h='auto'
            bg="brand.dark_blue"
            borderLeftRadius={8}
            borderRightRadius={{base:8, lg:0}}
            direction='column'
            w={w}
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
                alignItems='center'
                justifyContent='center'
            >
                <Icon as={typeOfServicesIcons[serviceCategory][serviceSpecificCategory].icon} 
                    color='brand.white' 
                    fontSize={{base: 110, lg: 105}}
                />
            </Flex>

            <Flex bg="brand.red"  height={2}/>
            
            {/* MOBILE MENU */}
            <Flex
                display={{base:'flex', lg:'none'}}
                alignItems='center'
                w={{base:'90%'}}
                //h={{base:'10vh'}}
                py='1'
            >
                <AliceCarousel
                    autoPlay={false}
                    autoHeight={true}
                    responsive={{
                        0: {items:1.5},
                        1024: {items:5}
                    }}
                    disableDotsControls={true}
                    disableButtonsControls={true}
                    mouseTracking
                    items={
                        Object.values(menuOptions).map((el, index) => {
                            return (
                                <Button
                                    //h={{base:'5vh'}}
                                    py='8'
                                    w='90%'
                                    my='1'
                                    mx='1'
                                    key={index}
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    bg='rgba(255,255,255,0.95)'
                                    _hover={{bg:'brand.yellow'}}
                                    onClick={handleOnClick}
                                    value={el.value}
                                    
                                >
                                    <Flex w='100%'
                                        h='100%'
                                        direction='column'
                                        alignItems='center'
                                        justifyContent='space-evenly'
                                        py='4'
                                    >
                                        <Text
                                            w='90%'
                                            whiteSpace='break-spaces' 
                                        >
                                            {el.textToShow}
                                        </Text>
                                    </Flex>
                                </Button>
                            );
                        })
                    }
                />
            
            </Flex>

            
            {/* DESKTOP MENU */}
            <Flex 
                direction='column'
                display={{base:'none', lg:'flex'}}

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