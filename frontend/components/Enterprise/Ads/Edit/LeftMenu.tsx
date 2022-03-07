import { Flex, Stack, Link as NavLink, Icon, Text, Divider, 
    Box, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { LeftMenuItemEdit } from "./LeftMenuItem";
import Image from 'next/image';

interface LeftMenuEditProps {
    propertyName: string;
    srcImage: string;
    stateChanger: Function;
    rest: any;
}


export function LeftMenuEdit({propertyName, srcImage, stateChanger, ...rest }: LeftMenuEditProps) {
    
    
    return (
        <Flex 
            position='sticky'
            top={5}
            h='90vh'
            bg="brand.dark_blue"
            borderTopLeftRadius={8}
            borderBottomLeftRadius={8}
            direction='column'
            {...rest}
        >
            <Flex justifyContent="flex-start"
                alignItems="center"
            >
                <NavLink display="flex" href="/ads">
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

            <Flex
                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                borderRadius={8} 
                height={250}
                width="100%"
                position='relative'
            >
                <Image 
                    src={srcImage}
                    layout='fill'
                    objectFit="cover"
                />
            </Flex>

            <Flex bg="brand.red"  height={1}/>
            
            <Flex 
                direction='column'

            >
                <LeftMenuItemEdit
                    title="Detalhes do anúncio"
                    subMenu={["Fotos","Informações básicas do anúncio"
                    ]}
                    selectedState={true}
                />
                <Divider color="white"/>

                
                
                <LeftMenuItemEdit 
                    title="Preço"
                    subMenu={["Preço"]}
                />
                <Divider color="white"/>


                <LeftMenuItemEdit 
                    title="Políticas e Regras"
                    subMenu={["Políticas e Regras"]}
                />
                <Divider color="white"/>
               

            </Flex>

        </Flex>
    );
}