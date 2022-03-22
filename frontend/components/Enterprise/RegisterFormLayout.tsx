import { Flex, Input, Text, Link as NavLink, Button, Icon, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { ReactNode } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Header } from "../Header";

interface CreateAdLayoutProps {
    question: string;
    subTitle?: string;
    lastStep?: boolean;
    style?: string;
    showFooterMenu?: boolean;
    children: ReactNode;
    handleNextStep: Function;
    handlePreviousStep: Function;
}


export function RegisterFormLayout({ question, subTitle, lastStep=false, 
    style='yellow',
    showFooterMenu=true,
    children, 
    handleNextStep, handlePreviousStep 
}: CreateAdLayoutProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const routerNext = useRouter();
    
    return (
        <Flex direction='column'
            h='100vh'
            w='100vw'
            justifyContent='space-between'
        >            
            <Flex
                h='100%'
                w='100%'
                alignItems="center"
                justifyContent="center"            
            >
                {/* Pergunta */}
                <Flex height="100%" width="45%"
                    justifyContent="center" alignItems="center"
                    direction="column"
                    bg={style=='yellow' ? 'brand.yellow' : 'brand.dark_blue'}
                >
                    <Text as="h2"
                        color={style=='yellow' ? 'brand.dark_blue' : 'brand.white'}
                        fontSize={40}
                        fontWeight={500}
                        textAlign="center"
                        width="70%"
                    >
                        { question }
                    </Text>

                    <Text display={!subTitle ? "none" : ""}
                        as="h4"
                        color={style=='yellow' ? 'brand.dark_blue' : 'brand.white'}
                        fontSize={20}
                        fontWeight={400}
                        textAlign="center"
                        width="60%"
                        mt="4"
                    >
                        { subTitle }
                    </Text>
                </Flex>

                {/* Input */}
                <Flex height="100%" width="55%"
                    justifyContent="space-between" alignItems="space-between"
                    direction="column"
                    bg="brand.white"
                >
                    {/* Close button */}
                    <Flex justifyContent='flex-end'>
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
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Vou ficar
                                        </Button>
                                        <Button colorScheme='red' ml={3} 
                                            onClick={() => {   
                                                routerNext.push("/");
                                        }}
                                        >
                                            Sair
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Flex>

                    <Flex height={showFooterMenu ? "92%" : "100%"}
                        alignItems="center"
                        justifyContent="center"
                    >
                        { children }
                    </Flex>

                    {/* Footer - Voltar, Avançar */}
                    {
                        showFooterMenu
                        ?
                        <Flex justifyContent="space-between"
                            alignItems="center"
                            height="8%"
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
                                    bg={style=='yellow' ? 'brand.yellow' : 'brand.dark_blue'}
                                    color={style=='yellow' ? 'brand.dark_blue' : 'brand.white'}
                                    py="6"
                                    px="6"
                                    fontSize={20}
                                    onClick={handleNextStep}
                                    _hover={style=='yellow' ? {bg:'brand.yellow_50'} : {bg:'brand.white_40'}}
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
                        :
                        <>
                        </>
                    }

                </Flex>
            </Flex>
        </Flex>

    );
}