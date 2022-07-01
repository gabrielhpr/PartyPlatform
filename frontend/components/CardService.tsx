import { Flex, Text, Button, Icon, Box } from "@chakra-ui/react";
import Image from 'next/image'
import { AiOutlinePicture } from "react-icons/ai";
import { RiMapPin2Fill, RiMoneyDollarCircleFill, RiPriceTag3Fill, RiStarSFill } from 'react-icons/ri';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


interface CardServiceProps {
    name: string;
    location: string;
    classification?: string;
    rangeOfPeople: string;
    price: string;
    photos: string[];
    borderTop?: boolean;
    handleOnClick: (ev: any) => void;
}



export function CardService( { name, location, classification, rangeOfPeople, price, photos, borderTop=true, handleOnClick } : CardServiceProps ) {
    //let photo = [FotoDebutante, FotoInfantilFem, FotoInfantilMasc];
    
    return (
        <Flex
            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
            borderRadius={8} 
            borderTopRadius={borderTop==true ? 8 : 0}
            direction='column'
            //justifyContent='center'
            //alignItems='flex-start'
            bg='white'
            //h={{base:'50vh', lg:'42vh'}}
            h={{base:385, lg: 385}}
            //w={{base:'90vw', lg:'30vw', xl:'20vw'}}
            w={{base:'85vw', sm: '65vw', md: '50vw', lg:'30vw', xl:'20vw'}}

            position='relative'
            _hover={{bg: 'rgba(0,0,0,0.1)'}}
        >
            
            <Carousel
                infiniteLoop={false}
                transitionTime={400}
                showThumbs={false}
                showArrows={true}
                showIndicators={true}
            >
                {
                    photos.map((image, i) => {
                        // The last picture
                        if( (photos.length - 1) == i ) {
                            //console.log('entrou no last');
                            return (
                                <Box
                                    key={i}
                                    //h={{base:'40vh', lg:'32vh'}}
                                    h={{base: 300, lg: 300}}
                                    overflow='hidden'
                                    borderTopRadius={borderTop==true ? 8 : 0}
                                    justifyContent='center'
                                    alignItems='center'
                                    position='relative'
                                    onClick={handleOnClick}
                                    cursor='pointer'
                                    bg='rgba(0,0,0,0.5)'
                                >
                                    <Flex
                                        w='100%'
                                        h='100%'
                                        bg='rgba(0,0,0,0.4)'
                                        position='relative'
                                        zIndex={4}
                                        direction='column'
                                        alignItems='center'
                                        justifyContent='center'
                                        //zIndex={4}
                                    >
                                        <Icon as={AiOutlinePicture}
                                            fontSize={52}
                                            color='brand.white'
                                        />
                                        <Button 
                                            bg='rgba(0,0,0,0)'
                                            color='brand.white'
                                            w='70%'
                                            position='absolute'
                                            top='50%'
                                            left='50%'
                                            transform='translate(-50%, 80%)'
                                            fontSize={18}
                                            _hover={{bg:'rgba(0,0,0,0)'}}
                                        >
                                            Ver mais fotos
                                        </Button>
                                    </Flex>

                                    <Image
                                        unoptimized
                                        src={image}
                                        layout='fill'
                                        objectFit='cover'
                                        priority={true}
                                    /> 
                                </Box>
                            )
                        }
                        else {
                            return (
                                <Box
                                    key={i}
                                    //h={{base:'40vh', lg:'32vh'}}
                                    h={{base:300, lg:300}}
                                    overflow='hidden'
                                    borderTopRadius={borderTop==true ? 8 : 0}
                                    justifyContent='center'
                                    alignItems='center'
                                    position='relative'
                                    onClick={handleOnClick}
                                    cursor='pointer'
                                >
                                    <Image
                                        unoptimized
                                        src={image}
                                        layout='fill'
                                        objectFit='cover'
                                        priority={true}
                                    /> 
                                </Box>
                            )
                        }
                    })
                }
                
            </Carousel>
                


            <Flex 
                //h={{base:'10vh',lg:'10vh'}}
                h={{base:80, lg:80}}
                direction='column'
                alignItems='center'
                justifyContent='center'
                //py='1'
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
                        w='75%'
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='clip'
                        fontSize={22}
                        fontWeight={500}
                    >
                        { name }
                    </Text>


                    <Flex alignItems='center' w='100%'>
                        {
                            classification != '0'
                            &&
                            <Flex alignItems='center'> 
                                <Icon as={RiStarSFill}
                                    color='brand.yellow_50'
                                    fontSize={{base:20, lg:21}}
                                />
                                <Text
                                    fontSize={{base: 17, lg: 16}}
                                    ml='1'
                                >
                                    { classification }
                                </Text>
                            </Flex>
                        }
                        <Text 
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='clip'
                            ml='3'
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