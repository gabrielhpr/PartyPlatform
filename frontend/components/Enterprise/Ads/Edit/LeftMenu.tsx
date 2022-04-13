import { Flex, Stack, Link as NavLink, Icon, Text, Divider, 
    Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { LeftMenuItemEdit } from "./LeftMenuItem";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Image from 'next/image';

interface LeftMenuEditProps {
    propertyName: string;
    srcImage: string;
    stateChanger: Function;
    rest: any;
}



export function LeftMenuEdit({propertyName, srcImage, stateChanger, ...rest }: LeftMenuEditProps) {
    
    const menuItems = ['Detalhes do anúncio'];
    
    return (
        <Flex 
            position={{base:'relative', lg:'sticky'}}
            top={5}
            h={{base:'auto', lg:'98vh'}}
            bg="brand.dark_blue"
            color='brand.dark_blue'
            borderLeftRadius={8}
            borderRightRadius={{base:8, lg:0}}
            direction='column'
            {...rest}
        >
            <Flex justifyContent="flex-start"
                alignItems="center"
            >
                <NavLink display="flex" href="/Enterprise/ads">
                    <Icon as={RiArrowLeftSLine}
                        color="brand.white"
                        fontSize={30}
                    />
                </NavLink>
                
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

            {/* IMAGE */}
            <Flex
                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                borderRadius={8} 
                height={250}
                width="100%"
                position='relative'
                display={{base:'none', lg:'flex'}}
            >
                <Image 
                    src={srcImage}
                    layout='fill'
                    objectFit="cover"
                />
            </Flex>

            {/* MOBILE MENU */}
            <Flex
                display={{base:'flex', lg:'none'}}
                alignItems='center'
                w={{base:'90%'}}
                h={{base:'10vh'}}
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
                        menuItems.map((el, index) => {
                            return (
                                <Button
                                    h={{base:'5vh'}}
                                    w='90%'
                                    my='1'
                                    mx='1'
                                    key={index}
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    bg='rgba(255,255,255,0.95)'
                                    _hover={{bg:'brand.yellow'}}
                                    onClick={() => stateChanger(el)}
                                    
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
                                            {el}
                                        </Text>
                                    </Flex>
                                </Button>
                            );
                        })
                    }
                />
            
            </Flex>


            <Flex bg="brand.red"  height={2}/>
            
            {/* MENU ITEMS */}
            <Flex 
                direction='column'
                display={{base:'none', lg:'flex'}}
            >
                <LeftMenuItemEdit
                    title={menuItems[0]}
                    subMenu={[]}
                    selectedState={true}
                />
                <Divider color="white"/>
                           
            </Flex>

        </Flex>
    );
}