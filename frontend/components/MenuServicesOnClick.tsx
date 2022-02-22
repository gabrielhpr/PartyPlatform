import { Button, Flex, Text } from "@chakra-ui/react";






export function MenuServicesOnClick() {
    return (
        <Flex direction='column' h={300} flexWrap='wrap'

        >

            <Button 
                w='30%'
                fontWeight={600}
                bg='white'
            >
                Festa Infantil
            </Button>

            <Button 
                w='30%'
                fontWeight={600}
                bg='white'
            >
                Espaço
            </Button>

            <Button 
                w='30%'
                fontWeight={500}
                bg='white'
            >
                Buffet
            </Button>
           


            
        </Flex>
    );
}