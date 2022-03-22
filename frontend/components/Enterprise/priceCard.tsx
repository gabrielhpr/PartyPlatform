import { Button, Flex, ListItem, Text, UnorderedList, Link as NavLink } from "@chakra-ui/react"

interface PriceCardProps {
    title: string;
    price: number;
    functionalities: string[];
}

export function PriceCard({ title, price, functionalities}: PriceCardProps) {

    return (
        <Flex direction="column" 
            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
            borderRadius={8} 
            width={300}
            height={350}
            bg="brand.white"
        >
            <Flex bg="brand.dark_blue" py="5"  borderTopRadius={8}>
                <Text textAlign="center"
                    width="100%" color="brand.white" fontWeight={700}
                    fontSize={25}
                >
                    {title}
                </Text>
            </Flex>

            <Flex direction="column" justifyContent="center" 
                alignItems="center" 
            >
                <Flex alignItems="center" p="3">
                    <Text textAlign="center"
                        fontWeight={600} fontSize={35}
                    >
                        R$ {price}
                    </Text>

                    <Text mt="3" fontWeight={500}>
                        / mês
                    </Text>
                </Flex>

                {/* 
                <NavLink href="/Auth/register-first-step" width="70%">
                    <Button width="100%"
                        borderRadius={17}
                        bg="brand.red"
                        color="brand.white"
                    >
                        TESTE 15 DIAS GRÁTIS
                    </Button>
                </NavLink>                
                */}

                <Flex my="5" >
                    <UnorderedList fontSize={17}>
                        {
                            functionalities.map((element, i) => {
                                return (
                                    <ListItem>
                                        {element}   
                                    </ListItem>
                                )
                            })
                        }
                    </UnorderedList>
                </Flex>
            </Flex>
        </Flex> 
    );

}