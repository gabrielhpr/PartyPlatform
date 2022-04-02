import { Box, Button, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import Image from 'next/image'
import { useEffect, useState } from "react";
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { CardService } from "../components/CardService";
import api from "../utils/api";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { RiFilter2Fill } from "react-icons/ri";
import { Footer } from "../components/Footer";
import { minPrice, priceOptionsPerService } from "../utils/typeOfParties";
import { Sidebar } from "../components/Sidebar";


export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({price:{value:'', textToShow:''}, buffetIncluded: false, nOfPeople: ''});
    const routerNext = useRouter();
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });
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
        const { partyType, serviceCategory, serviceSpecificCategory, city, state, country, price } = routerNext.query;
       

        try {
            api.get('/services', {
                    params: {
                        partyType: partyType,
                        serviceCategory: serviceCategory,
                        serviceSpecificCategory: serviceSpecificCategory,
                        city: city,
                        state: state,
                        country: country,
                        price: price
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

            <Sidebar/>

            <Flex>
                
            </Flex>

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


                                {
                                    isMobileVersion == false
                                    ?
                                    <Stack spacing={5} direction='row'>
                                        {/* Price filter */}
                                        <Flex>
                                            <Menu>
                                                <MenuButton as={Button} bg='brand.blue'
                                                    textColor='brand.white'
                                                    width={250}
                                                >
                                                    {
                                                    filters.price.value == ''
                                                    ?   
                                                    'Preço mínimo'
                                                    :
                                                    'Preço: '+filters.price.textToShow
                                                    }
                                                </MenuButton>
                                                <MenuList minWidth='240px'>
                                                    <MenuOptionGroup type='radio' value={filters.price.value}
                                                    >
                                                        {
                                                            routerNext.query.serviceCategory == 'Servico'
                                                            ?
                                                            priceOptionsPerService.Servico[routerNext?.query?.serviceSpecificCategory].map((el,index) => {
                                                                return (
                                                                    <MenuItemOption value={el.value}
                                                                        onClick={(event: any) => {
                                                                            setFilters({...filters, price: {...filters.price, value: el.value, textToShow: el.textToShow}});

                                                                            routerNext.push({
                                                                                pathname: '/services',
                                                                                query: { 
                                                                                    partyType: routerNext.query.partyType,
                                                                                    serviceCategory: routerNext.query.serviceCategory,
                                                                                    serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                    city: routerNext.query.city,
                                                                                    state: routerNext.query.state,
                                                                                    country: routerNext.query.country,
                                                                                    price: el.value,
                                                                                    nOfPeople: routerNext.query.nOfPeople
                                                                                }
                                                                            });
                                                                            console.log(filters);
                                                                        }}
                                                                    >
                                                                        {el.textToShow}
                                                                    </MenuItemOption>
                                                                )
                                                            })
                                                            :
                                                            
                                                            priceOptionsPerService.Espaco[filters.buffetIncluded == false ? 'SoEspaco' : 'EspacoEBuffet'].map((el,index) => {
                                                                if( index == 0 ) {
                                                                    return (
                                                                        <Flex>
                                                                            <Button
                                                                                bg={filters.buffetIncluded == false ? 'brand.blue' : 'brand.white'}
                                                                                textColor={filters.buffetIncluded == false ? 'brand.white' : 'brand.dark_blue'}
                                                                                
                                                                                onClick={() => {
                                                                                    setFilters({...filters, price: {value: '', textToShow: ''}, buffetIncluded: false})
                                                                                    console.log(filters);
                                                                                    
                                                                                }}
                                                                            >
                                                                                Só espaço
                                                                            </Button>

                                                                            <Button
                                                                                bg={filters.buffetIncluded == true ? 'brand.blue' : 'brand.white'}
                                                                                textColor={filters.buffetIncluded == true ? 'brand.white' : 'brand.dark_blue'}
                                                                                onClick={() => { 
                                                                                    setFilters({...filters, price: {value: '', textToShow: ''}, buffetIncluded: true});
                                                                                    console.log(filters);
                                                                                    
                                                                                }}
                                                                            >
                                                                                Espaço com buffet
                                                                            </Button>

                                                                        </Flex>

                                                                    )
                                                                }
                                                                return (
                                                                    <MenuItemOption value={el.value}
                                                                        onClick={(event: any) => {
                                                                            setFilters({...filters, price: {...filters.price, value: el.value, textToShow: el.textToShow}});

                                                                            routerNext.push({
                                                                                pathname: '/services',
                                                                                query: { 
                                                                                    partyType: routerNext.query.partyType,
                                                                                    serviceCategory: routerNext.query.serviceCategory,
                                                                                    serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                    city: routerNext.query.city,
                                                                                    state: routerNext.query.state,
                                                                                    country: routerNext.query.country,
                                                                                    price: el.value,
                                                                                    buffetIncluded: filters.buffetIncluded,
                                                                                    nOfPeople: routerNext.query.nOfPeople
                                                                                }
                                                                            });
                                                                            console.log(filters);
                                                                        }}
                                                                    >
                                                                        {el.textToShow}
                                                                    </MenuItemOption>
                                                                )
                                                            })
                                                        }
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </Flex>

                                        {/* Number of people */}
                                        {
                                            (
                                                (
                                                routerNext.query.serviceCategory == 'Servico' 
                                                && ( ['Buffet', 'Bolos', 'Decoracao'].includes(routerNext.query.serviceSpecificCategory) )
                                                )
                                                ||
                                                routerNext.query.serviceCategory == 'Espaco' 
                                            )
                                            ?
                                            <Flex>
                                                <Menu>
                                                    <MenuButton as={Button} bg='brand.blue'
                                                        textColor='brand.white'
                                                        width={250}
                                                    >
                                                        {
                                                        filters.nOfPeople == ''
                                                        ?   
                                                        'Número de convidados'
                                                        :
                                                        'Convidados: ' + filters.nOfPeople
                                                        }
                                                    </MenuButton>
                                                    <MenuList minWidth='240px'>
                                                        <MenuOptionGroup type='radio' value={filters.price.value}
                                                        >
                                                            {
                                                            [
                                                                {value: '0-49', textToShow: '0 - 49'},
                                                                {value: '50-99', textToShow: '50 - 99'},
                                                                {value: '100-199', textToShow: '100 - 199'},
                                                                {value: '200-299', textToShow: '200 - 299'},
                                                                {value: '300-399', textToShow: '300 - 399'},
                                                                {value: '400-10000', textToShow: '+400'},

                                                            ].map((el, index) => {
                                                                
                                                                return(
                                                                    <MenuItemOption
                                                                        value={el.value}
                                                                        onClick={() => {
                                                                            setFilters({...filters, nOfPeople: el.value});
                                                                            routerNext.push({
                                                                                pathname: '/services',
                                                                                query: { 
                                                                                    partyType: routerNext.query.partyType,
                                                                                    serviceCategory: routerNext.query.serviceCategory,
                                                                                    serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                    city: routerNext.query.city,
                                                                                    state: routerNext.query.state,
                                                                                    country: routerNext.query.country,
                                                                                    price: routerNext.query.price,
                                                                                    buffetIncluded: routerNext.query.buffetIncluded,
                                                                                    nOfPeople: el.value
                                                                                }
                                                                            });
                                                                            console.log(filters);
                                                                        }}
                                                        
                                                                    >
                                                                        {el.textToShow}
                                                                    </MenuItemOption>
                                                                )
                                                            })
                                                            }
                                                        </MenuOptionGroup>
                                                    </MenuList>
                                                </Menu>
                                            </Flex>
                                            :
                                            <>
                                            </>
                                        }
                                        

                                        
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
                                    </Stack>
                                    :
                                    <>
                                    </>
                                }
                                
                            </Flex>
                        </Flex>
                        
                        {
                        services.length > 0
                        ?
                        /* LIST OF CARDS */
                        <Flex w='90%' bg='white'
                            h='auto'
                            mx='auto'
                            py='5' flexWrap='wrap'
                            justifyContent={{base:'center',lg:'space-between'}}
                            rowGap={8}
                        >
                            {
                            services.map((el:any, i:any) => {
                                    return (
                                        <CardService 
                                            key={i}
                                            name={el.enterpriseName}
                                            location={el.location}
                                            classification={el.ratingQuantity != 0 ? `${(el.ratingSum / el.ratingQuantity).toFixed(1)} (${el.ratingQuantity})` : '0'}
                                            rangeOfPeople='10-100'
                                            price={'R$ ' + minPrice(el)}
                                            photos={el.photos.split(",")}
                                            handleOnClick={() => handleClick(el)} 
                                        />
                                    );
                                })
                            }

                        </Flex>
                        :
                        <Flex
                            pt='10'
                            pb='20'
                        >
                            <Text
                                fontSize={20}
                                fontWeight={400}
                            >
                                Não encontramos nenhum resultado para 
                                a sua pesquisa
                            </Text>
                        </Flex>    
                        }
                    </Flex>

                </Flex>
            </Box>
            
            <Footer/>
        </Box>
    );
}