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
import { MenuServicesOnClick } from '../components/MenuServicesOnClick';




export default function HomePage() {
    let photo = [FotoDebutante, FotoInfantilFem, FotoInfantilMasc]
    const [photoNum, setPhotNum] = useState(0);

    const [menuPartyType, setMenuPartyType] = useState('none');
    const [menuTypeService, setMenuTypeService] = useState('none');

    function handleClick() {
        let photoAux = photoNum;
        photoAux = (photoAux + 1) % photo.length;
        setPhotNum( photoAux );
    }

    function searchFunction( event: any, menuId: string ) {
        console.log( event.target.value );
        let inputValue = event.target.value.toUpperCase();
        let menu = document.getElementById( menuId );
        let itemList = menu.getElementsByTagName("button");
        
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].innerHTML.toUpperCase().indexOf(inputValue) > -1) {
                itemList[i].style.display = "";
            } 
            else {
                itemList[i].style.display = "none";
            }
        }
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
                    bg='rgba(0,0,0,0.25)' zIndex={5}
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
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.65)"
                        >   

                            {/* Qual o tipo de festa ? */}
                            <Flex 
                                w='30%'
                                h='100%'
                            >
                                <Input placeholder='Qual o tipo de festa ?'
                                    bg='white'
                                    w='100%'
                                    h='100%'
                                    borderRightRadius={0}
                                    _focus={{outline:'none'}}
                                    onClick={() => setMenuPartyType('')}
                                />

                                {/* Menu onClick and onSearch */}
                                <Box 
                                    height={200} 
                                    width={210}
                                    overflowY="scroll"
                                    display={menuPartyType}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <Flex direction="column" id="menuServices"
                                        h='100%'
                                    >
                                        {
                                        [
                                        'Infantil', 'Debutante',
                                        'Aniversário'
                                        ].map((el, i) => {
                                            return(
                                                <Button
                                                    bg='white'
                                                    h='33%'
                                                    borderRadius={0}
                                                    _focus={{outline:'none'}}
                                                >
                                                    <Text
                                                        width='80%'
                                                        textAlign='left'
                                                        fontWeight={600}
                                                    >
                                                        {el}
                                                    </Text>
                                                </Button>
                                            );
                                        })
                                        }
                                    </Flex>
                                </Box>

                            </Flex>


                            {/* O que você procura ? */}
                            <Flex direction='column'
                                w='30%'
                                h='100%'
                            >

                                <Input placeholder='O que você procura ?'
                                    bg='white'
                                    w='100%'
                                    h='100%'
                                    borderRadius={0}
                                    _focus={{outline:'none'}}
                                    onKeyUp={(event: any) => { 
                                        if( event.target.value.length == 0 ) {
                                            setMenuTypeService('onclick');
                                        }
                                        else {
                                            setMenuTypeService('onsearch');
                                        }
                                        searchFunction(event, "menuServices");
                                    }}
                                    onClick={() => setMenuTypeService('onclick')}
                                />

                                {/* Menu onClick */}
                                <Box 
                                    height={300} 
                                    width={700}
                                    overflowY="scroll"
                                    display={menuTypeService == 'onclick' ? '' : 'none'}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <MenuServicesOnClick/>
                                </Box>



                                {/* Menu onSearch */}
                                <Box 
                                    height={400} 
                                    width={280}
                                    overflowY="scroll"
                                    display={menuTypeService == 'onsearch' ? '' : 'none'}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <Flex direction="column" id="menuServices"
                                    >
                                        {
                                        [
                                        "Acomodação móvel","Albergue", "Apartamento",
                                        "Apartamento residencial", "Bangalô",
                                        "Barco (Ferry Boat)", "Barco (House Boat)",
                                        "Boutique", "Cabana", "Cama e Café (B&Bs)",
                                        "Campings", "Casa", "Casa móvel", "Castelo",
                                        "Celeiro", "Chalé", "Chalé (Área de Camping)",
                                        "Condomínio","Cruzeiro", "Fazenda para hóspedes",
                                        "Hotel", "Hotel boutique", "Hotel para casais",
                                        "Pensão", "Pousada", "Pousada (Lodge)", "Prédio",
                                        "Rancho"
                                        ].map((el, i) => {
                                            return(
                                                <Button>{el}</Button>
                                            );
                                        })
                                        }
                                    </Flex>
                                </Box>

                            </Flex>
                            


                            <Input placeholder='Onde ?'
                                bg='white'
                                w='20%'
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
                    infiniteLoop
                    transitionTime={800}
                    interval={4000}
                    showThumbs={false}
                    z-index={3}
                >

                        {
                            photo.map((image, i) => {
                                return (
                                        <Box
                                            h='70vh' 
                                            w='100vw'
                                            justifyContent='center'
                                            alignItems='center'
                                            position='relative'
                                        >
                                            <Image
                                                src={image}
                                                //height={100}
                                                //height={100}
                                                //width='auto'
                                                layout='fill'
                                                objectFit='cover'
                                                //objectPosition=
                                            /> 
                                        </Box>
                                )
                            })
                        }
                    
                </Carousel>
            </Flex>

            <Flex bg='purple'
                w='100%' h={75}
            >
            </Flex>   
        </Box>
    )
}
