import { Avatar, Box, Button, Flex, Icon, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FiMail, FiPhone } from "react-icons/fi";
import { RiSearchEyeLine } from "react-icons/ri";
import { IoMdMailOpen } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise/index";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import api from "../../utils/api";
import { Sidebar } from "../../components/Sidebar";
import { typeOfParties } from "../../utils/typeOfParties";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useRouter } from "next/router";
import { FlashMessageComponent } from "../../components/FlashMessageComponent";

export default function HomePageEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();
    const [ gaReports, setGaReports ] = useState({});
    const [ partyTypeOptions, setPartyTypeOptions ] = useState([]);
    const [ partyTypeSelected, setPartyTypeSelected ] = useState('');
    const [ opinions, setOpinions ] = useState([]);
    const [ ads, setAds ] = useState({});
    const routerNext = useRouter(); 
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });

    // Get Ads data
    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");

        try {
            api.get("/enterprise/ads", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setAds( response.data.ads );
                setPartyTypeSelected( response.data.ads[0].partyMainFocus );
                setPartyTypeOptions( response.data.ads.map((el, index) => {
                    return el.partyMainFocus;
                }));
                console.log( 'O tipo de festa que será carregado no party type é: ' );
                console.log( response.data.ads[0].partyMainFocus );
                console.log( response.data.ads );                
            });
        }
        catch( err ) {
            console.log( err );
        }

    }, [authenticatedEnterprise]);

    // Get Enterprise Data
    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");

        // Get ga data
        // try {
        //     api.get("/enterprise/getGoogleAnalyticsData", {
        //         headers: {
        //             'Authorization': `Bearer ${JSON.parse(token)}`
        //         }
        //     })
        //     .then((response) => {
        //         setGaReports( response );
        //         console.log( response.data );
        //     });
        // }
        // catch( err ) {
        //     console.log( err );
        // }
    }, [authenticatedEnterprise]);

    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }
        if( partyTypeSelected == '' ) {
            return;
        }
        console.log('Vai buscar as opinioes');
        console.log( partyTypeSelected );

        const token = localStorage.getItem("tokenEnterprise");
       
        api.get('/enterprise/opinions', {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                },
                params: {
                    partyType: partyTypeSelected
                }
            })
            .then((response) => {
                console.log('Opinions');
                console.log(response.data.opinions);
                setOpinions(response.data.opinions);
            })
    }, [partyTypeSelected]);



    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Header name="" position="relative" />
                <FlashMessageComponent/>
                <TopMenuEnterprise />
                <Sidebar/>
                
                <Flex
                    //h='50vh'
                    mt='5'
                    mb='14'
                    justifyContent='flex-start'
                    alignItems='center'
                    direction='column'
                    w='100%'
                >
                    {/* PARTY TYPES - To show data about indicators and opinions */}
                    <Menu closeOnSelect={true}>
                        <MenuButton as={Button} colorScheme='blue' mb='5'>
                            Tipo da Festa: {typeOfParties[partyTypeSelected]?.textToShow || 'Loading'}
                        </MenuButton>
                        <MenuList minWidth='240px'>
                            <MenuOptionGroup defaultValue='asc' type='radio'
                                onChange={(value: string) => {
                                    setPartyTypeSelected( value );
                                }}
                            >
                                {
                                    partyTypeOptions.map((el, index) => {
                                        return (
                                            <MenuItemOption value={el}>{typeOfParties[el].textToShow}</MenuItemOption>
                                        )
                                    })
                                }
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>

                    {/* INDICATORS */}
                    <Flex 
                        border='0.5px solid rgba(0,0,0,0.3)'
                        py={{base:'0', lg:'5'}}
                        px='2'
                        borderRadius={8}
                        w={{base:'100%', lg:'70%'}}
                        justifyContent='space-evenly'
                        flexWrap='wrap'
                    >
                        <Flex
                            py='2'
                            w='100%'
                            display={{base:'flex', lg:'none'}}
                        >
                            <Text
                            >
                                Nos últimos 12 meses
                            </Text>
                        </Flex>

                        {
                            [
                            {id: 'visualizacoes', icon: RiSearchEyeLine, value: '', text1: 'Visualizações', text2: 'nos últimos 12 meses' },
                            {id: 'pedidosRecebidos',icon: FiMail, value: '', text1: 'Pedidos recebidos', text2: 'nos últimos 12 meses' },
                            {id: 'avaliacoes',icon: AiOutlineStar, value: '', text1: 'Avaliações', text2: 'nos últimos 12 meses' },
                            {id: 'cliquesVerTelefone', icon: FiPhone, value: '', text1: 'Cliques em Ver Telefone', text2: 'nos últimos 12 meses' },
                            {id: 'cliquesVerWhatsapp',icon: BsWhatsapp, value: '', text1: 'Cliques em Ver Whatsapp', text2: 'nos últimos 12 meses' },
                            {id: 'cliquesVerEmail',icon: IoMdMailOpen, value: '', text1: 'Cliques em Ver E-mail', text2: 'nos últimos 12 meses' },
                        ].map((el, index) => {
                                return (
                                    <Flex
                                        direction='column'
                                        justifyContent='center'
                                        alignItems={{base:'flex-start', lg:'center'}}
                                        w={{base:'50%', lg:'20%'}}
                                        py='2'
                                        display={el.id == 'cliquesVerEmail' ? {base:'flex', lg:'none'} : 'flex'}
                                    >
                                        <Flex
                                            alignItems='center'
                                        >
                                            <Icon as={el.icon} fontSize={35}
                                            />
                                            <Text>
                                                {el.value}
                                            </Text>
                                        </Flex>

                                        <Text
                                            mt='2'
                                            fontSize={16}
                                            fontWeight={500}
                                            textAlign='center'
                                        >
                                            {el.text1}
                                        </Text>

                                        <Text
                                            fontSize={14}
                                            fontWeight={300}
                                            display={{base:'none', lg:'flex'}}
                                        >
                                            {el.text2}
                                        </Text>
                                    </Flex>
                                )
                            })
                        }
                    </Flex>

                    {/* OPINIONS */}
                    {
                        opinions.length > 0
                        &&
                        <Flex
                            w={{base:'95%', lg:'70%'}}
                        >
                            <Flex
                                
                                direction='column'
                                w={{base:'100%', lg:'50%'}}
                                alignItems='center'
                                //alignSelf='flex-start'

                            >
                                <Text
                                    alignSelf='flex-start'
                                    fontSize={21}
                                    fontWeight={500}
                                    my='2'
                                >
                                    Últimas avaliações
                                </Text>
                            
                                {/* Opinions about the service */}
                                <Flex 
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8}
                                    direction='column'
                                    pb='3'
                                    px='3'
                                    justifyContent='center'
                                    alignItems='flex-start'
                                    minHeight={{base:'25vh', lg:'22vh'}}
                                    //h={{base:'auto', lg:'20vh'}}
                                    w='100%'
                                >
                                    <Flex
                                        w={{base:'100%', lg:'100%'}}
                                        h={{base:'30vh', lg:'25vh'}}
                                    >
                                        <AliceCarousel                                
                                            autoPlay={false}
                                            autoHeight={true}
                                            responsive={{
                                                0: {items:1},
                                                1024: {items:1}
                                            }}

                                            disableButtonsControls={true}
                                            disableSlideInfo={false}// isMobileVersion ? false : true}
                                            disableDotsControls={true}
                                            mouseTracking
                                            items={
                                                opinions.map((el, index) => {
                                                    return (
                                                        <Flex 
                                                            py='5' 
                                                            px={{base:'1',lg:'4'}}
                                                            direction='column'
                                                            //borderBottom='1px solid rgba(0,0,0,0.4)'
                                                        >
                                                            {/* Name, Avatar, date */}
                                                            <Flex mb='2' 
                                                                alignItems='center'
                                                            >
                                                                <Avatar mr='4'
                                                                    name={el.fullName.split(' ')?.slice(0,2).join(' ')}
                                                                    h={70} w={70} 
                                                                    size='lg'
                                                                />

                                                                <Flex direction='column'>
                                                                    <Text
                                                                        fontSize={19}
                                                                        fontWeight={500}
                                                                    >
                                                                        {el.fullName.split(' ')?.slice(0,2).join(' ')}
                                                                    </Text>
                                                                    <Text>
                                                                        Data da Festa: {el.partyDate}
                                                                    </Text>
                                                                </Flex>

                                                            </Flex>

                                                            {/* Title */}
                                                            <Text
                                                                fontWeight={500}
                                                                fontSize={20}
                                                                mb='2'
                                                            >
                                                                {el.opinionTitle}
                                                            </Text>

                                                            {/* Content */}
                                                            <Text
                                                                fontSize={16}
                                                            >
                                                                {el.opinionContent}
                                                            </Text>

                                                            {
                                                                el.answerContent == null
                                                                ?
                                                                <Button
                                                                    w='40%'
                                                                    bg='brand.white'
                                                                    color='brand.red'
                                                                    alignSelf='flex-end'
                                                                    mt='4'
                                                                    onClick={() => {
                                                                        routerNext.push('/Enterprise/rating');
                                                                    }}
                                                                >
                                                                    RESPONDER
                                                                </Button>
                                                                :
                                                                <Text
                                                                    w='40%'
                                                                    bg='brand.white'
                                                                    fontWeight={500}
                                                                    color='brand.blue'
                                                                    alignSelf='flex-end'
                                                                    mt='4'
                                                                    textAlign='center'
                                                                >
                                                                    JÁ RESPONDIDA
                                                                </Text>
                                                            }

                                                        </Flex>
                                                    )
                                                })
                                            }
                                        />
                                    </Flex>
                                </Flex>    

                                <Button
                                    mt='5'
                                    py='1'
                                    w={{base:'100%', lg:'100%'}}
                                    bg='brand.red'
                                    color='brand.white'
                                    fontSize={17}
                                    borderRadius={12}
                                    onClick={() => {
                                        routerNext.push('/Enterprise/rating');
                                    }}
                                >
                                    Ver todas as avaliações
                                </Button>
                            </Flex>
                        </Flex>
                    }
                </Flex>

                <Footer />

            </Box>
    
        );
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }

}