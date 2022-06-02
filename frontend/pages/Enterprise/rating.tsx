import { Avatar, Box, Button, Flex, Icon, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Modal, 
    ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, 
    Spinner, 
    Stack, Text, Textarea, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
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
import { FlashMessageComponent } from "../../components/FlashMessageComponent";

export default function RatingEnterprise() {
    const [ loadingContent, setLoadingContent ] = useState( true );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { authenticatedEnterprise, enterpriseAnswerRate } = useEnterpriseAuthContext();
    const [ partyTypeOptions, setPartyTypeOptions ] = useState([]);
    const [ partyTypeSelected, setPartyTypeSelected ] = useState('');
    const [ opinions, setOpinions ] = useState([]);
    const [ answerOpinion, setAnswerOpinion ] = useState(
        { 
            userName: '',
            opinionContent: '',
            ratingId: 0,
            userId: 0,
            enterpriseId: 0,
            partyType: '',
            answerContent: ''
        }
    );

    const [ ads, setAds ] = useState({});
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
            //console.log( 'O tipo de festa que será carregado no party type é: ' );
            //console.log( response.data.ads[0].partyMainFocus );
            //console.log( response.data.ads );                
        })
        .catch( err => {
            //console.log( err );
        });

    }, [authenticatedEnterprise]);

    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }
        if( partyTypeSelected == '' ) {
            return;
        }
        //console.log('Vai buscar as opinioes');
        //console.log( partyTypeSelected );

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
            //console.log('Opinions');
            //console.log(response.data.opinions);
            setOpinions(response.data.opinions);
            setLoadingContent(false);
        })
        .catch( err => {
            //console.log( err );
        });
    }, [partyTypeSelected]);


    async function handleSubmitRatingAnswer() {
        //console.log('Entrou handleSubmitRatingAnswer');
        await enterpriseAnswerRate( answerOpinion );
        //console.log('Saiu handleSubmitRatingAnswer');
        window.location.reload();
    }

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
                        <MenuButton as={Button} colorScheme='blue' mb='5'
                        >
                            Tipo da Festa: {typeOfParties[partyTypeSelected]?.textToShow || 'Carregando'}
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


                    {/* OPINIONS */}
                    {
                        opinions.length > 0
                        ?
                        <Flex
                            w={{base:'95%', lg:'70%'}}
                        >
                            <Flex
                                direction='column'
                                w={{base:'100%', lg:'100%'}}
                                h='auto'
                                alignItems='center'
                                //alignSelf='flex-start'
                            >
                                <Text
                                    alignSelf='flex-start'
                                    fontSize={21}
                                    fontWeight={500}
                                    my='2'
                                    px='4'
                                >
                                    Últimas avaliações
                                </Text>
                            
                                {/* Opinions about the service */}
                                <Stack 
                                    spacing={{base:5, lg:10}}
                                    flexWrap='wrap'
                                    direction='column'
                                    pb='3'
                                    px='3'
                                    justifyContent='center'
                                    alignItems='flex-start'
                                    minHeight={{base:'30vh', lg:'30vh'}}
                                    //h={{base:'auto', lg:'20vh'}}
                                    w='100%'
                                >
                                    
                                    {
                                        opinions.map((el, index) => {
                                            return (
                                                <Flex 
                                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                                    borderRadius={8}
                                                    w={{base:'100%', lg:'70%'}}
                                                    py='5' 
                                                    px='4'
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
                                                                Data da Festa: {el.partyDate.substring(8,10)+'/'+el.partyDate.substring(5,7)+'/'+el.partyDate.substring(0,4)}
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

                                                    {/* OPINIONS ANSWER */}
                                                    {
                                                        el.answerContent != null
                                                        &&
                                                        <Flex
                                                            bg='rgba(0,0,0,0.07)'
                                                            borderRadius={4}
                                                            px='6'
                                                            py='4'
                                                            mt='5'
                                                        >
                                                            <Text>
                                                                RESPOSTA: <br/>
                                                                {el.answerContent}
                                                            </Text>
                                                        </Flex>
                                                    }

                                                    {/* BUTTON TO ANSWER */}
                                                    {
                                                        el.answerContent == null
                                                        &&
                                                        <Button
                                                            mt='5'
                                                            alignSelf='flex-end'
                                                            bg='brand.white'
                                                            color='brand.red'
                                                            textTransform='uppercase'
                                                            onClick={() => {
                                                                setAnswerOpinion(
                                                                    {
                                                                        ...answerOpinion,
                                                                        userName: el.fullName.split(' ')?.slice(0,2).join(' '),
                                                                        opinionContent: el.opinionContent,
                                                                        ratingId: el.id,
                                                                        userId: el.userId,
                                                                        enterpriseId: el.enterpriseId,
                                                                        partyType: el.partyType
                                                                    }
                                                                );
                                                                onOpen();
                                                            }}
                                                        >
                                                            Responder
                                                        </Button>
                                                    }

                                                    <Modal onClose={onClose} size='lg' isOpen={isOpen}>
                                                        <ModalOverlay />
                                                        <ModalContent>
                                                            <ModalHeader>Resposta</ModalHeader>
                                                            <ModalCloseButton />
                                                            <ModalBody>
                                                                <Flex 
                                                                    //mb='2' 
                                                                    //justifyContent='center'
                                                                    //w='80vw'
                                                                    direction='column'
                                                                >
                                                                    <Flex>
                                                                        <Avatar mr='4'
                                                                            name={answerOpinion.userName}
                                                                            h={70} w={70} 
                                                                            size='lg'
                                                                        />

                                                                        <Flex direction='column'
                                                                            wordBreak='break-word'
                                                                        >
                                                                            <Text
                                                                                fontSize={19}
                                                                                fontWeight={500}
                                                                            >
                                                                                {answerOpinion.userName}
                                                                            </Text>
                                                                            <Text

                                                                            >
                                                                                {
                                                                                    answerOpinion.opinionContent.length > 100
                                                                                    ?
                                                                                    answerOpinion.opinionContent.substring(0,99) + ' ...'
                                                                                    :
                                                                                    answerOpinion.opinionContent
                                                                                }
                                                                            </Text>
                                                                        </Flex>
                                                                    </Flex>

                                                                    <Text>

                                                                    </Text>

                                                                    <Text
                                                                        mt='3'
                                                                    >
                                                                        Resposta
                                                                    </Text>

                                                                    <Textarea
                                                                        name='answerContent' 
                                                                        placeholder=''
                                                                        value={answerOpinion.answerContent}
                                                                        onChange={(event: any) => {
                                                                            setAnswerOpinion({...answerOpinion, [event.currentTarget.name]: event.currentTarget.value });
                                                                        }}
                                                                    >

                                                                    </Textarea>

                                                                </Flex>

                                                            </ModalBody>

                                                            <ModalFooter
                                                                justifyContent='space-between'
                                                            >
                                                                <Button onClick={onClose}
                                                                    bg='brand.white'
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                                <Button 
                                                                    onClick={() => {
                                                                        handleSubmitRatingAnswer();
                                                                        onClose();
                                                                    }}
                                                                    bg='brand.red'
                                                                    color='brand.white'
                                                                >
                                                                    Enviar
                                                                </Button>
                                                            </ModalFooter>
                                                        </ModalContent>
                                                    </Modal>

                                                </Flex>
                                            )
                                        })
                                    }
                                </Stack>    

                                
                            </Flex>
                        </Flex>
                        :
                        <Flex
                            h='50vh'
                            justifyContent='center'
                            alignItems='center'
                            direction='column'
                        >
                            {
                            loadingContent
                            ?
                            <>
                                <Text
                                    fontSize={24}
                                    fontWeight={400}
                                    mb='7'
                                >
                                    Carregando
                                </Text>
                                <Spinner size='xl' />
                            </>
                            :
                            <Text>
                                Ainda não há avaliações disponíveis
                            </Text>
                            }
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