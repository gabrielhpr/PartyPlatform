import { Flex, Text, Button, Icon, Box } from "@chakra-ui/react";
import Image from 'next/image'
import { RiMapPin2Fill, RiMoneyDollarCircleFill, RiPriceTag3Fill, RiStarSFill } from 'react-icons/ri';

interface CardServiceProps {
    name: string;
    location: string;
    classification?: string;
    rangeOfPeople: string;
    price: string;
    picture: any;
    handleOnClick: (ev: any) => void;
}



export function CardService( { name, location, classification, rangeOfPeople, price, picture, handleOnClick } : CardServiceProps ) {
    return (
        <Flex
            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
            borderRadius={8} 
            direction='column'
            //justifyContent='center'
            //alignItems='flex-start'
            bg='white'
            h='27.3vw'
            w='21.3vw'
            onClick={handleOnClick}
            position='relative'
            _hover={{bg: 'rgba(0,0,0,0.1)'}}
            cursor='pointer'
        >
            <Flex 
                h='21.3vw' 
                overflow='hidden'
                borderTopRadius={8}
            >
                 
                <Image 
                    src={picture}
                    objectFit="cover"
                />

            </Flex>
        

            <Flex 
                h='6vw'
                direction='column'
                alignItems='center'
                justifyContent='center'
                py='2'
                px='3'
            >
                <Flex 
                    textAlign='left'
                    flexWrap='wrap'
                    w='100%'
                >
                    <Text
                        w='80%'
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='clip'
                        fontSize={22}
                        fontWeight={500}
                    >
                        { name }
                    </Text>

                    <Flex alignItems='center' w='20%'>
                        <Icon as={RiStarSFill}/>
                        <Text>
                            { classification }
                        </Text>
                    </Flex>

                    <Flex alignItems='center' w='100%'>
                        <Text 
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='clip'
                        >
                            { location }
                        </Text>
                    </Flex>

                    <Flex alignItems='center' w='100%'>
                        <Icon as={RiPriceTag3Fill}/>
                        <Text 
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='clip'
                            ml='2'
                        >
                            A partir de { price }
                        </Text>
                    </Flex>
                    
                </Flex>
            </Flex>

        </Flex>
    );
}