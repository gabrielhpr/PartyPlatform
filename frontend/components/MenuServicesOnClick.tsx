import { Button, Flex, Text } from "@chakra-ui/react";



interface MenuServicesOnClickProps {
    handlePreviousStep: Function;
    handleClick: (event: any) => {};
}


export function MenuServicesOnClick( { handlePreviousStep, handleClick }: MenuServicesOnClickProps ) {
    return (
        <Flex direction='column' h={300} flexWrap='wrap'

        >
            <Button 
                onClick={handlePreviousStep}
            >
                Voltar
            </Button>
            <Button 
                w='30%'
                fontWeight={600}
                bg='white'
                name='service'
                value='FestaInfantil'
                onClick={handleClick}
            >
                Festa Infantil
            </Button>

            <Button 
                w='30%'
                fontWeight={600}
                bg='white'
                name='service'
                value='Espaco'
                onClick={handleClick}
            >
                Espaço
            </Button>

            <Button 
                w='30%'
                fontWeight={500}
                bg='white'
                name='service'
                value='Buffet'
                onClick={handleClick}
            >
                Buffet
            </Button>
           


            
        </Flex>
    );
}