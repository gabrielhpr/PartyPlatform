import { Button, Flex, Text } from "@chakra-ui/react";
import { typeOfServices } from '../utils/typeOfParties';


interface MenuServicesOnClickProps {
    partyType: string;
    handlePreviousStep: Function;
    handleClick: (event: any) => {};
}


export function MenuServicesOnClick( { partyType, handlePreviousStep, handleClick }: MenuServicesOnClickProps ) {
    
    return (
        <Flex direction='column' h={300} flexWrap='wrap'
            alignItems='flex-start' justifyContent='flex-start'

        >
            <Button 
                w='50%'
                onClick={handlePreviousStep}
            >
                Voltar
            </Button>

            {
                typeOfServices[partyType]?.services.map((el, index) => {
                    return (
                        <Button 
                            w='50%'
                            fontWeight={500}
                            bg='white'
                            name='service'
                            value={el.parent+'-'+el.value}
                            onClick={handleClick}
                        >
                            <Text
                                textAlign='left'
                                w='80%'
                            >
                                {el.textToShow}
                            </Text>
                        </Button>
                    )
                })
            }
            
        </Flex>
    );
}