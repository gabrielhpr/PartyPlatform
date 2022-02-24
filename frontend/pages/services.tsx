import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from 'next/image'
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { CardService } from "../components/CardService";




export default function ServicesPage() {
    return (
        <Box h='100vh' w='100vw'>


            <Flex w='90%' h='90%' >
                {/* Sidemenu including filters */}
                <Flex w='20%' h='100%' bg='yellow'>
                    <Text>Sidemenu</Text>
                </Flex>

                {/* Contain all cards */}
                <Flex w='80%' h='100%' bg='white' >

                    <Flex w='100%' flexWrap='wrap'
                        justifyContent='center'
                    >

                        {/* Visualization options */}
                        <Flex w='80%' bg='white' justifyContent='space-between'
                            alignItems='center'
                        >
                            <Text>100 resultados encontrados</Text>
                            <Flex>
                                <Button>Galeria</Button>
                                <Button>Lista</Button>
                            </Flex>
                        </Flex>

                        {/* List of Cards */}
                        <Flex w='80%' bg='white'
                            py='5' flexWrap='wrap'
                            justifyContent='space-between'
                            rowGap={10}
                        >
                            {
                            [1,2,3,4,5,6,7].map((el, i) => {
                                    return (
                                        <CardService 
                                            name='Espaço alvorada'
                                            location='São Paulo - SP'
                                            classification='5 stars'
                                            rangeOfPeople='10-100'
                                            price='R$ 500,00'
                                            picture={FotoDebutante} 

                                        />
                                    );
                                })
                            }

                        </Flex>
                    </Flex>

                </Flex>
            </Flex>

            <Flex bg='black'
                h={300}
                w='100%'
            >

            </Flex>
        </Box>
    );
}