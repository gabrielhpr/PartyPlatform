import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, 
    MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, 
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
    ModalOverlay, Popover, PopoverArrow, PopoverBody, 
    PopoverCloseButton, PopoverContent, PopoverHeader, 
    PopoverTrigger, Stack, Text, Textarea, 
    IconButton,
    Tooltip, useDisclosure, Link as NavLink, Img, Box, FormControl, FormErrorMessage, Checkbox, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RegisterFormLayout } from "../components/Enterprise/RegisterFormLayout";
import { RiInformationLine } from 'react-icons/ri';
import { useUserAuthContext } from "../context/userContext";
import { locationMap, typeOfParties } from "../utils/typeOfParties";
import { useRouter } from "next/router";
import api from "../utils/api";
import * as yup from 'yup';
import { dateRegex, invalidTextRegex, validTextRegex } from "../utils/regexCustom";
import { FlashMessageComponent } from "../components/FlashMessageComponent";
import { userRegisterDataFormErrorNullState, userRegisterDataFormErrorProps, userRegisterDataNullState, userRegisterDataProps } from "../utils/userInterface";
import { userRegisterFormSchema, userRegisterPasswordSchema } from "../utils/validations";
import useFlashMessage from "../hooks/useFlashMessage";

interface ratingDataInterf {
    step: number;
    enterpriseId: string;
    partyType: string;
    partyDate: string;
    ratingServiceQuality: string;
    ratingPrice: string;
    ratingAnswerTime: string;
    ratingFlexibility: string;
    ratingProfessionalism: string;
    recommendToAFriend: string;
    recommendToAFriendObservation: string;
    opinionTitle: string;
    opinionContent: string;
}

const ratingDataNullState = {
    step: 1,
    enterpriseId: '',
    partyType: '',
    partyDate: '',
    ratingServiceQuality: '',
    ratingPrice: '',
    ratingAnswerTime: '',
    ratingFlexibility: '',
    ratingProfessionalism: '',
    recommendToAFriend: '',
    recommendToAFriendObservation: '',
    opinionTitle: '',
    opinionContent: '',
}

interface serviceDataInterf {
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    accept: string;
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
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    accept: '',
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

interface ratingDataFormErrorInterf {
    partyType: string;
    partyDate: string;
    ratingServiceQuality: number;
    ratingPrice: number;
    ratingAnswerTime: number;
    ratingFlexibility: number;
    ratingProfessionalism: number;
    recommendToAFriend: string;
    recommendToAFriendObservation: string;
    opinionTitle: string;
    opinionContent: string;
}

const ratingDataFormErrorNullState = {
    partyType: '',
    partyDate: '',
    ratingServiceQuality: 0,
    ratingPrice: 0,
    ratingAnswerTime: 0,
    ratingFlexibility: 0,
    ratingProfessionalism: 0,
    recommendToAFriend: '',
    recommendToAFriendObservation: '',
    opinionTitle: '',
    opinionContent: ''
}

const RatingFormSchema = yup.object().shape({
    partyType: yup.string().required('O tipo da festa é obrigatório').oneOf(
        Object.values(typeOfParties).map((el,index) => {return el.value})
        , 'Opção não válida'),
    partyDate: yup.string().required("A data da festa é obrigatória").matches(dateRegex, { message: 'Data inválida. A data deve ter o formato dd/mm/yyyy.', excludeEmptyString: true } ),
    ratingServiceQuality: yup.string().required('Esse quesito é obrigatório').oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingPrice: yup.string().required('Esse quesito é obrigatório').oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingAnswerTime: yup.string().required('Esse quesito é obrigatório').oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingFlexibility: yup.string().required('Esse quesito é obrigatório').oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingProfessionalism: yup.string().required('Esse quesito é obrigatório').oneOf(['1','2','3','4','5'], 'Opção inválida'),
    recommendToAFriend: yup.string().required('Esse quesito é obrigatório').oneOf(['Sim', 'Não'], 'Opção inválida'),
    recommendToAFriendObservation: yup.string().optional()
        .max(500, 'A observação deve ter no máximo 500 caracteres')
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true}),                       
    opinionTitle: yup.string().required('O título da opinião é obrigatório')
        .max(60, 'O título da opinião deve ter no máximo 60 caracteres')
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true}),                       
    opinionContent: yup.string().required('O conteúdo da opinião é obrigatório')
        .max(500, 'A opinião deve ter no máximo 500 caracteres')
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true})                      
});

export default function Rating() {
    // RATING
    const [ratingData, setRatingData] = useState<ratingDataInterf>( ratingDataNullState );
    const [formErrorsRating, setFormErrorsRating] = useState<ratingDataFormErrorInterf>( ratingDataFormErrorNullState );
    // REGISTER
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
    const [formErrorsUserRegister, setFormErrorsUserRegister] = useState<userRegisterDataFormErrorProps>(userRegisterDataFormErrorNullState);
    // LOGIN
    const [userLoginData, setUserLoginData] = useState({email: '', password:''});
    // USER DATA FROM DB
    const [userStoredData, setUserStoredData] = useState({});
    // SERVICE INFORMATION
    const [service, setService] = useState<serviceDataInterf>( serviceNullState );
    // Menu location
    const [menuWhere, setMenuWhere] = useState('none');

    const { authenticatedUser, loginUser, registerUser, userRate } = useUserAuthContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { setFlashMessage } = useFlashMessage();

    const routerNext = useRouter();

    // Used in Menu search
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

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        setRatingData({...ratingData, enterpriseId: routerNext.query.enterpriseId, step: 1});

        const {enterpriseId, partyType} = routerNext.query;

        api.get('/serviceProfile', {
            params: {
                id: enterpriseId,
                partyType: partyType
            }
        })
        .then((response) => {
            console.log('Service');
            console.log(response.data.service[0]);
            setService(response.data.service[0]);
        })
    }, [routerNext.query]);

    useEffect(() => {

        if( authenticatedUser == true ) {
            console.log('authenticated user');
            try {
                const token = localStorage.getItem("tokenUser");
                
                api.get('/user/user', {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(token)}`
                    }
                })
                .then((response) => {
                    console.log(response.data.userData);
                    setUserStoredData(response.data.userData);
                })
            }   
            catch(err) {
                console.log( err );
                // msgText = err.response.data.message;
                // msgType = "error";
            }
        }

    }, [authenticatedUser]);

    // Close dropdown menu on click outside
    useEffect(() => {
        document.addEventListener('mouseup', function (e) {
            var menu1 = document.getElementById('menuLocation');

            if (!menu1?.contains(e.currentTarget)) {
                setMenuWhere('none');
            }
        }.bind(this));
    },[]);

    async function nextStep() {
        if( ratingData.step == 1 ) {
            console.log('entrou no step 1');       
            let isValid = await handleValidation(
                ['ratingServiceQuality', 'ratingPrice', 'ratingAnswerTime', 'ratingFlexibility', 'ratingProfessionalism'],
                RatingFormSchema,
                setFormErrorsRating,
                ratingData
            );
            if( isValid ) {
                setRatingData({...ratingData, step: ratingData.step + 1});
            }
        }
        else if( ratingData.step == 2 ) {
            console.log('entrou no step 2');       
            let isValid = await handleValidation(
                ['recommendToAFriend', 'recommendToAFriendObservation', 'opinionTitle', 'opinionContent', 'partyDate', 'partyType'],
                RatingFormSchema,
                setFormErrorsRating,
                ratingData
            );
            if( isValid ) {
                setRatingData({...ratingData, step: ratingData.step + 1});
            }
        }       
    }

    function previousStep() {       
        if( ratingData.step > 1) {
            setRatingData({...ratingData, step: ratingData.step - 1});
        }
    }

    function handleChange( event: any ) {
        setRatingData({...ratingData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( ratingData );
    }

    function handleChangeLogin( event: any ) {
        setUserLoginData({...userLoginData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( userLoginData );
    }

    function handleChangeRegister( event: any ) {
        setUserRegisterData({...userRegisterData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( userRegisterData );
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
    
    async function handleSubmitRating() {
        console.log('Entrou handleSubmitRating');
        console.log( ratingData );
        let result = await userRate( ratingData );
        console.log( result );
        if( result == 'success' ) {
            window.setTimeout(() => {
                routerNext.push('/');
            }, 1000);
        }
        console.log('Saiu handleSubmitRating');
    }

    function handleSubmit( event: any ) {
        console.log(' handle submit ');
    }

    switch( ratingData.step ) {

        case 0:
            return (
                <RegisterFormLayout 
                    question="A sua opinião vale muito!"
                    subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='50%' alignItems='center'>
                        <Text
                            textAlign='center'
                        >
                            Escreva abaixo o nome do fornecedor que você quer 
                            deixar uma opinião.
                        </Text>

                        <Input 
                            mt='7'
                            w='80%' 
                            placeholder="Nome da empresa"
                        
                        />

                    </Flex>
                </RegisterFormLayout>
            )
        case 1:
            return (
                <RegisterFormLayout 
                    question="Avalie o fornecedor por quesitos"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' 
                        h={{base:'90%', lg:'95%'}}
                        w={{base:'85%', lg:'70%'}} 
                        justifyContent='flex-start'
                        alignItems='center'
                        overflowY={{base:'scroll',lg:'scroll'}}
                        px='3'
                    >
                        
                        {/* Infos do prestador de serviço */}
                        {
                            service?.serviceDescription != ''
                            ?
                            /* Enterprise Details */
                            <Flex
                                w='100%'
                                mb='12'
                                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                borderRadius={8}
                            >

                                <Flex w='45%'>
                                    <Img 
                                        borderLeftRadius={8} 
                                        objectFit='cover'
                                        src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[0]}`}
                                    />
                                </Flex>
                                
                                <Flex direction='column' alignItems='center'
                                    justifyContent='center'
                                    
                                    w='55%'
                                >
                                    <Text fontSize={25} mb='1'
                                        textAlign='center'
                                    >
                                        {service?.enterpriseName}
                                    </Text>

                                    <Text fontSize={18}>
                                        {service?.location}
                                    </Text>
                                </Flex>

                            </Flex>
                            :
                            <>
                            </>
                        }

                        {
                            [
                                {title: 'Qualidade do serviço', name: 'ratingServiceQuality', subTitle: 'Avalie se o prestador de serviço cumpriu com o prometido, prestando atenção a todos os detalhes requeridos por você.' },
                                {title: 'Relação Custo Benefício', name: 'ratingPrice', subTitle: 'Considerando o preço e a qualidade do serviço, avalie se o valor cobrado condiz com a qualidade.' },
                                {title: 'Tempo de resposta', name: 'ratingAnswerTime', subTitle: 'Avalie se o fornecedor realizou um atendimento adequado, respondendo às suas dúvidas com atenção.' },
                                {title: 'Flexibilidade', name: 'ratingFlexibility', subTitle: 'Avalie o fornecedor de acordo com a sua habilidade de se adaptar a possíveis imprevistos.' },
                                {title: 'Profissionalismo', name: 'ratingProfessionalism', subTitle: 'Avalie se o fornecedor foi um bom profissional, entregando o que prometeu, lidando bem com os imprevistos e tratando você com respeito. ' }
                            ].map((el, index) => {
                                return (
                                    <Flex direction='column' width='100%'
                                        mb='2'
                                    >
                                        <Flex>
                                            <Text 
                                                fontWeight={500}
                                                fontSize={20}
                                                mr='1'
                                            >
                                                {el.title}
                                            </Text>

                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton 
                                                        aria-label="tip" 
                                                        bg='brand.white'
                                                        icon={<Icon as={RiInformationLine} fontSize={23}/>} 
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent bg='brand.white'>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Dica</PopoverHeader>
                                                    <PopoverBody>
                                                        {el.subTitle}
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        </Flex>
                                                            
                                        <FormControl 
                                            isInvalid={formErrorsRating[el.name] != '' ? true : false}
                                        >
                                            <Flex justifyContent='space-between'
                                                alignItems='center'
                                                mb='2'
                                            >
                                                <Text as='span'>
                                                    Nota
                                                </Text>

                                                <Menu>
                                                    <MenuButton as={Button} >
                                                        {ratingData[el.name] != 0 ? ratingData[el.name] : 'Nota'}
                                                    </MenuButton>
                                                    <MenuList
                                                        w={{base:'75vw', lg:'20vw'}}
                                                        //h={{base:'30vh', lg:'25vh'}}
                                                        //alignItems='space-between'

                                                    >
                                                        <MenuOptionGroup type='radio'
                                                            onChange={(event: any) => {
                                                                setRatingData({...ratingData, [el.name]: event});
                                                                setFormErrorsRating({...formErrorsRating, [el.name]: ''});
                                                                console.log( ratingData );
                                                            }}

                                                        >
                                                            <MenuItemOption value='5'
                                                                h={{base:'7vh', lg:'5vh'}}

                                                            >
                                                                5 - Excelente
                                                            </MenuItemOption>
                                                            
                                                            <MenuItemOption value='4'
                                                                h={{base:'7vh', lg:'5vh'}}
                                                            >
                                                                4 - Ótimo
                                                            </MenuItemOption>
                                                            
                                                            <MenuItemOption value='3'
                                                                h={{base:'7vh', lg:'5vh'}}

                                                            >
                                                                3 - Bom
                                                            </MenuItemOption>

                                                            <MenuItemOption value='2'
                                                                h={{base:'7vh', lg:'5vh'}}
                                                            >
                                                                2 - Regular
                                                            </MenuItemOption>

                                                            <MenuItemOption value='1'
                                                                h={{base:'7vh', lg:'5vh'}}
                                                            >
                                                                1 - Ruim
                                                            </MenuItemOption>
                                                        </MenuOptionGroup>
                                                    </MenuList>
                                                </Menu>
                                            </Flex>
                                            <FormErrorMessage>
                                                {formErrorsRating[el.name]}
                                            </FormErrorMessage>
                                        </FormControl>

                                        <Flex border='0.5px solid rgba(0,0,0,0.4)'></Flex>
                                    </Flex>
                                )
                            })
                        }
                        

                    </Flex>
                </RegisterFormLayout>
            )
        case 2:
            return (
                <RegisterFormLayout 
                    question="Escreva a sua opinião!"
                    //subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={nextStep}
                    //handleNextStep={authenticatedUser ? handleSubmitRating : nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    lastStep={false}
                    //lastStep={authenticatedUser ? true : false}
                    style="yellow"
                >
                    <Flex direction='column' 
                        alignItems='flex-start'
                        h={{base:'90%', lg:'75%'}}
                        w={{base:'85%', lg:'60%'}} 
                        overflowY={{base:'scroll',lg:'scroll'}}
                        px='3'

                    >

                        <Stack direction='column' spacing={3} w='100%'>
                            <Text fontSize={18} textAlign='center'>
                                Você recomendaria o serviço a um amigo ?
                            </Text>

                            <FormControl 
                                isInvalid={formErrorsRating.recommendToAFriend != '' ? true : false}
                            >
                                <Flex justifyContent='space-evenly'>
                                    <Button w='45%' 
                                        bg={ratingData.recommendToAFriend == 'Sim' ? 'brand.red' : 'brand.white'}
                                        textColor={ratingData.recommendToAFriend == 'Sim' ? 'brand.white' : 'brand.dark_blue'}
                                        name='recommendToAFriend' 
                                        value='Sim'
                                        onClick={(event: any) => {
                                            handleChange( event );
                                            setFormErrorsRating({...formErrorsRating, recommendToAFriend: ''});
                                        }}
                                    >
                                        Sim
                                    </Button>
                                    <Button w='45%' 
                                        bg={ratingData.recommendToAFriend == 'Não' ? 'brand.red' : 'brand.white'}
                                        textColor={ratingData.recommendToAFriend == 'Não' ? 'brand.white' : 'brand.dark_blue'}
                                        name='recommendToAFriend' 
                                        value='Não'
                                        onClick={(event: any) => {
                                            handleChange( event );
                                            setFormErrorsRating({...formErrorsRating, recommendToAFriend: ''});
                                        }}
                                    >
                                        Não
                                    </Button>
                                </Flex>

                                <FormErrorMessage>
                                    {formErrorsRating.recommendToAFriend}
                                </FormErrorMessage>
                            </FormControl>
                            
                            <FormControl 
                                isInvalid={formErrorsRating.recommendToAFriendObservation != '' ? true : false}
                            >
                                <Input placeholder="Observações: " 
                                    name='recommendToAFriendObservation' 
                                    value={ratingData.recommendToAFriendObservation}
                                    onChange={(event: any) => {
                                        handleChange( event );
                                        setFormErrorsRating({...formErrorsRating, recommendToAFriendObservation: ''});
                                    }}
                                />
                                <FormErrorMessage>
                                    {formErrorsRating.recommendToAFriendObservation}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Flex direction='column' mt='10' mb='3' w='100%'>
                            <Text fontSize={18}>Título da sua opinião</Text>
                            <FormControl 
                                isInvalid={formErrorsRating.opinionTitle != '' ? true : false}
                            >
                                <Input placeholder="Escreva aqui o título da sua opinião"
                                    name='opinionTitle'
                                    value={ratingData.opinionTitle}
                                    onChange={(event: any) => {
                                        handleChange( event );
                                        setFormErrorsRating({...formErrorsRating, opinionTitle: ''});
                                    }}
                                />
                                <FormErrorMessage>
                                    {formErrorsRating.opinionTitle}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex direction='column' w='100%' mb='3'>
                            <Text fontSize={18}>Opinião</Text>
                            <FormControl 
                                isInvalid={formErrorsRating.opinionContent != '' ? true : false}
                            >
                                <Textarea placeholder="Descreva em detalhes as suas impressões sobre o serviço prestado pelo fornecedor" 
                                    name='opinionContent'
                                    value={ratingData.opinionContent}
                                    onChange={(event: any) => {
                                        handleChange( event );
                                        setFormErrorsRating({...formErrorsRating, opinionContent: ''});
                                    }}
                                />
                                <FormErrorMessage>
                                    {formErrorsRating.opinionContent}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex direction='column' w='100%' mb='3'>
                            <Text fontSize={18}>Quando foi a sua festa ?</Text>

                            <FormControl 
                                isInvalid={formErrorsRating.partyDate != '' ? true : false}
                            >
                                <Input type='text' 
                                    value={ratingData.partyDate}
                                    onChange={(event:any) => {
                                        setRatingData({...ratingData, partyDate: event.currentTarget.value});
                                        setFormErrorsRating({...formErrorsRating, partyDate: ''});
                                    }}
                                />
                                <FormErrorMessage>
                                    {formErrorsRating.partyDate}
                                </FormErrorMessage> 
                            </FormControl>
                        </Flex>

                        <Flex direction='column' w='100%'>
                            <Text fontSize={18}>Qual foi o tipo da sua festa ?</Text>

                            <FormControl 
                                isInvalid={formErrorsRating.partyType != '' ? true : false}
                            >
                                <Menu>
                                    <MenuButton as={Button} colorScheme='blue'>
                                        {typeOfParties[ratingData?.partyType]?.textToShow || 'Tipo da festa'}
                                    </MenuButton>
                                    <MenuList minWidth='240px'>
                                        <MenuOptionGroup
                                            onChange={(event: any) => {
                                                setRatingData({...ratingData, partyType: event});
                                                setFormErrorsRating({...formErrorsRating, partyType: ''});
                                            }}
                                        >
                                            {
                                                Object.values(typeOfParties).map((el, i) => {
                                                    return (
                                                        <MenuItemOption value={el.value}>{el.textToShow}</MenuItemOption>
                                                    )
                                                })
                                            }
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                                <FormErrorMessage>
                                    {formErrorsRating.partyType}
                                </FormErrorMessage> 
                            </FormControl>
                            
                        </Flex>

                    </Flex>
                </RegisterFormLayout>
            )
        case 3:
            return (
                <RegisterFormLayout 
                    question={authenticatedUser ? "Clique em finalizar para enviar a sua opinião" : "Realize o login ou cadastre-se para registrar a sua avaliação!"}
                    //subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={authenticatedUser ? handleSubmitRating : () => {
                        setFlashMessage('É necessário fazer login ou se cadastrar', 'error');
                    }}
                    handlePreviousStep={previousStep}
                    lastStep={true}
                    showFooterMenu={true}
                    style="yellow"
                >

                    <Flex direction='column'  
                        //justifyContent='flex-end' 
                        alignItems='center'
                        //h='100%'
                        py='2'
                        h={{base:'90%', lg:'100%'}}
                        w={{base:'85%', lg:'80%'}} 
                        overflowY={{base:'scroll',lg:'scroll'}}
                        //overflowY={{base:'scroll',lg:'hidden'}}
                    >
                        {
                            authenticatedUser
                            ?
                            /* Authenticated user */
                            <Flex 
                                direction='column'
                            >
                                <Text
                                    fontSize={24}
                                    mb='2'
                                >
                                    Seja bem-vindo
                                </Text>
                                <Text
                                    fontSize={20}
                                    border='1px solid black' p='3'
                                    borderRadius={8}
                                >
                                    {userStoredData?.fullName}.
                                </Text>
                            </Flex>
                            :
                            /* Form Register and Login */
                            <Flex 
                                direction="column"
                                h={{base:'100%',lg:'90%'}}
                                width={{base:'100%', lg:500}}
                                py={{base:'1',lg:'6'}}
                                px={{base:'0', lg:"10" }}
                                justifyContent="flex-start"
                                bg="white" 
                                boxShadow={{base:'none', lg:"0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"}}
                                borderRadius={8} 
                                fontSize={20}
                                overflowY='scroll'
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

                                    <Button ml='3' onClick={onOpen} 
                                        bg='white'
                                        color='blue'
                                    > 
                                        Entre
                                    </Button>
                                    
                                    {/* LOGIN - MODAL */}
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader></ModalHeader>
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
                                                            onClose();
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
                                                    Object.values(locationMap).map((el, i) => {
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
                                            Aceito os <NavLink href='https://www.google.com.br' color='brand.blue' fontWeight={500} isExternal>Termos de uso</NavLink> e de <NavLink href='https://www.google.com.br' color='brand.blue' fontWeight={500} isExternal>privacidade</NavLink>.
                                        </Checkbox>
                                        
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.accept}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>     


                                {/* <Flex direction="row"
                                    mt="3"
                                    justifyContent='space-between'
                                >
                                    <Flex direction='column' w='50%'>
                                        <Text color="brand.white_40" fontSize={19}>
                                            Tipo de festa
                                        </Text>
                                        <Menu>
                                            <MenuButton as={Button} colorScheme='gray'>
                                                {userRegisterData.partyTypeTextToShow || 'Selecione'}
                                            </MenuButton>
                                            <MenuList minWidth='240px'>
                                                <MenuOptionGroup type='radio'
                                                >         
                                                    {
                                                        Object.values( typeOfParties ).map((el, index) => {
                                                            return (
                                                                <MenuItemOption value={el.value}
                                                                    onClick={() => {
                                                                        setUserRegisterData({...userRegisterData, partyType: el.value, partyTypeTextToShow: el.textToShow });
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

                                    <Flex direction='column' ml='2' w='50%'>
                                        <Text color="brand.white_40" fontSize={19}>
                                            Data da festa
                                        </Text>
                                        <Input
                                            name="partyDate"
                                            type="text"
                                            onChange={handleChangeRegister}
                                        />
                                    </Flex>
                                </Flex> */}

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
                        }

                    </Flex>
                </RegisterFormLayout>
            )
    }
}