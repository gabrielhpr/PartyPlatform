import { Box, Flex, Text, Input, Icon, Img, Textarea, Button, Stack, Avatar, useBreakpointValue, useDisclosure, Link as NavLink, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, FormControl, FormErrorMessage, Checkbox } from "@chakra-ui/react";
import Image from 'next/image'
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { RiStarSFill, RiPhoneFill, RiWhatsappFill, RiMailFill, RiStarFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";
import { ModalServiceProfile } from "../components/ModalServiceProfile";
import { ModalImageGallery } from "../components/ModalImageGallery";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { enterpriseSpecificCategoryDict, locationMap, locationMapUser, specificQuestions } from "../utils/typeOfParties";
import { useUserAuthContext } from "../context/userContext";
import { Sidebar } from "../components/Sidebar";
import Script from "next/script";
import { IoMdArrowRoundBack } from "react-icons/io";
import { userRegisterDataNullState, userRegisterDataProps, userRegisterDataFormErrorProps, userRegisterDataFormErrorNullState } from "../utils/userInterface";
import { FlashMessageComponent } from "../components/FlashMessageComponent";
import { askBudgetSchema, userRegisterFormSchema, userRegisterPasswordSchema } from "../utils/validations";
import * as yup from 'yup';

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

    photos: string[];

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

interface askBudgetInterf {
    enterpriseId: string;
    partyType: string;
    partyDate: string;
    nOfPeople: string;
    messageContent: string;
}

const askBudgetNullState = {
    enterpriseId: '',
    partyType: '',
    partyDate: '',
    nOfPeople: '',
    messageContent: ''
}

interface askBudgetFormErrorInterf {
    enterpriseId: string;
    partyType: string;
    partyDate: string;
    nOfPeople: string;
    messageContent: string;
}

const askBudgetFormErrorNullState = {
    enterpriseId: '',
    partyType: '',
    partyDate: '',
    nOfPeople: '',
    messageContent: ''
}


export default function ServiceProfilePage() {
    const routerNext = useRouter();
    const [service, setService] = useState<serviceDataInterf>(serviceNullState);
    const [opinions, setOpinions] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);
    // EMAIL DATA
    const [emailData, setEmailData] = useState<askBudgetInterf>(askBudgetNullState);
    const [formErrorsEmailData, setFormErrorsEmailData] = useState<askBudgetFormErrorInterf>(askBudgetFormErrorNullState);
    // REGISTER
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
    const [formErrorsUserRegister, setFormErrorsUserRegister] = useState<userRegisterDataFormErrorProps>(userRegisterDataFormErrorNullState);
    // LOGIN
    const [userLoginData, setUserLoginData] = useState({email: '', password:''});
    // HOOKS - EMAIL, LOGIN, REGISTER
    const { userSendEmail, authenticatedUser, loginUser, registerUser } = useUserAuthContext();
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });
    // MODAL
    const modalGallery = useDisclosure();
    const modalBudget = useDisclosure();
    const modalRegister = useDisclosure();
    const modalLogin = useDisclosure();
    // MENU LOCATION
    const [menuWhere, setMenuWhere] = useState('none');
    
    // MENU SEARCH
    function searchFunction( event: any, menuId: string ) {
        console.log( event.currentTarget.value );
        let inputValue = event.currentTarget.value.toUpperCase();
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

    function handleOpinion() {
        routerNext.push({
            pathname: '/rating',
            query: { 
                enterpriseId: routerNext.query.id,
                partyType: routerNext.query.partyType
            }
        });
    }
    async function handleValidation( fields: Array<string>, schemaForm: any, setErrorFunction: any, data: any ) {
        console.log(fields);

        // Reset errors message
        fields.map((el, index) => {
            setErrorFunction((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await schemaForm
            .validateAt( el, data)
            .catch((err) => {
                setErrorFunction((formE) => ({...formE, [el]:err.errors[0]}));
                console.log(err);
            });
        });

        let validForm = true;

        // Check if can go to the next step
        fields.map( (el, index) => {
            
            let isValidField = yup.reach( schemaForm, el )
            .isValidSync( data[el] );
            console.log(isValidField);

            validForm = validForm && isValidField;                
        });

        console.log('validForm');
        console.log(validForm);
        // If there is no error its validated
        return validForm;

        // if( validForm ) {
        //     setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
        // }
    }

    function handleEmailDataChange( event: any ) {
        setEmailData({...emailData, [event.currentTarget.name]: event.currentTarget.value});
    }

    // HANDLE CHANGE
    function handleChangeLogin( event: any ) {
        setUserLoginData({...userLoginData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( userLoginData );
    }
    function handleChangeRegister( event: any ) {
        setUserRegisterData({...userRegisterData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( userRegisterData );
    }

    // HANDLE SUBMIT
    async function handleSubmitLogin() {
        console.log('Entrou handleSubmitLogin');
        await loginUser( userLoginData, false );
        console.log('O resultado de loginUser é');
        console.log('Saiu handleSubmitLogin');
    }
    
    async function handleSubmitRegister() {
        
        // VALIDATE GENERAL
        let isValidGeneral = await handleValidation(
            ['fullName', 'email', 'phone', 'whatsapp', 'location', 'accept'],
            userRegisterFormSchema,
            setFormErrorsUserRegister,
            userRegisterData
        );

        // VALIDATE PASSWORD
        let fields = ['password', 'passwordConfirmation'];

        //Reset errors message
        fields.map((el, index) => {
            setFormErrorsUserRegister((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await userRegisterPasswordSchema
            .validateAt( el, userRegisterData)
            .catch((err) => {
                setFormErrorsUserRegister((formE) => ({...formE, [el]:err.errors[0]}));
                console.log(err);
            });
        });

        // Validate
        let isValidPassword = await userRegisterPasswordSchema
        .isValid({password:userRegisterData.password, passwordConfirmation:userRegisterData.passwordConfirmation})
        .then((val) =>{
            return val;
        });

        if( isValidGeneral && isValidPassword ) {
            console.log('Entrou handleSubmitRegister');
            await registerUser( userRegisterData, false );
            console.log('Saiu handleSubmitRegister');
        }
    }

    async function handleSendEmail() {
        console.log( emailData );

        if( authenticatedUser ) {
            console.log('vai enviar o email');

            // VALIDATE
            let isValid = await handleValidation(
                ['partyDate', 'nOfPeople', 'messageContent'],
                askBudgetSchema,
                setFormErrorsEmailData,
                emailData
            );
           
            if( isValid ) {
                console.log('Entrou handleSendEmail');

                userSendEmail( emailData );
                console.log('Saiu handleSendEmail');
            }
        }
        else {
            modalRegister.onOpen();
        }
    }

    function handleShowAllImages() {
        setShowAllImages(true);
    }
    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        
        let {id, partyType} = routerNext.query;
        id = id.toString();
        partyType = partyType.toString();

        if (typeof window !== 'undefined') {
            window.gtag('event', 'page_view', {
                page_title: 'serviceProfilePage',
                page_location: 'serviceProfilePage',
                page_path: `serviceProfile/enterprise-${id}`,
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
            
            setService(response.data.service);
            setOpinions(response.data.opinions);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [routerNext.query]);

    useEffect(() => {
        if( authenticatedUser == true ) {
            modalRegister.onClose();
            modalLogin.onClose();
        }
    }, [authenticatedUser]);

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

            <FlashMessageComponent/>

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
                    {/* Details about the search */}
                    <Flex
                        px={{base:'5',lg:'0'}}
                        mt='3'
                        alignItems='center'
                    >
                        <IconButton 
                            aria-label='back' 
                            icon={<Icon as={IoMdArrowRoundBack}/>}
                            bg='rgba(0,0,0,0)'
                            onClick={() => {
                                if( localStorage.getItem('previousRoute') != null ) {
                                    routerNext.push( localStorage.getItem('previousRoute') );
                                }
                                else {
                                    routerNext.push('/');
                                }
                            }}
                        />
                        
                        <Text
                            color='rgba(0,0,0,0.5)'
                            fontWeight={600}
                            ml='2'
                        >
                            {service.partyMainFocus} / {service.enterpriseCategory == 'Servico' ? 'Serviço' : 'Espaço'} / {enterpriseSpecificCategoryDict[ service.enterpriseSpecificCategory ]}
                        </Text>
                    </Flex>

                    {/* Details about the service */}
                    <Flex direction='column'
                        px={{base:'5',lg:'0'}}
                    >
                        <Flex alignItems='flex-end' mt='1'>
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
                        
                        <Flex mt='2'
                            justifyContent={{base:'space-between', lg:'flex-start'}}
                        >
                            <Flex alignItems='center'
                                display={opinions.length > 0 ? 'flex': 'none'}
                            >
                                <Icon as={RiStarSFill} color='red' />
                                <Text ml='1'>
                                    {Number(opinions?.reduce((acc:any, curr:any) => acc + curr.ratingGeneral, 0) / opinions.length).toFixed(2)}
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
                                handleClick={() => {
                                    console.log('entrou no handle click');
                                    if (typeof window !== 'undefined') {
                                        window.gtag('event', 'verTelefone', {
                                            'event_category': `${service.partyMainFocus}`,
                                            'event_label': `${service.id}`,
                                            'value': 1,
                                        });
                                    }
                                }}              
                            />

                            {
                                service.whatsapp != ''
                                &&
                                <ModalServiceProfile 
                                    buttonText="Ver Whatsapp"
                                    title="Envie uma mensagem!"
                                    subtitle="Conte ao fornecedor que você
                                    o encontrou pelo Festafy"
                                    icon={RiWhatsappFill}
                                    iconColor='green'
                                    content={service.whatsapp}
                                    handleClick={() => {
                                        console.log('entrou no handle click');
                                        if (typeof window !== 'undefined') {
                                            window.gtag('event', 'verWhatsapp', {
                                                'event_category': `${service.partyMainFocus}`,
                                                'event_label': `${service.id}`,
                                                'value': 1,
                                            });
                                        }
                                    }}
                                />
                            }

                            <ModalServiceProfile 
                                buttonText="Ver E-mail"
                                title="Envie um e-mail!"
                                subtitle="Conte ao fornecedor que você
                                o encontrou pelo Festafy"
                                icon={RiMailFill}
                                iconColor='black'
                                content={service.email}
                                handleClick={() => {
                                    console.log('entrou no handle click');
                                    if (typeof window !== 'undefined') {
                                        window.gtag('event', 'verEmail', {
                                            'event_category': `${service.partyMainFocus}`,
                                            'event_label': `${service.id}`,
                                            'value': 1,
                                        });
                                    }
                                }}
                            />

                        </Flex>
                    </Flex>                        

                    {/* Photos */}
                    <Flex w='100%' pb='10' pt='5' 
                        h={{base:400,lg:500}}
                        justifyContent='space-between'
                        alignItems='space-between'
                    >
                    
                        <Flex w={{base:'100%', lg:'50%'}}
                            onClick={modalGallery.onOpen}
                            position='relative'
                            borderLeftRadius={{base:0,lg:8}}
                            overflowY='hidden'
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
                                    zIndex={1}
                                >
                                    + Fotos
                                </Button>                                    
                            }

                            <Image
                                unoptimized
                                layout='fill'
                                objectFit='cover'
                                // http://localhost:5000/images/enterprise/
                                src={service.photos[0]}
                            />
                        </Flex>


                        {/* DESKTOP VERSION */}
                        {/* Other showed pictures */}
                        <Flex w='49%' h='100%' flexWrap='wrap' 
                            justifyContent='space-between'
                            alignItems='space-between'
                            display={{base:'none', lg:'flex'}}
                        >
                            <Flex w='49%' h='49%' //ml='2' mb='1'
                                onClick={modalGallery.onOpen}
                                position='relative'
                            > 
                                <Image
                                    unoptimized
                                    layout='fill'
                                    //src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[1]}`}
                                    src={service.photos[1]}
                                    objectFit='cover'
                                />
                            </Flex>

                            <Flex w='49%' h='49%' //ml='2' mb='1'
                                onClick={modalGallery.onOpen}
                                borderTopRightRadius={8}
                                overflowY='hidden'
                                position='relative'
                            >
                                <Image
                                    unoptimized
                                    layout='fill'
                                    objectFit='cover'
                                    //src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[2]}`}
                                    src={service.photos[2]}
                                />
                            </Flex>

                            <Flex w='49%' h='49%' //ml='2' mt='1'
                                onClick={modalGallery.onOpen}
                                position='relative'
                                alignSelf='flex-end'

                            >
                                <Image
                                    unoptimized
                                    layout='fill'
                                    //src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[3]}`}
                                    src={service.photos[3]}
                                    objectFit='cover'
                                />
                            </Flex>

                            <Flex w='49%' h='49%' 
                                //ml='2' mt='1' 
                                position='relative'
                                borderBottomRightRadius={8}
                                overflowY='hidden'
                                alignSelf='flex-end'
                            >

                                <Button 
                                    bg='brand.white'
                                    color='brand.dark_blue'
                                    w='70%'
                                    position='absolute'
                                    top='50%'
                                    left='50%'
                                    transform='translate(-50%, 80%)'
                                    onClick={modalGallery.onOpen}
                                    zIndex={5}
                                >
                                    Ver todas as fotos
                                </Button>

                                <Image
                                    unoptimized
                                    layout='fill'
                                    //src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[4]}`}
                                    src={service.photos[4]}
                                    objectFit='cover'
                                />
                            </Flex>
                        </Flex>


                        {/* Photo Gallery Modal */}
                        <ModalImageGallery
                            buttonText='Ver todas as fotos'
                            handleFunctions={modalGallery}
                            content={
                                /*
                                service.photos?.split(',').map((image, index) => {
                                    return {
                                        'id': `service_${index}`,
                                        'src': `http://localhost:5000/images/enterprise/${image}`,
                                        'alt': 'Service',
                                    }
                                })
                                */
                                service.photos?.map((image, index) => {
                                    return {
                                        'id': `service_${index}`,
                                        'src': `${image}`,
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

                                <Text as='p'
                                    whiteSpace='pre-wrap'
                                >
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
                                    h={500}
                                    //minH={450}
                                    w='85%'
                                    position='sticky'
                                    top={20}
                                    px='5'
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8}
                                    //alignItems='space-between'
                                    //py='auto'
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
                                            <FormControl 
                                                isInvalid={formErrorsEmailData.partyDate != '' ? true : false}
                                            >
                                                <Input 
                                                    type='text' 
                                                    name='partyDate'
                                                    value={emailData.partyDate}
                                                    onChange={(event: any) => {
                                                        setFormErrorsEmailData({...formErrorsEmailData, partyDate: ''});
                                                        handleEmailDataChange( event );
                                                    }}
                                                />
                                                <FormErrorMessage>
                                                    {formErrorsEmailData.partyDate}
                                                </FormErrorMessage> 
                                            </FormControl>
                                        </Flex>

                                        <Flex direction='column' mb='3'>
                                            <Text as='span'>Número de convidados</Text>
                                            <FormControl 
                                                isInvalid={formErrorsEmailData.nOfPeople != '' ? true : false}
                                            >
                                                <Input type='number' 
                                                    name='nOfPeople'
                                                    value={emailData.nOfPeople}
                                                    onChange={(event: any) => {
                                                        setFormErrorsEmailData({...formErrorsEmailData, nOfPeople: ''});
                                                        handleEmailDataChange( event );
                                                    }}
                                                />
                                                <FormErrorMessage>
                                                    {formErrorsEmailData.nOfPeople}
                                                </FormErrorMessage> 
                                            </FormControl>
                                        </Flex>

                                        <Flex direction='column' mb='3'>
                                            <Text as='span'>Mensagem</Text>
                                            <FormControl 
                                                isInvalid={formErrorsEmailData.messageContent != '' ? true : false}
                                            >
                                                <Textarea resize='none' 
                                                    maxLength={300} h={100}
                                                    name='messageContent'
                                                    value={emailData.messageContent}
                                                    onChange={(event: any) => {
                                                        setFormErrorsEmailData({...formErrorsEmailData, messageContent: ''});
                                                        handleEmailDataChange( event );
                                                    }}
                                                />
                                                <FormErrorMessage>
                                                    {formErrorsEmailData.messageContent}
                                                </FormErrorMessage> 
                                            </FormControl>
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
                                color='brand.dark_blue'
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
                                <ModalHeader>
                                    <FlashMessageComponent/>
                                </ModalHeader>
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
                                                    <FormControl 
                                                        isInvalid={formErrorsEmailData.partyDate != '' ? true : false}
                                                    >
                                                        <Input 
                                                            type='text' 
                                                            name='partyDate'
                                                            value={emailData.partyDate}
                                                            onChange={(event: any) => {
                                                                setFormErrorsEmailData({...formErrorsEmailData, partyDate: ''});
                                                                handleEmailDataChange( event );
                                                            }}
                                                        />
                                                        <FormErrorMessage>
                                                            {formErrorsEmailData.partyDate}
                                                        </FormErrorMessage> 
                                                    </FormControl>
                                                </Flex>

                                                <Flex direction='column' mb='3'>
                                                    <Text as='span'>Número de convidados</Text>
                                                    <FormControl 
                                                        isInvalid={formErrorsEmailData.nOfPeople != '' ? true : false}
                                                    >
                                                        <Input type='number' 
                                                            name='nOfPeople'
                                                            value={emailData.nOfPeople}
                                                            onChange={(event: any) => {
                                                                setFormErrorsEmailData({...formErrorsEmailData, nOfPeople: ''});
                                                                handleEmailDataChange( event );
                                                            }}
                                                        />
                                                        <FormErrorMessage>
                                                            {formErrorsEmailData.nOfPeople}
                                                        </FormErrorMessage> 
                                                    </FormControl>
                                                </Flex>

                                                <Flex direction='column' mb='3'>
                                                    <Text as='span'>Mensagem</Text>
                                                    <FormControl 
                                                        isInvalid={formErrorsEmailData.messageContent != '' ? true : false}
                                                    >
                                                        <Textarea resize='none' 
                                                            maxLength={300} h={100}
                                                            name='messageContent'
                                                            value={emailData.messageContent}
                                                            onChange={(event: any) => {
                                                                setFormErrorsEmailData({...formErrorsEmailData, messageContent: ''});
                                                                handleEmailDataChange( event );
                                                            }}
                                                        />
                                                        <FormErrorMessage>
                                                            {formErrorsEmailData.messageContent}
                                                        </FormErrorMessage> 
                                                    </FormControl>
                                                </Flex>

                                                <Button
                                                    bg='brand.red'
                                                    color='white'
                                                    height={12}
                                                    fontSize={18}
                                                    onClick={() => {
                                                        handleSendEmail();
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

                {/* Cadastro ou Login Modal */}
                <Modal isOpen={modalRegister.isOpen} onClose={modalRegister.onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader></ModalHeader>
                    
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex 
                                direction="column"
                                h={{base:'100%',lg:'90%'}}
                                //width={{base:'100%', lg:500}}
                                w='auto'
                                py={{base:'1',lg:'6'}}
                                px={{base:'0', lg:"10" }}
                                justifyContent="flex-start"
                                bg="white" 
                                //boxShadow={{base:'none', lg:"0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"}}
                                borderRadius={8} 
                                fontSize={20}
                            >
                                {/* LOGIN */}
                                <Flex
                                    mb='2'
                                    mt={{base:'5',lg:'0'}}
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Text>
                                        Já possui uma conta ?
                                    </Text>

                                    <Button ml='3' 
                                        onClick={() => {
                                            modalLogin.onOpen();
                                        }}
                                        bg='white'
                                        color='blue'
                                    > 
                                        Entre
                                    </Button>
                                    
                                    {/* LOGIN - MODAL */}
                                    <Modal isOpen={modalLogin.isOpen} onClose={modalLogin.onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>
                                                <FlashMessageComponent/>
                                            </ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                {/* Form Login */}
                                                <Flex 
                                                    direction="column"
                                                    width={{base:'100%',lg:400}}
                                                    height='80%'
                                                    pt="1"
                                                    pb="1"
                                                    px="10" 
                                                    justifyContent="center"
                                                    bg="white" 
                                                    fontSize={20}
                                                >
                                                    <Text as="h2" textAlign="center" my="1" fontSize={22} 
                                                        fontWeight={500}
                                                    >
                                                        SEJA BEM-VINDO!
                                                    </Text>

                                                    <Flex direction="column" mt="3">
                                                        <Text color="brand.white_40" fontSize={19}>
                                                            E-mail
                                                        </Text>

                                                        <Input placeholder="email@example.com"
                                                            name="email"
                                                            onChange={handleChangeLogin}
                                                        />
                                                    </Flex>

                                                    <Flex direction="column"
                                                        mt="3"
                                                    >
                                                        <Text color="brand.white_40" fontSize={19}>
                                                            Senha
                                                        </Text>

                                                        <Input placeholder="********"
                                                            name="password"
                                                            type="password"
                                                            onChange={handleChangeLogin}
                                                        />
                                                    </Flex>

                                                    <Button 
                                                        mt="8"
                                                        bg="brand.red"
                                                        color="brand.white"
                                                        fontSize={18}
                                                        py="6"
                                                        onClick={() => {
                                                            handleSubmitLogin();
                                                            //modalLogin.onClose();
                                                        }}
                                                    >
                                                        LOGIN
                                                    </Button>

                                                    <Flex direction="column" justifyContent="center" mt='4'>
                                                        <NavLink href="/prices">
                                                            <Text textAlign="center" fontSize={16}
                                                                color="brand.light_blue_40"
                                                            >
                                                                Esqueceu sua senha ?
                                                            </Text>
                                                        </NavLink>
                                                    </Flex>

                                                </Flex>
                                            </ModalBody>

                                            <ModalFooter>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Flex>

                                <Text textAlign='center'
                                    mb='2'
                                >
                                    ou
                                </Text>

                                <Text as="h2" textAlign="center" mb="1" fontSize={22} 
                                    fontWeight={500}
                                >
                                    INSCREVA-SE
                                </Text>

                                {/* Full name */}
                                <Flex direction="column" mt="3">
                                    <Text color="brand.white_40" fontSize={19}>
                                        Nome completo
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.fullName != '' ? true : false}
                                    >
                                        <Input 
                                            name="fullName"
                                            value={userRegisterData.fullName}
                                            onChange={(event: any) => {
                                                handleChangeRegister(event);
                                                setFormErrorsUserRegister({...formErrorsUserRegister, fullName: ''});
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.fullName}
                                        </FormErrorMessage> 
                                    </FormControl>
                                </Flex>
                                
                                {/* E-mail */}
                                <Flex direction="column" mt="3">
                                    <Text color="brand.white_40" fontSize={19}>
                                        E-mail
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.email != '' ? true : false}
                                    >
                                        <Input placeholder="email@example.com"
                                            name="email"
                                            value={userRegisterData.email}
                                            onChange={(event: any) => {
                                                handleChangeRegister(event);
                                                setFormErrorsUserRegister({...formErrorsUserRegister, email: ''});
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.email}
                                        </FormErrorMessage> 
                                    </FormControl>
                                </Flex>

                                {/* Password */}
                                <Flex direction="row" mt='3'
                                    alignItems='flex-end'
                                >
                                    <Flex direction="column"
                                    >
                                        <Text color="brand.white_40" fontSize={19}>
                                            Senha
                                        </Text>

                                        <FormControl 
                                            isInvalid={formErrorsUserRegister.password != '' ? true : false}
                                        >
                                            <Input placeholder="********"
                                                name="password"
                                                type="password"
                                                value={userRegisterData.password}
                                                onChange={(event: any) => {
                                                    handleChangeRegister(event);
                                                    setFormErrorsUserRegister({...formErrorsUserRegister, password: ''});
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {formErrorsUserRegister.password}
                                            </FormErrorMessage> 
                                        </FormControl>                                        
                                    </Flex>

                                    <Flex direction="column" ml='2'
                                    >
                                        <Text color="brand.white_40" fontSize={19}>
                                            Confirmação da Senha
                                        </Text>

                                        <FormControl 
                                            isInvalid={formErrorsUserRegister.passwordConfirmation != '' ? true : false}
                                        >
                                            <Input placeholder="********"
                                                name="passwordConfirmation"
                                                type="password"
                                                value={userRegisterData.passwordConfirmation}
                                                onChange={(event: any) => {
                                                    handleChangeRegister(event);
                                                    setFormErrorsUserRegister({...formErrorsUserRegister, passwordConfirmation: ''});
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {formErrorsUserRegister.passwordConfirmation}
                                            </FormErrorMessage> 
                                        </FormControl>                                         
                                    </Flex>
                                </Flex>

                                {/* Phone */}
                                <Flex direction="column"
                                    mt="3"
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Telefone
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.phone != '' ? true : false}
                                    >
                                        <Input 
                                            name="phone"
                                            type="text"
                                            value={userRegisterData.phone}
                                            onChange={(event: any) => {
                                                handleChangeRegister(event);
                                                setFormErrorsUserRegister({...formErrorsUserRegister, phone: ''});
                                            }}
                                            
                                        />
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.phone}
                                        </FormErrorMessage> 
                                    </FormControl>  
                                </Flex>

                                {/* Whatsapp */}
                                <Flex direction="column"
                                    mt="3"
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Whatsapp
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.whatsapp != '' ? true : false}
                                    >
                                        <Input 
                                            name="whatsapp"
                                            type="text"
                                            value={userRegisterData.whatsapp}
                                            onChange={(event: any) => {
                                                handleChangeRegister(event);
                                                setFormErrorsUserRegister({...formErrorsUserRegister, whatsapp: ''});
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.whatsapp}
                                        </FormErrorMessage> 
                                    </FormControl> 
                                </Flex>

                                {/* Location */}
                                <Flex direction="column"
                                    mt="3"
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Onde reside
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.location != '' ? true : false}
                                    >
                                        <Flex direction='column'
                                        >
                                            {/* Onde - Localização */}
                                            <Input 
                                                _focus={{outline:'none'}}
                                                value={userRegisterData.location}
                                                onChange={(event: any) => {
                                                    setUserRegisterData({...userRegisterData, location: event.currentTarget.value});
                                                    searchFunction(event, "menuWhere");
                                                }}
                                                onClick={() => {
                                                    setMenuWhere('onclick')
                                                }}
                                            />
                                            <Box 
                                                id='menuLocation'
                                                height={230} 
                                                width={350}
                                                display={menuWhere}
                                                position='absolute'
                                                overflowY="scroll"
                                                bg='brand.white'
                                                mt={{base:1, lg: 5}}
                                                borderRadius={10}
                                                zIndex={3}
                                            >
                                                <Flex direction="column" id="menuWhere"
                                                    h='100%'
                                                >
                                                    {
                                                    Object.values(locationMapUser).map((el, i) => {
                                                        return(
                                                            <Button
                                                                bg='white'
                                                                h='25%'
                                                                py='4'
                                                                px='5'
                                                                borderRadius={0}
                                                                _focus={{outline:'none'}}
                                                                _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                                //name='partyType'
                                                                //value={el.value}
                                                                onClick={(event) => {
                                                                    setUserRegisterData({...userRegisterData, location: el.textToShow, city: el.city, state: el.state, country: el.country})
                                                                    setFormErrorsUserRegister({...formErrorsUserRegister, location: ''});
                                                                    setMenuWhere('none');
                                                                }}
                                                            >
                                                                <Text
                                                                    width='100%'
                                                                    textAlign='left'
                                                                    fontWeight={400}
                                                                    fontSize={18}
                                                                >
                                                                    {el.textToShow}
                                                                </Text>
                                                            </Button>
                                                        );
                                                    })
                                                    }
                                                </Flex>
                                            </Box>
                                        </Flex>      
                                        
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.location}
                                        </FormErrorMessage> 
                                    </FormControl> 
                                </Flex>

                                {/* ACEITE */}
                                <Flex direction='column' mt='3'>
                                    <FormControl isInvalid={formErrorsUserRegister.accept != '' ? true : false}>                                
                                        <Checkbox
                                            name='accept'
                                            onChange={(event: any) => {
                                                setUserRegisterData({...userRegisterData, [event.currentTarget.name]: String(event.currentTarget.checked)});
                                                setFormErrorsUserRegister({...formErrorsUserRegister, [event.currentTarget.name]: ''});
                                            }}
                                            isChecked={userRegisterData.accept == 'true' ? true : false}
                                        >
                                            Aceito os <NavLink href='https://www.iubenda.com/termos-e-condicoes/19023979' color='brand.blue' fontWeight={500} isExternal>Termos e Condições</NavLink> e <NavLink href='https://www.iubenda.com/privacy-policy/19023979' color='brand.blue' fontWeight={500} isExternal>Política de Privacidade</NavLink>.
                                        </Checkbox>
                                        
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.accept}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>   

                                <Button 
                                    mt="8"
                                    bg="brand.red"
                                    color="brand.white"
                                    fontSize={18}
                                    py="6"
                                    onClick={handleSubmitRegister}
                                >
                                    Cadastrar
                                </Button>
                                
                            </Flex>
                        </ModalBody>

                        <ModalFooter>
                            
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Flex>
            :
            <>
            </>
            }

            <Footer />
        </Box>
    );
}