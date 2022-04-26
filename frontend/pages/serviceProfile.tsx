import { Box, Flex, Text, Input, Icon, Img, Textarea, Button, Stack, Avatar, useBreakpointValue, useDisclosure, Link as NavLink, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
//import Image from 'next/image'
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { RiStarSFill, RiPhoneFill, RiWhatsappFill, RiMailFill, RiStarFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";
import { ModalServiceProfile } from "../components/ModalServiceProfile";
import { ModalImageGallery } from "../components/ModalImageGallery";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { specificQuestions } from "../utils/typeOfParties";
import { useUserAuthContext } from "../context/userContext";
import { Sidebar } from "../components/Sidebar";
import Script from "next/script";

interface serviceDataInterf {
    id: number;
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    // Access Data
    password: string;
    passwordConfirmation: string;
    // About the enterprise
    enterpriseName: string;
    
    // Just for showing the user
    location: string;

    city: string;
    state: string;
    country: string;
    address: string;
    addressNumber: number;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
    partyMainFocus: string;
    serviceDescription: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;

    photos: any[];

    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
    q7: string;
    q8: string;
    q9: string;
    q10: string;
    q11: string;
    q12: string;
    q13: string;
    q14: string;
    q15: string;
    q16: string;
    q17: string;
    q18: string;
    q19: string;
    q20: string;
    q21: string;
    q22: string;
    q23: string;
    q24: string;
    q25: string;
    q26: string;
    q27: string;
    q28: string;
    q29: string;
    q30: string;
    q31: string;
    q32: string;
    q33: string;
    q34: string;
    q35: string;
    q36: string;
    q37: string;
    q38: string;
    q39: string;
    q40: string;
    q41: string;
    q42: string;
    q43: string;
    q44: string;
    q45: string;
    q46: string;
    q47: string;
    q48: string;
    q49: string;
    q50: string;
}

const serviceNullState = {
    id: 0,
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    // Access Data
    password: '',
    passwordConfirmation: '',
    // About the enterprise
    enterpriseName: '',
    location: '',
    city: '',
    state: '',
    country: '',
    address: '',
    addressNumber: 0,

    // Enterprise Social Media
    instagram: '',
    facebook: '',
    website: '',

    partyMainFocus: '',
    serviceDescription: '',
    enterpriseCategory: '',
    enterpriseSpecificCategory: '',

    photos: [],

    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
    q18: '',
    q19: '',
    q20: '',
    q21: '',
    q22: '',
    q23: '',
    q24: '',
    q25: '',
    q26: '',
    q27: '',
    q28: '',
    q29: '',
    q30: '',
    q31: '',
    q32: '',
    q33: '',
    q34: '',
    q35: '',
    q36: '',
    q37: '',
    q38: '',
    q39: '',
    q40: '',
    q41: '',
    q42: '',
    q43: '',
    q44: '',
    q45: '',
    q46: '',
    q47: '',
    q48: '',
    q49: '',
    q50: ''
}

export default function ServiceProfilePage() {

    const routerNext = useRouter();
    const [service, setService] = useState<serviceDataInterf>(serviceNullState);
    const [opinions, setOpinions] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);
    const [emailData, setEmailData] = useState({});
    const { userSendEmail } = useUserAuthContext();
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });
    const modalGallery = useDisclosure();
    const modalBudget = useDisclosure();



    function handleOpinion() {
        routerNext.push({
            pathname: '/rating',
            query: { 
                enterpriseId: routerNext.query.id,
                partyType: routerNext.query.partyType
            }
        });
    }

    function handleEmailDataChange( event: any ) {
        setEmailData({...emailData, [event.currentTarget.name]: event.currentTarget.value});
    }

    function handleSendEmail() {
        console.log( emailData );

        userSendEmail( emailData );
    }

    function handleShowAllImages() {
        setShowAllImages(true);
    }
    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        
        const {id, partyType} = routerNext.query;

        if (typeof window !== 'undefined') {
            window.gtag('event', 'page_view', {
                page_title: 'serviceProfilePage',
                page_location: 'serviceProfilePage',
                page_path: `enterprise-${id}`,
            });
        }

        // Save the enterprise id and party type, for email sending
        setEmailData({...emailData, enterpriseId: id, partyType: partyType});

        api.get('/serviceProfile', {
                params: {
                    id: id,
                    partyType: partyType
                }
            })
            .then((response) => {
                console.log('Service');
                console.log(response.data.service);
                console.log('Opinions');
                console.log(response.data.opinions);
                
                setService(response.data.service[0]);
                setOpinions(response.data.opinions);
            })
    }, [routerNext.query]);

    return (
        <Box>
            {/* GOOGLE ANALYTICS */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-RLBGWS0TCG"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-RLBGWS0TCG', {
                        send_page_view: false
                    });
                    
                `}
            </Script>
           
                       
            <Header name="" position="relative" />

            <Sidebar/>

            {
            service.serviceDescription != ''
            ?
            /* Content */
            <Flex w='100%' justifyContent='center'
                bg='brand.white'
                mb='20'
            >
                <Flex w={{base:'100%', lg:'80%'}}
                    direction='column'
                    bg='white' 
                    px={{base:0,lg:34}}
                    boxShadow={{lg:"0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"}}
                    borderRadius={{lg:8}}
                    mt={{base:'0',lg:'10'}}
                >

                    {/* Details about the service */}
                    <Flex direction='column'
                        px={{base:'5',lg:'0'}}
                    >
                        <Flex alignItems='flex-end' mt='5'>
                            <Text as='h1'
                                fontSize={30}
                                fontWeight={500}
                            >
                                {service.enterpriseName}
                            </Text>
                            
                        </Flex>
                        
                        
                        <Flex mt='2'>
                            <Text>{service.location}</Text>
                            {/*
                            <Text ml='5'>Ver no mapa</Text>
                            */}
                        </Flex>
                        
                        <Flex mt='2'>
                            <Flex alignItems='center'>
                                <Icon as={RiStarSFill} color='red' />
                                <Text ml='1'>
                                    5,0
                                </Text>
                            </Flex>
                            
                            <ModalServiceProfile 
                                buttonText="Ver Telefone"
                                title="Ligue Agora!"
                                subtitle="Conte ao fornecedor que você
                                o encontrou pelo Festafy"
                                icon={RiPhoneFill}
                                iconColor='black'
                                content={service.phone}
                            />

                            {
                                service.whatsapp != ''
                                ?
                                <ModalServiceProfile 
                                    buttonText="Ver Whatsapp"
                                    title="Mande Mensagem"
                                    subtitle="Conte ao fornecedor que você
                                    o encontrou pelo Festafy"
                                    icon={RiWhatsappFill}
                                    iconColor='green'
                                    content={service.whatsapp}
                                />
                                :
                                <>
                                </>
                            }

                            <ModalServiceProfile 
                                buttonText="Ver E-mail"
                                title="Mande um e-mail"
                                subtitle="Conte ao fornecedor que você
                                o encontrou pelo Festafy"
                                icon={RiMailFill}
                                iconColor='black'
                                content={service.email}
                            />

                        </Flex>
                    </Flex>                        

                    {/* Photos */}
                    <Flex w='100%' pb='10' pt='5' 
                        h={{base:400,lg:500}}
                    >
                    
                        <Flex w={{base:'100%', lg:'50%'}}
                            onClick={modalGallery.onOpen}
                            position='relative'
                        >
                            {
                                isMobileVersion
                                &&
                                <Button 
                                    bg='brand.white'
                                    color='brand.dark_blue'
                                    w='20%'
                                    position='absolute'
                                    right={0}
                                    bottom={0}
                                    transform='translate(-5%, -10%)'
                                    onClick={modalGallery.onOpen}
                                    borderRadius={8}
                                >
                                    + Fotos
                                </Button>                                    
                            }

                            <Img 
                                borderLeftRadius={{base:0,lg:8}}
                                objectFit='cover'
                                src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[0]}`}
                            />
                        </Flex>


                        {/* DESKTOP VERSION */}
                        {/* Other showed pictures */}
                        <Flex w='50%' h='100%' flexWrap='wrap' 
                            display={{base:'none', lg:'flex'}}
                        >
                            <Flex w='50%' h='50%' pl='2' pb='1'
                                onClick={modalGallery.onOpen}
                            >
                                <Img 
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[1]}`}
                                    objectFit='cover'
                                />
                            </Flex>

                            <Flex w='50%' h='50%' pl='2' pb='1'
                                onClick={modalGallery.onOpen}
                            >
                                <Img 
                                    borderTopRightRadius={8}
                                    objectFit='cover'
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[2]}`}
                                />
                            </Flex>

                            <Flex w='50%' h='50%' pl='2' pt='1'
                                onClick={modalGallery.onOpen}
                            >
                                <Img 
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[3]}`}
                                    objectFit='cover'
                                />
                            </Flex>

                            <Flex w='50%' h='50%' pl='2' pt='1' position='relative'>

                                <Button 
                                    bg='brand.white'
                                    color='brand.dark_blue'
                                    w='70%'
                                    position='absolute'
                                    top='50%'
                                    left='50%'
                                    transform='translate(-50%, 80%)'
                                    onClick={modalGallery.onOpen}
                                >
                                    Ver todas as fotos
                                </Button>

                                <Img 
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[4]}`}
                                    borderBottomRightRadius={8}
                                    objectFit='cover'
                                />
                            </Flex>
                        </Flex>


                        {/* Photo Gallery Modal */}
                        <ModalImageGallery
                            buttonText='Ver todas as fotos'
                            handleFunctions={modalGallery}
                            content={
                                service.photos.split(',').map((image, index) => {
                                    return {
                                        'id': `service_${index}`,
                                        'src': `http://localhost:5000/images/enterprise/${image}`,
                                        'alt': 'Service',
                                    }
                                })
                            }
                        />
                            
                    </Flex>
                    
                    {/* Service Description, Common Douts and Send Message */}
                    <Flex direction='row'
                        px={{base:'5',lg:'0'}}
                    >
                        {/* Service Description, Common Douts and Send Message */}
                        <Flex w={{base:'100%',lg:'70%'}} 
                            direction='column' 
                            pr={{base:'0',lg:'15'}}
                        >
                            {/* Description about the service */}
                            <Flex direction='column' mb='8'>
                                <Text
                                    as='h2'
                                    fontSize={23}
                                    fontWeight={700}
                                    mb='4'
                                >
                                    Descrição
                                </Text>

                                <Text as='p'>
                                    {service.serviceDescription}
                                </Text>
                            </Flex>                            

                            {/* Dúvidas - Usefull details about the service */}
                            <Flex 
                                direction='column' my='3'
                                justifyContent='flex-start'
                                alignItems='flex-start'
                                //spacing={5}
                                w='100%'
                                h='50vh'
                            >
                                <Text as='h2' 
                                    fontSize={23}
                                    fontWeight={700}
                                    mb='4'
                                >
                                    Dúvidas Frequentes
                                </Text>

                                <Stack
                                    overflowY='scroll'
                                    w='100%'
                                    h='50vh'
                                >
                                
                                    {
                                        service.enterpriseCategory == 'Espaco'
                                        ?
                                        specificQuestions['Espaco']
                                        .map((el, index) => {
                                            // POSSUI BUFFET JUNTO COM O ESPAÇO
                                            if( service.q3 == 'Sim' && 
                                                (
                                                ['q21','q22','q23'].includes(el?.name[0])
                                                ||
                                                ['q21','q22','q23'].includes(el?.name[1])
                                                ) ) 
                                            {
                                                return (
                                                    <>
                                                    </>
                                                );
                                            }
                                            // SEM BUFFET JUNTO COM O ESPAÇO
                                            else if( service.q3 == 'Não' && 
                                                (
                                                ['q5','q6','q7','q8','q9','q10','q11','q12','q13','q14',
                                                'q15','q16','q17','q18','q19','q20'].includes(el?.name[0]) 
                                                ||
                                                ['q5','q6','q7','q8','q9','q10','q11','q12','q13','q14',
                                                'q15','q16','q17','q18','q19','q20'].includes(el?.name[1]) 
                                                )
                                                ) 
                                            {
                                                return (
                                                    <>
                                                    </>
                                                );
                                            }
                                            else {
                                                return (
                                                    <Flex direction='column'
                                                        w='100%'  
                                                        justifyContent='flex-start'
                                                        alignItems='flex-start'
                                                    >
                                                        <Text 
                                                            fontSize={22}
                                                            mb='3'
                                                        >
                                                            {el.question}
                                                        </Text>

                                                        <Text 
                                                            fontSize={22}
                                                            mb='3'
                                                        >
                                                            {service[el.name[0]]}
                                                        </Text>

                                                        <Flex bg='rgba(0,0,0,0.3)' h={0.1} w='100%' mt='4' mb='3'></Flex>
                                                    </Flex>
                                                );
                                            }
                                            })
                                        :
                                        specificQuestions['Servico'][service.enterpriseSpecificCategory]
                                        .map((el, index) => {
                                            return (
                                                <Flex direction='column'
                                                    w='100%'  
                                                    justifyContent='flex-start'
                                                    alignItems='flex-start'
                                                >
                                                    <Text 
                                                        fontSize={20}
                                                        fontWeight={500}
                                                        mb='2'
                                                    >
                                                        {el.question}
                                                    </Text>

                                                    <Text 
                                                        fontSize={18}
                                                    >
                                                        { el.name.length > 1 ? service[el.name[0]] + '.  '+ service[el.name[1]] : service[el.name[0]] }
                                                    </Text>

                                                    <Flex bg='rgba(0,0,0,0.3)' h={0.1} w='100%' mt='4' mb='3'></Flex>
                                                </Flex>
                                            );
                                        })
                                    }
                                </Stack>
                        
                            </Flex>

                            {/* Rating and Opinions */}
                            <Flex w='100%' 
                                direction='column'
                                my='3'

                            >
                                {/* Header */}
                                <Flex w='100%'
                                    py='5'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Text
                                        fontSize={20}
                                    >
                                        {opinions.length} {opinions.length > 1 ? 'Opiniões' : 'Opinião'}
                                    </Text>
                                    <Button
                                        variant='outline'
                                        colorScheme='red'
                                        onClick={handleOpinion}
                                    >
                                        Deixe a sua opinião
                                    </Button>
                                </Flex>
                                    
                                {
                                opinions.length > 0
                                ?
                                <Flex w='100%' direction='column'>
                                    {/* Rating info */}
                                    <Flex w='100%' mb='4'
                                        flexWrap={{base:'wrap',lg:'nowrap'}}
                                    >
                                        {/* Rating star box */}
                                        <Flex 
                                            w={{base:'50%',lg:'20%'}}
                                            direction='column'
                                            alignItems='center'
                                            border='1px solid rgba(0,0,0,0.3)'
                                            borderRadius={8}
                                            px='5'
                                            py={{base:'10', lg:'5'}}
                                        >
                                            <Flex alignItems='center'>
                                                <Icon as={RiStarFill} 
                                                    color='brand.yellow'
                                                    fontSize={36}
                                                    
                                                />
                                                <Text ml='2'
                                                    fontSize={40}
                                                    fontWeight={400}
                                                >
                                                    {Number(opinions?.reduce((acc:any, curr:any) => acc + curr.ratingGeneral, 0) / opinions.length).toFixed(2)}
                                                </Text>
                                            </Flex>

                                            <Text
                                            > 
                                                de 5.0
                                            </Text>
                                        </Flex>

                                        <Flex 
                                            w={{base:'100%',lg:'80%'}} 
                                            ml={{base:0,lg:'5'}}
                                            direction='column'
                                            justifyContent='center'
                                            flexWrap={{base:'nowrap',lg:'wrap'}}
                                        >
                                            {
                                                [
                                                    {title: 'Qualidade do serviço', value: 'ratingServiceQuality'},
                                                    {title: 'Relação Custo Benefício', value: 'ratingPrice'},
                                                    {title: 'Tempo de resposta', value: 'ratingAnswerTime'},
                                                    {title: 'Flexibilidade', value: 'ratingFlexibility'},
                                                    {title: 'Profissionalismo', value: 'ratingProfessionalism'}

                                                ].map((el, index) => {
                                                    return (
                                                        <Flex alignItems='center' 
                                                            h={{base:'50%',lg:'30%'}}
                                                            mr='7'
                                                            justifyContent='space-between'
                                                            py={{base:'2.5',lg:'0'}}
                                                        >
                                                            <Text
                                                                mr='2'
                                                            >
                                                                {el.title}:   
                                                            </Text>
                                                            <Flex alignItems='center'>
                                                                <Icon as={RiStarFill} mr='2' color='brand.yellow' />
                                                                <Text>
                                                                    { Number( opinions?.reduce((acc:any, curr:any) => acc + curr[el.value], 0) / opinions.length).toFixed(2) }
                                                                </Text>
                                                            </Flex>
                                                        </Flex>
                                                    );
                                                })
                                            }
                                        </Flex>
                                    </Flex>

                                    {/* Opinions about the service */}
                                    <Flex w='100%' direction='column'>
                                        {/* Opinion */}
                                        {
                                            opinions.map((el, index) => {
                                                return (
                                                    <Flex 
                                                        py='5' 
                                                        px={{base:'1',lg:'4'}}
                                                        direction='column'
                                                        borderBottom='1px solid rgba(0,0,0,0.4)'
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

                                                        {/* Answer */}
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


                                                    </Flex>
                                                )
                                            })
                                        }
                                            
                                    </Flex>
                                </Flex>
                                :
                                <>
                                </>
                                }
                            </Flex>                           
                        </Flex>

                        {/* DESKTOP VERSION */}
                        {
                            /* Card */
                            <Flex w='30%' 
                                justifyContent='flex-end'
                                display={{base:'none', lg:'flex'}}
                            >
                                <Flex 
                                    h={430}
                                    w='85%'
                                    position='sticky'
                                    top={20}
                                    px='5'
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8}
                                    direction='column'
                                    textAlign='center'
                                >

                                    <Text as='h2'
                                        fontSize={21}
                                        fontWeight={500}
                                        my='4'
                                    >
                                        Pedir um orçamento!
                                    </Text>

                                    <Flex 
                                        direction='column'
                                        textAlign='left'
                                    >
                                        
                                        <Flex direction='column' mb='3'>
                                            <Text as='span'>Data do evento</Text>
                                            <Input type='date' 
                                                name='partyDate'
                                                onChange={handleEmailDataChange}
                                            />
                                        </Flex>

                                        <Flex direction='column' mb='3'>
                                            <Text as='span'>Número de convidados</Text>
                                            <Input type='number' 
                                                name='nOfPeople'
                                                onChange={handleEmailDataChange}
                                            />
                                        </Flex>

                                        <Flex direction='column' mb='3'>
                                            <Text as='span'>Mensagem</Text>
                                            <Textarea resize='none' 
                                                maxLength={300} h={100}
                                                name='messageContent'
                                                onChange={handleEmailDataChange}
                                            />
                                        </Flex>

                                        <Button
                                            bg='brand.red'
                                            color='white'
                                            height={12}
                                            fontSize={18}
                                            onClick={() => {
                                                handleSendEmail();
                                                // console.log('Service');
                                                //console.log(service);
                                                // console.log('Opinião');
                                                // console.log(opinions[0]);
                                            }}
                                        >
                                            Pedir orçamento!
                                        </Button>
                                    </Flex>
                                </Flex>    
                            </Flex>
                        }

                    </Flex>
                    
                </Flex>

                {/* Pedir orçamento mobile */}
                {
                    isMobileVersion
                    &&
                    <>
                        <Flex
                            position='fixed'
                            bg='brand.white'
                            bottom={0}
                            h='9vh'
                            w='100%'
                            alignItems='center'
                            justifyContent='space-evenly'
                            borderTop='2px solid rgba(0,0,0,0.10)'
                        >
                            <Button
                                bg='brand.red'
                                color='white'
                                //height={12}
                                fontSize={18}
                                h='70%'
                                w='70%'
                                onClick={modalBudget.onOpen}
                            >
                                Pedir orçamento grátis!
                            </Button>

                            {/* PHONE CALL */}
                            <NavLink
                                href={`tel:${service.phone}`}
                                h='70%'
                                w='20%'
                                bg='brand.white'
                                border='2px solid'
                                borderColor='brand.dark_blue'
                                color='brand.white'
                                borderRadius={8}
                            >
                                <Flex 
                                    h='100%'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <Icon as={RiPhoneFill}
                                        fontSize={24}
                                    />
                                </Flex>
                            </NavLink>
                        </Flex>

                        <Modal isOpen={modalBudget.isOpen} onClose={modalBudget.onClose} size='full'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader></ModalHeader>
                                <ModalCloseButton />
                                
                                <ModalBody
                                    h='100%'                            
                                >
                                    {/* Card */}
                                    <Flex 
                                    >
                                        <Flex 
                                            h={420}
                                            w='100%'
                                            px='3'
                                            direction='column'
                                            textAlign='center'
                                        >

                                            <Text as='h2'
                                                fontSize={21}
                                                fontWeight={500}
                                                my='4'
                                            >
                                                Pedir um orçamento!
                                            </Text>

                                            <Flex 
                                                direction='column'
                                                textAlign='left'
                                            >
                                                
                                                <Flex direction='column' mb='3'>
                                                    <Text as='span'>Data do evento</Text>
                                                    <Input type='date' 
                                                        name='partyDate'
                                                        onChange={handleEmailDataChange}
                                                    />
                                                </Flex>

                                                <Flex direction='column' mb='3'>
                                                    <Text as='span'>Número de convidados</Text>
                                                    <Input type='number' 
                                                        name='nOfPeople'
                                                        onChange={handleEmailDataChange}
                                                    />
                                                </Flex>

                                                <Flex direction='column' mb='3'>
                                                    <Text as='span'>Mensagem</Text>
                                                    <Textarea resize='none' 
                                                        maxLength={300} h={100}
                                                        name='messageContent'
                                                        onChange={handleEmailDataChange}
                                                    />
                                                </Flex>

                                                <Button
                                                    bg='brand.red'
                                                    color='white'
                                                    height={12}
                                                    fontSize={18}
                                                    onClick={() => {
                                                        handleSendEmail();
                                                        // console.log('Service');
                                                        //console.log(service);
                                                        // console.log('Opinião');
                                                        // console.log(opinions[0]);
                                                    }}
                                                >
                                                    Pedir orçamento!
                                                </Button>
                                            </Flex>
                                        </Flex>    
                                    </Flex>
                                </ModalBody>
                                
                                <ModalFooter>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>

                }
            </Flex>
            :
            <>
            </>
            }

            <Footer />
        </Box>
    );
}