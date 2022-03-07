import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Image from 'next/image';
import { RiPriceTag3Fill, RiStarSFill } from "react-icons/ri";

interface CardAdsProps {
    name: string;
    location: string;
    typeOfParty: string;
    classification?: string;
    price: string;
    photo: string;
    handleOnClick?: (ev: any) => void;
}

export function CardAds({ name, location, typeOfParty, classification, price, photo, handleOnClick } : CardAdsProps ) {
    return (
        <Flex
            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
            borderRadius={8} 
            direction='column'
            bg='white'
            h='30.3vw'
            w='21.3vw'
            position='relative'
            _hover={{bg: 'rgba(0,0,0,0.1)'}}
        >

            <Flex justifyContent='center'
                alignItems='center'
                fontWeight={500}
                h='3vw'
            >
                { typeOfParty }
            </Flex>

            <Box
                h='21.3vw' 
                overflow='hidden'
                //borderTopRadius={8}
                justifyContent='center'
                alignItems='center'
                position='relative'
                onClick={handleOnClick}
                cursor='pointer'
            >
                <Image
                    src={`http://localhost:5000/images/enterprise/${photo}`}
                    layout='fill'
                    objectFit='cover'
                /> 
            </Box>
                               

            <Flex 
                h='6vw'
                direction='column'
                alignItems='center'
                justifyContent='center'
                py='2'
                px='3'
                onClick={handleOnClick}
                cursor='pointer'
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