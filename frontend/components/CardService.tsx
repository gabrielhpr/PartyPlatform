import { Flex, Text, Button, Icon, Box } from "@chakra-ui/react";
import Image from 'next/image'
import { AiOutlinePicture } from "react-icons/ai";
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
            h={{base:'50vh', lg:'42vh'}}
            w={{base:'90vw', lg:'30vw', xl:'20vw'}}
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
                            console.log('entrou no last');
                            return (
                                <Box
                                    key={i}
                                    h={{base:'40vh', lg:'32vh'}}
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
                                        src={`http://localhost:5000/images/enterprise/${image}`}
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
                                    h={{base:'40vh', lg:'32vh'}}
                                    overflow='hidden'
                                    borderTopRadius={borderTop==true ? 8 : 0}
                                    justifyContent='center'
                                    alignItems='center'
                                    position='relative'
                                    onClick={handleOnClick}
                                    cursor='pointer'
                                >
                                    <Image
                                        src={`http://localhost:5000/images/enterprise/${image}`}
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
                h={{base:'10vh',lg:'10vh'}}
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
                        w='75%'
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='clip'
                        fontSize={22}
                        fontWeight={500}
                    >
                        { name }
                    </Text>

                    {
                        classification != '0'
                        &&
                        <Flex alignItems='center' w='25%'>
                            <Icon as={RiStarSFill}/>
                            <Text>
                                { classification }
                            </Text>
                        </Flex>
                    }

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