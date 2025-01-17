import { Box, Flex, Icon, Link as NavLink, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { CardAds } from "../../../components/Enterprise/Ads/Card";
import { TopMenuEnterprise } from "../../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../../components/Header";
import api from "../../../utils/api";
import { useRouter } from 'next/router';
import { CardService } from "../../../components/CardService";
import { minPrice } from "../../../utils/typeOfParties";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import { NotAuthorizedComponent } from "../../../components/NotAuthorizedComponent";
import { Footer } from "../../../components/Footer";
import { Sidebar } from "../../../components/Sidebar";
import { FlashMessageComponent } from "../../../components/FlashMessageComponent";
import Head from 'next/head';


export default function AdsEnterprise() {
    const [ads, setAds] = useState([]);
    const routerNext = useRouter();
    const { authenticatedEnterprise } = useEnterpriseAuthContext();

    
    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");

        api.get("/enterprise/ads", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setAds( response.data.ads );
            //console.log( response.data.ads );
            //console.log( ads.length );
            
        })
        .catch( err => {
            //console.log( err );
        });
    
    }, [authenticatedEnterprise]);


    function handleEditAd( id: number, partyType: string ) {
        //console.log( id );
        routerNext.push({
            pathname: '/Enterprise/ads/edit',
            query: { 
                partyType: partyType,
            }
        });
    }

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Head>
                    <title>Visualização dos seus anúncios</title>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="description" content="Visualize todos os seus anúncios criados na plataforma Festafy."/>
                    <meta property="og:title" content="Visualização dos seus anúncios"/>
                    <meta property="og:description" content="Visualize os seus anúncios criados na plataforma Festafy."/>
                    <meta property="og:url" content="https://www.festafy.com.br/Enterprise/ads"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <Header name="" position="relative" />
                <FlashMessageComponent/>
                <TopMenuEnterprise />
                <Sidebar/>
               
                <Box
                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                    borderRadius={8} 
                    mx={{base:'3',lg:"24"}}
                    mt="5"
                    mb='14'
                    p={{base:'4', lg:"10"}}
                    //h='58vh'
                    minH={{base:'50vh', lg:'50vh'}}
                    h='auto'
                >
    
                    <Stack 
                        direction={{base:'column', lg:'row'}}
                        spacing={18}
                        justifyContent='center'
                        alignItems='center'
                    >
                        
                        {/* Create New Add */}
                        {
                            ads.length <= 2
                            ?
                            <NavLink href="/Enterprise/ads/create"
                                h={{base:'25vw', lg:'15.3vw'}}
                                w={{base:'88vw', sm: '65vw', md: '50vw', lg:'15.3vw'}}
                                _hover={{textDecoration: 'none'}}
                            >
                                <Flex 
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8} 
                                    bg="brand.white"                        
                                    color="brand.red"
                                    _hover={{bg:"gray.50"}}
                                    justifyContent="center"
                                    alignItems="center"
                                    //fontSize={40}
                                    direction='column'
                                    h='100%'
                                    w='100%'
                                >
                                    <Text
                                        fontSize={{base:22,lg:26}}
                                        textAlign='center'
                                    >
                                        Criar novo anúncio
                                    </Text>
                                    {/* 
                                    
                                    <Icon 
                                        as={RiAddLine}
                                        fontSize={54}
                                        fontWeight={400}
    
                                    />
                                    */}
                                </Flex>
                            </NavLink>
                            :
                            <>
                            </>
                        }
    
                        {/* Enterprise Ads */}
                        {
                            ads.length == 0
                            ?
                            <Flex
                                px='12'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Spinner size='xl'/> 
                            </Flex>
                            :
                            ads.map((el, index) => {
                                return(
                                    <Flex
                                        direction='column'
                                        bg='brand.white'
                                        px='2'
                                        py='2'
                                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                        borderRadius={8}                                   
                                    >
                                        <Text
                                            w='100%'
                                            textAlign='center'
                                            color='brand.white'
                                            fontSize={22}
                                            fontWeight={700}
                                            py='3'
                                            bg='rgba(0,0,0,0.4)'
                                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                            borderTopRadius={8}
                                        >
                                            {el.partyMainFocus}
                                        </Text>
    
                                        <CardService 
                                            key={index}
                                            name={el.enterpriseName}
                                            borderTop={false}
                                            location={el.location}
                                            classification={el.ratingQuantity != 0 ? `${(el.ratingSum / el.ratingQuantity).toFixed(1)} (${el.ratingQuantity})` : '0'}
                                            rangeOfPeople='10-100'
                                            price={'R$ ' + minPrice(el)}
                                            photos={el.photos}
                                            handleOnClick={() => handleEditAd(el.id, el.partyMainFocus)} 
                                        />
                                    </Flex>
                                    )                            
                                })
                            }
                        
                            {/*
                                <CardAds
                                name={el.id}
                                location=""
                                typeOfParty={el.partyMainFocus}
                                classification=""
                                price=""
                                photo={el.photos.split(",")[0]}
                                handleOnClick={() => handleEditAd(el.id, el.partyMainFocus)}
                                />
                            */}
                    </Stack>
                </Box>

                <Footer/>
            </Box>
        );
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <Head>
                    <title>Visualização dos seus anúncios</title>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="description" content="Visualize todos os seus anúncios criados na plataforma Festafy."/>
                    <meta property="og:title" content="Visualização dos seus anúncios"/>
                    <meta property="og:description" content="Visualize os seus anúncios criados na plataforma Festafy."/>
                    <meta property="og:url" content="https://www.festafy.com.br/Enterprise/ads"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}