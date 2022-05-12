import { Flex, Text, Link as NavLink } from "@chakra-ui/react";



interface NotAuthorizedComponentInter {
    link: string;
}

export function NotAuthorizedComponent({link}: NotAuthorizedComponentInter) {
    return (
        <Flex
            w='100%'
            h='100%'
            justifyContent='center'
            alignItems='center'
            direction='column'
        >
            <Text
                fontSize={25}
                textAlign='center'
            >
                Para ter acesso a essa página, crie uma conta ou faça login!
            </Text>

            <NavLink href={link}
                fontSize={20}
                color='blue'
                mt='5'
            >
                Ir para a página de Login e Cadastro
            </NavLink>
        </Flex>
    )
}