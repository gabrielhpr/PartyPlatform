import { Flex, Input, Text, Link as NavLink, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CreateAdLayoutProps {
    question: string;
    subTitle?: string;
    lastStep?: boolean;
    children: ReactNode;
    handleNextStep: Function;
    handlePreviousStep: Function;
}


export function RegisterFormLayout({ question, subTitle, lastStep=false, children, handleNextStep, handlePreviousStep }: CreateAdLayoutProps) {
    return (
        <Flex
            height="100vh"
            width="100vw"
            alignItems="center"
            justifyContent="center"
        >
            {/* Pergunta */}
            <Flex height="100%" width="45%"
                justifyContent="center" alignItems="center"
                direction="column"
                bg="brand.blue"
            >
                <Text as="h2"
                    color="brand.white"
                    fontSize={40}
                    fontWeight={700}
                    textAlign="center"
                    width="70%"
                >
                    { question }
                </Text>

                <Text display={!subTitle ? "none" : ""}
                    as="h4"
                    color="brand.white"
                    fontSize={20}
                    fontWeight={700}
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
                <Flex height="92%" alignItems="center"
                    justifyContent="center"
                >
                    { children }
                </Flex>

                {/* Footer - Voltar, Avançar */}
                <Flex justifyContent="space-between"
                    alignItems="center"
                    height="8%"
                    bg="brand.pink"
                    py="4"
                    px="10"
                >
                    <NavLink>
                        <Text as="h4" fontSize={20} color="brand.white"
                            onClick={handlePreviousStep}
                        >
                            Voltar
                        </Text>
                    </NavLink>

                    <NavLink>
                        <Button bg="brand.yellow"
                            color="brand.white_45"
                            py="6"
                            px="6"
                            fontSize={20}
                            onClick={handleNextStep}
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

            </Flex>
        </Flex>
    );
}