import { Flex, Input, Text, Link as NavLink, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CreateAdLayoutProps {
    question: string;
    subTitle?: string;
    children: ReactNode;
    handleNextStep: Function;
    handlePreviousStep: Function;
}


export function RegisterFormLayout({ question, subTitle, children, handleNextStep, handlePreviousStep }: CreateAdLayoutProps) {
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
                bg="brand.red"
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
                    bg="brand.dark_blue"
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
                        <Button bg="brand.red"
                            color="brand.white"
                            py="6"
                            px="6"
                            fontSize={20}
                            onClick={handleNextStep}
                        >
                            Avançar
                        </Button>
                    </NavLink>
                </Flex>

            </Flex>
        </Flex>
    );
}