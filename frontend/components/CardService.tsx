import { Flex, Text, Button, Icon, Box } from "@chakra-ui/react";
import Image from 'next/image'
import { RiMapPin2Fill, RiMoneyDollarCircleFill, RiPriceTag3Fill, RiStarSFill } from 'react-icons/ri';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import FotoInfantilFem from '../assets/imgs/festaInfantilFeminino1.jpg';
import FotoInfantilMasc from '../assets/imgs/festaInfantilMasculino1.jpg';


interface CardServiceProps {
    name: string;
    location: string;
    classification?: string;
    rangeOfPeople: string;
    price: string;
    photos: string[];
    handleOnClick: (ev: any) => void;
}



export function CardService( { name, location, classification, rangeOfPeople, price, photos, handleOnClick } : CardServiceProps ) {
    //let photo = [FotoDebutante, FotoInfantilFem, FotoInfantilMasc];
    
    
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
            position='relative'
            _hover={{bg: 'rgba(0,0,0,0.1)'}}
            
        >
            {/* 
            <Flex 
                h='21.3vw' 
                //overflow='hidden'
                borderTopRadius={8}
            >
            
            */}
                <Carousel
                    //height='21.3vw'
                    //autoPlay={true}
                    infiniteLoop
                    transitionTime={400}
                    //interval={4000}
                    showThumbs={false}
                    showArrows={true}
                    showIndicators={true}
                    
                >

                        {
                            photos.map((image, i) => {
                                return (
                                        <Box
                                            key={i}
                                            h='21.3vw' 
                                            overflow='hidden'
                                            borderTopRadius={8}
                                            //w='100vw'
                                            justifyContent='center'
                                            alignItems='center'
                                            position='relative'
                                            onClick={handleOnClick}
                                            cursor='pointer'
                                        >
                                            <Image
                                                src={`http://localhost:5000/images/enterprise/${image}`}
                                                //height={100}
                                                //height={100}
                                                //width='auto'
                                                layout='fill'
                                                objectFit='cover'
                                                priority={true}
                                                //objectPosition=
                                            /> 
                                        </Box>
                                )
                            })
                        }
                    
                </Carousel>
                {/*
                <Image 
                    src={picture}
                    objectFit="cover"
                />
            </Flex>
                */}

        

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