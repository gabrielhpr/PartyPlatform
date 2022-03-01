import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from 'next/image'
import { useEffect, useState } from "react";
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { CardService } from "../components/CardService";
import api from "../utils/api";
import { useRouter } from "next/router";



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
        api.get('/services', {
                params: {
                    partyType: 'Infantil',
                    service: 'Fotografia',
                    location: 'SaoPaulo'
                }
            })
            .then((response) => {
                setServices(response.data.services);
                console.log(services[0]);
            })
    }, []);

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
                            services.map((el:any, i:any) => {
                                    return (
                                        <CardService 
                                            name={el.enterpriseName}
                                            location={el.city}
                                            classification='5 stars'
                                            rangeOfPeople='10-100'
                                            price='R$ 500,00'
                                            picture={FotoDebutante}
                                            handleOnClick={() => handleClick(el)} 
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