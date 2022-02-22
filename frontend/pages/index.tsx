import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import FotoInfantilFem from '../assets/imgs/festaInfantilFeminino1.jpg';
import FotoInfantilMasc from '../assets/imgs/festaInfantilMasculino1.jpg';

import { useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';




export default function HomePage() {
    let photo = [FotoDebutante, FotoInfantilFem, FotoInfantilMasc]
    const [photoNum, setPhotNum] = useState(0);

    function handleClick() {
    let photoAux = photoNum;
    photoAux = (photoAux + 1) % photo.length;
    setPhotNum( photoAux );
    }

    return (
        <Box fontSize={32}>
        
            {/* Header */}
            {/*************/}
            <Flex bg='purple'
                w='100%' h={75}
            >
            </Flex>
            
            {/* Carroussel */}
            <Flex 
                h='70vh' 
                w='100vw'
                //justifyContent='center'
                //alignItems='center'
                //position='absolute'
                //bg='black'
            >
                
                <Flex 
                    width='100vw' 
                    height='70vh' 
                    alignItems='center'
                    justifyContent='center'
                    bg='rgba(0,0,0,0.25)' zIndex={1}
                    position='absolute'
                >
                    
                    <Flex
                        direction='column' justifyContent='center'
                        width='80%' 
                    >

                        <Text as='h2' fontSize={42} color='white'
                            zIndex={2} fontWeight={900} textAlign='center'
                            mb='6'
                        >
                            Tudo para a sua festa de aniversário!
                        </Text>

                        <Flex 
                            width={700}
                            height={16}
                            borderRadius={8}
                            alignItems='center'
                            mx='auto'
                            zIndex={2}
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.65)"
                        >
                            <Input placeholder='O que você procura ?'
                                bg='white'
                                w='40%'
                                h='100%'
                                borderRightRadius={0}
                                _focus={{outline:'none'}}
                            />
                            <Input placeholder='Onde ?'
                                bg='white'
                                w='40%'
                                h='100%'
                                borderRadius={0}
                                _focus={{outline:'none'}}
                            />
                            <Button
                                w='20%'
                                h='100%'
                                //py='7'
                                borderLeftRadius={0}
                                bg='purple'
                                color='white'
                                fontSize={18}
                                fontWeight={900}
                                _focus={{outline:'none'}}
                            >
                                Pesquisar
                            </Button>
                        </Flex>

                    </Flex>
                </Flex>
                    
                <Carousel
                    width='100vw'
                    autoPlay={true}
                    infiniteLoop={true}
                    transitionTime={800}
                    interval={4000}
                >
                    <Box
                        h='70vh' 
                        w='100vw'
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                    >
                        <Image
                            src={photo[ 2 ]}
                            //height={100}
                            //height={100}
                            //width='auto'
                            layout='fill'
                            objectFit='cover'
                            //objectPosition=
                        /> 
                    </Box>

                    <Box
                        h='70vh' 
                        w='100vw'
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                    >
                        <Image
                            src={photo[ 0 ]}
                            //height={100}
                            //height={100}
                            //width='auto'
                            layout='fill'
                            objectFit='cover'
                            //objectPosition=
                        /> 
                    </Box>

                    <Box
                        h='70vh' 
                        w='100vw'
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                    >
                        <Image
                            src={photo[ 1]}
                            //height={100}
                            //height={100}
                            //width='auto'
                            layout='fill'
                            objectFit='cover'
                            //objectPosition=
                        /> 
                    </Box>
                </Carousel>
            </Flex>

            <Flex bg='purple'
                w='100%' h={75}
            >
            </Flex>   
        </Box>
    )
}
