import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import Image from 'next/image'
import { useEffect, useState } from "react";
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { CardService } from "../components/CardService";
import api from "../utils/api";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { RiFilter2Fill } from "react-icons/ri";
import { Footer } from "../components/Footer";



export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const routerNext = useRouter();

    function handleClick( el: any ) {
        console.log( el );
        const id = el.id;
        const partyType = el.partyMainFocus;

        routerNext.push({
            pathname: '/serviceProfile',
            query: { 
                id: id,
                partyType: partyType
            }
        });
    }

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        const { partyType, service, location } = routerNext.query;
       

        try {
            api.get('/services', {
                    params: {
                        partyType: partyType,
                        service: service,
                        location: location
                    }
                })
                .then((response) => {
                    setServices(response.data.services);
                    console.log(services[0]);
                })
        }
        catch( err ) {
            console.log( err );
        }
    }, [routerNext.query]);

    return (
        <Box h='100vh'>
            <Header name="" position="relative" type='oneColor' />

            {
            services.length > 0 
            ?            
                <Box w='100%' h='auto'
                >

                    {/* Contain all cards */}
                    <Flex w='100%' h='100%' bg='white' mx='auto' >

                        <Flex w='100%' flexWrap='wrap'
                            justifyContent='center'
                        >

                            {/* Visualization options */}
                            <Flex w='100%' justifyContent='center'
                                bg='white'
                                py='5'
                                position='sticky'
                                top={0}
                                zIndex={1}
                            >
                                <Flex w='90%' 
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Text
                                        fontWeight={600}
                                        fontSize={19}
                                        color='gray'
                                    >
                                        {services.length} RESULTADOS
                                    </Text>
                                    <Flex>
                                        <Button
                                            leftIcon={<Icon as={RiFilter2Fill}/>}
                                            borderRadius={11}
                                            fontSize={18}
                                            fontWeight={500}
                                            variant='outline'
                                            py='3'
                                        >
                                            Filtros
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Flex>

                            {/* List of Cards */}
                            <Flex w='90%' bg='white'
                                mx='auto'
                                py='5' flexWrap='wrap'
                                justifyContent='space-between'
                                rowGap={8}
                            >
                                {
                                services.map((el:any, i:any) => {
                                        return (
                                            <CardService 
                                                key={i}
                                                name={el.enterpriseName}
                                                location={el.city+', '+el.state}
                                                classification='5'
                                                rangeOfPeople='10-100'
                                                price='R$ 500,00'
                                                photos={el.photos.split(",")}
                                                handleOnClick={() => handleClick(el)} 
                                            />
                                        );
                                    })
                                }

                            </Flex>
                        </Flex>

                    </Flex>
                </Box>
            :
                <Box>
                    aaa
                </Box>

            }
            <Footer/>
        </Box>
    );
}