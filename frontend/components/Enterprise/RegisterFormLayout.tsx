import { Flex, Input, Text, Link as NavLink, Button, Icon, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { RiCloseFill } from "react-icons/ri";
import { FlashMessageComponent } from "../FlashMessageComponent";
import { Header } from "../Header";

interface CreateAdLayoutProps {
    question: string;
    subTitle?: string;
    lastStep?: boolean;
    style?: string;
    showFooterMenu?: boolean;
    children: ReactNode;
    handleNextStep: (event:any) => void;
    handlePreviousStep: (event: any) => void;
}


export function RegisterFormLayout({ question, subTitle, lastStep=false, 
    style='yellow',
    showFooterMenu=true,
    children, 
    handleNextStep, 
    handlePreviousStep
}: CreateAdLayoutProps) {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const routerNext = useRouter();
    
    function handleRedirect() {
        if( routerNext.pathname == '/Enterprise/ads/create' ) {
            routerNext.push('/Enterprise/ads');
        }
        else if( routerNext.pathname == '/Enterprise/Auth/register' ) {
            routerNext.push('/Enterprise/enterpriseAccess');
        }
        else {
            routerNext.push('/');
        }
    }

    return (
                  
        <Flex
            h='100vh'
            w='100vw'
            //flexWrap='wrap'  
            direction={{base:'column', lg:'row'}}
            //justifyContent={{base:'space-between', lg:'space-between'}}
        >
            <FlashMessageComponent/>

            {/* Pergunta */}
            <Flex 
                height={{base:"30%", lg:"100%"}} 
                width={{base:"100%", lg:"45%"}}
                overflowY='scroll'
                justifyContent={{base:"space-between", lg:"center"}}
                alignItems="center"
                direction="column"
                bg={style=='yellow' ? 'brand.yellow' : 'brand.dark_blue'}
                pb={{base:'10', lg:'0'}}
            >
                
                {/* Close button - ONLY FOR MOBILE*/}
                <Flex 
                    w='100%'
                    textAlign='right'
                    display={{lg:'none'}}
                >
                    <Button 
                        bg='none'
                        color={style=='yellow' ? 'brand.dark_blue' : 'brand.white'}
                        py='2' px='2'
                        my='2' mx='2'
                        //ml='50'//ml='auto'
                        _hover={{bg:'none', textColor: 'brand.red'}}
                        _focus={{outline:'none'}}
                        onClick={onOpen}
                    >
                        <Icon as={RiCloseFill} fontSize={32} />
                    </Button>

                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Tem certeza que deseja sair ?
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Você irá perder todo o
                                    seu progresso
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                        <Flex
                                            w='100%'
                                            justifyContent='space-between'
                                        >
                                            <Button colorScheme='red'
                                                onClick={handleRedirect}
                                                w='25%'
                                            >
                                                Sair
                                            </Button>
                                            <Button ref={cancelRef} onClick={onClose}
                                                w='75%'
                                                ml={3}
                                            >
                                                Vou ficar
                                            </Button>
                                        </Flex>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Flex>

                <Text as="h2"
                    color={style=='yellow' ? 'brand.dark_blue' : 'brand.white'}
                    fontSize={{base:25,lg:40}}
                    fontWeight={500}
                    textAlign="center"
                    width={{base:"90%", lg:"70%"}}
                >
                    { question }
                </Text>

                <Text display={!subTitle ? "none" : ""}
                    as="h4"
                    color={style=='yellow' ? 'brand.dark_blue' : 'brand.white'}
                    fontSize={{base:17, lg:20}}
                    fontWeight={400}
                    textAlign="center"
                    width={{base:"90%", lg:"60%"}}
                    mt="4"
                >
                    { subTitle }
                </Text>
            </Flex>

            {/* Input */}
            <Flex 
                height={{base:"70%", lg:"100%"}}
                width={{base:"100%", lg:"55%"}}
                bg="brand.white"
                //justifyContent='center'
                //alignItems='center'
                //mx='auto'
                
            >
                <Flex 
                    w='100%'
                    h='100%'
                    justifyContent="space-between" 
                    direction="column"
                >
                       
                    {/* Close button - ONLY FOR DESKTOP*/}
                    <Flex justifyContent='flex-end'
                        h='4%'
                        display={{base:'none', lg:'flex'}}
                    >
                        <Button 
                            bg='none'
                            py='2' px='2'
                            my='2' mx='2'
                            _hover={{bg:'none', textColor: 'brand.red'}}
                            _focus={{outline:'none'}}
                            onClick={onOpen}
                        >
                            <Icon as={RiCloseFill} fontSize={30} />
                        </Button>

                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Tem certeza que deseja sair ?
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Você irá perder todo o
                                        seu progresso
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Flex
                                            w='100%'
                                            justifyContent='space-between'
                                        >
                                            <Button colorScheme='red' 
                                                onClick={handleRedirect}
                                                w='25%'
                                            >
                                                Sair
                                            </Button>
                                            <Button ref={cancelRef} 
                                                onClick={onClose}
                                                w='75%'
                                                ml={3}
                                            >
                                                Vou ficar
                                            </Button>
                                        </Flex>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Flex>
                    

                    <Flex 
                        //height={showFooterMenu ? "88%" : "100%"}
                        h={{base:'88%',lg:'84%'}}
                        alignItems="center"
                        justifyContent="center"
                        //overflowY={{base:'scroll',lg:'hidden'}}
                    >
                        { children }
                    </Flex>

                    {/* Footer - Voltar, Avançar */}
                    {
                        showFooterMenu
                        &&
                        <Flex justifyContent="space-between"
                            alignItems="center"
                            height={{base:"12%",lg:"8%"}}
                            bg={style=='yellow' ? 'brand.dark_blue' : 'brand.yellow'}
                            py="4"
                            px="10"
                        >
                            <NavLink
                                _hover={{textDecor: 'none'}}
                            >
                                <Text as="h4" fontSize={20} 
                                    color={style=='yellow' ? 'brand.white' : 'brand.dark_blue'}
                                    onClick={handlePreviousStep}
                                    fontWeight={600}
                                    _hover={{color:'brand.white_50'}}
                                >
                                    Voltar
                                </Text>
                            </NavLink>

                            <NavLink
                                _hover={{textDecor: 'none'}}
                            >
                                <Button 
                                    bg={style=='yellow' ? 'brand.red' : 'brand.blue'}
                                    color={style=='yellow' ? 'brand.white' : 'brand.white'}
                                    py="6"
                                    px="6"
                                    fontSize={20}
                                    onClick={handleNextStep}
                                    _hover={style=='yellow' ? {bg:'brand.red'} : {bg:'brand.blue'}}
                                >
                                    {
                                        lastStep 
                                        ?
                                        'Finalizar'
                                        :
                                        'Avançar'
                                    }
                                </Button>
                            </NavLink>
                        </Flex>
                    }
                </Flex>
            </Flex>
        </Flex>
        

    );
}