import { Flex, Text, Button } from "@chakra-ui/react";
import Image from 'next/image'

interface CardServiceProps {
    name: string;
    location: string;
    classification?: string;
    rangeOfPeople: string;
    price: string;
    picture: any;
}



export function CardService( { name, location, classification, rangeOfPeople, price, picture } : CardServiceProps ) {
    return (
        <Flex
            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
            borderRadius={8} 
            direction='column'
            //justifyContent='center'
            //alignItems='flex-start'
            bg='white'
            h={400}
            w='31%'

        >
            <Flex h='55%'>
                <Image 
                    src={picture}
                />
            </Flex>
        

            <Flex direction='column'
                alignItems='center'
                justifyContent='center'
                h='45%'
                pb='2'
            >
                <Flex 
                    textAlign='center'
                    flexWrap='wrap'
                    w='80%'
                >
                    <Text
                        w='100%'
                        fontSize={22}
                        fontWeight={600}
                    >
                        { name }
                    </Text>

                    <Text w='100%'>
                        { location }
                    </Text>
                    
                    <Text w='50%'>
                        { classification }
                    </Text>
                    
                    <Text w='50%'>
                        { rangeOfPeople }
                    </Text>
                    
                    <Text w='100%'>
                        { price }
                    </Text>
                </Flex>
                <Button
                    bg='red'
                    color='white'
                    w='80%'
                >
                    Pedir orçamento
                </Button>
            </Flex>

        </Flex>
    );
}