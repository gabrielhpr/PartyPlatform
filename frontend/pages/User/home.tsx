import { Box, Flex, Text, Button, Icon } from "@chakra-ui/react";
import { FlashMessageComponent } from "../../components/FlashMessageComponent";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { typeOfParties, typeOfServices } from "../../utils/typeOfParties";
import Image from 'next/image'
import { useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Debutante from '../../assets/imgs/debutante.png';
import IdosoAniversario from '../../assets/imgs/idoso-aniversario.png';
import MulherAniversario from '../../assets/imgs/mulher-aniversario.png';
import CriancaAniversario from '../../assets/imgs/crianca-aniversario.png';
import { useRouter } from "next/router";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import { useUserAuthContext } from "../../context/userContext";
import { TopMenuUser } from "../../components/User/TopMenuUser";
import { Sidebar } from "../../components/Sidebar";


export default function HomeUser() {
    const [cardSearchData, setCardSearchData] = useState({ partyType: 'Infantil', service: ''});
    const routerSearch = useRouter();
    const { authenticatedUser } = useUserAuthContext();

    
    if( authenticatedUser ) {
        return (
            <Box>
                <Header name='' position="relative" />
                <FlashMessageComponent/>
            
                <Sidebar/>
                <TopMenuUser/>

                <Flex
                    h='95vh'
                >
                    {/* Ache fornecedores */}
                    <Flex
                        w='100%'
                        h='auto'
                        bg='brand.white'
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                        mt='10'                
                    >
                        <Text
                            h="5vh"
                            fontSize={28}
                            fontWeight={600}
                            mb='10'
                        >
                            Qual o tipo da sua festa ?
                        </Text>
    
                        {/* Type of party */}
                        <Flex direction='row'
                            w='100%'
                            h={{base:'35vh', lg:'30vh'}}
                            alignItems='flex-end'
                            justifyContent={{base:'space-evenly',lg:'center'}}
                            mt='5'
                        >  
                            {
                                Object.values(typeOfParties).map((el, index) => {
                                    return (
                                        <Button
                                            mr={{base:'0',lg:'5'}}
                                            p='0'
                                            w={{base:'30vw', lg:'15vw'}}
                                            h='100%'
                                            bg={cardSearchData.partyType == el.value ? 'brand.yellow' : 'brand.white'}
                                            value={el.value}
                                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                            onClick={(event:any) => setCardSearchData({...cardSearchData, partyType: event.currentTarget.value})}
                                        >
                                            <Flex direction='column' h='100%' w='100%'
                                                justifyContent='center' 
                                                alignItems='center'
                                                
                                            >
                                                <Flex position='relative'
                                                    h='28vh' 
                                                    w={{base:'30vw', lg:'15vw'}}
                                                    borderRadius={4}
                                                    overflow='hidden'
                                                >
                                                    <Image
                                                        src={el.value == 'Infantil' ? CriancaAniversario : el.value == 'Debutante' ? Debutante : IdosoAniversario}
                                                        layout='fill'
                                                        objectFit='cover'
                                                    /> 
                                                </Flex>
    
                                                <Flex
                                                    h='7vh'
                                                    w={{base:'30vw', lg:'15vw'}}
                                                    alignItems='center' 
                                                    //flexWrap='wrap'                                            
                                                >
                                                    <Text
                                                        w='100%'
                                                        whiteSpace='break-spaces'
                                                        fontSize={{base: 16, lg:18}}
                                                        fontWeight={500}
                                                    >
                                                        {el.textToShow}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Button>
                                    )
                                })
                            }   
    
                        </Flex>
                    
                        {/* Services */}
                        <Flex 
                            justifyContent='center'
                            alignItems='flex-start'
                            h={{base:'45vh', lg:'35vh'}}
                            w='100%'
                            mt='4'
                            pt='14'
                            bg='brand.yellow'
                            borderTopRadius='20%'
                        >
                            <Flex
                                w={{base:'60%', lg:'60%'}}
                                h={{base:'20vh',lg:'15vh'}}
                                >
                                <AliceCarousel
                                    autoPlay={false}
                                    autoHeight={true}
                                    responsive={{
                                        0: {items:1.1},
                                        1024: {items:5}
                                    }}
    
                                    mouseTracking
                                    items={
                                        typeOfServices[cardSearchData.partyType].services.map((el, index) => {
                                            return (
                                                <Button
                                                    h={{base:'20vh',lg:'15vh'}}
                                                    w='90%'
                                                    my='1'
                                                    mx='1'
                                                    key={index}
                                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                                    bg='rgba(255,255,255,0.95)'
                                                    _hover={{bg:'brand.yellow'}}
                                                    onClick={() => {
                                                        routerSearch.push({
                                                            pathname: '/services',
                                                            query: { 
                                                                partyType: cardSearchData.partyType,
                                                                serviceCategory: el.parent,
                                                                serviceSpecificCategory: el.value,
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <Flex w='100%'
                                                        h='100%'
                                                        direction='column'
                                                        alignItems='center'
                                                        justifyContent='space-evenly'
                                                        py='4'
                                                    >
                                                        <Icon as={el.icon} color='brand.dark_blue' 
                                                            fontSize={42}
                                                        />
                                                        <Text
                                                            w='90%'
                                                        whiteSpace='break-spaces' 
                                                        >
                                                            {el.textToShow}
                                                        </Text>
                                                    </Flex>
                                                </Button>
                                            );
                                        })
                                    }
                                />
                            
                            </Flex>
    
                        </Flex>
                    
    
                    </Flex>
                </Flex>
                
                <Footer/> 
            </Box>
        );
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <NotAuthorizedComponent link='/User/userAccess' />
            </Box>
        )
    }
    
}