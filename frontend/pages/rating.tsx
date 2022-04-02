import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, 
    MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, 
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
    ModalOverlay, Popover, PopoverArrow, PopoverBody, 
    PopoverCloseButton, PopoverContent, PopoverHeader, 
    PopoverTrigger, Stack, Text, Textarea, 
    Tooltip, useDisclosure, Link as NavLink, Img, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RegisterFormLayout } from "../components/Enterprise/RegisterFormLayout";
import { RiInformationLine } from 'react-icons/ri';
import { useUserAuthContext } from "../context/userContext";
import { locationMap, typeOfParties } from "../utils/typeOfParties";
import { useRouter } from "next/router";
import api from "../utils/api";


interface ratingDataInterf {
    step: number;
    enterpriseId: string;
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

const ratingDataNullState = {
    step: 0,
    enterpriseId: '',
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
    opinionContent: '',
}

interface userRegisterDataProps {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
    partyType: string;
    partyTypeTextToShow: string;
    partyDate: string;
    location: string;
    city: string;
    state: string;
    country: string;
}

const userRegisterDataNullState = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    partyType: '',
    partyTypeTextToShow: '',
    partyDate: '',
    location: '',
    city: '',
    state: '',
    country: ''
}

interface serviceDataInterf {
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

export default function Rating() {
    // RATING
    const [ratingData, setRatingData] = useState<ratingDataInterf>( ratingDataNullState );
    // REGISTER
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
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
                const token = localStorage.getItem("token");
                
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

    function nextStep() {
        setRatingData({...ratingData, step: ratingData.step + 1});
    }

    function previousStep() {       
        if( ratingData.step > 0) {
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

    async function handleSubmitLogin() {
        console.log('Entrou handleSubmitLogin');
        await loginUser( userLoginData, false );
        console.log('O resultado de loginUser é');
        console.log('Saiu handleSubmitLogin');
    }

    async function handleSubmitRegister() {
        console.log('Entrou handleSubmitRegister');
        await registerUser( userRegisterData, false );
        console.log('Saiu handleSubmitRegister');
    }
    
    async function handleSubmitRating() {
        console.log('Entrou handleSubmitRating');
        console.log( ratingData );
        await userRate( ratingData );
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
                    <Flex direction='column' w='60%' alignItems='center'>
                        
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
                                    <Text fontSize={25} mb='1'>
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
                                        <Flex >

                                            <Text fontWeight={500}
                                                fontSize={20}
                                                mr='1'
                                            >
                                                {el.title}
                                            </Text>

                                            <Tooltip label={el.subTitle} aria-label='A tooltip'
                                                w='100%' h='100%'
                                            >
                                                <Text as='span'>
                                                    <Icon as={RiInformationLine} w='100%' h='100%'/>
                                                </Text>
                                            </Tooltip>
                                        </Flex>
                                                            
                                        

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
                                                <MenuList>
                                                    <MenuOptionGroup type='radio'
                                                        onChange={(event: any) => {
                                                            setRatingData({...ratingData, [el.name]: parseInt(event)});
                                                            console.log( ratingData );
                                                        }}
                                                    >
                                                        <MenuItemOption value='5'>
                                                            5 - Excelente
                                                        </MenuItemOption>
                                                        
                                                        <MenuItemOption value='4'>
                                                            4 - Ótimo
                                                        </MenuItemOption>
                                                        
                                                        <MenuItemOption value='3'>
                                                            3 - Bom
                                                        </MenuItemOption>

                                                        <MenuItemOption value='2'>
                                                            2 - Regular
                                                        </MenuItemOption>

                                                        <MenuItemOption value='1'>
                                                            1 - Ruim
                                                        </MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </Flex>

                                        <Flex border='0.5px solid rgba(0,0,0,0.4)'
                                            
                                        ></Flex>
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
                    <Flex direction='column' w='50%' alignItems='flex-start'>

                        <Stack direction='column' spacing={3} w='100%'>
                            <Text fontSize={18} textAlign='center'>
                                Você recomendaria o serviço a um amigo ?
                            </Text>
                            <Flex justifyContent='space-evenly'>
                                <Button w='45%' 
                                    bg={ratingData.recommendToAFriend == 'Sim' ? 'brand.red' : 'brand.white'}
                                    textColor={ratingData.recommendToAFriend == 'Sim' ? 'brand.white' : 'brand.dark_blue'}
                                    name='recommendToAFriend' 
                                    value='Sim'
                                    onClick={handleChange} 
                                >
                                    Sim
                                </Button>
                                <Button w='45%' 
                                    bg={ratingData.recommendToAFriend == 'Não' ? 'brand.red' : 'brand.white'}
                                    textColor={ratingData.recommendToAFriend == 'Não' ? 'brand.white' : 'brand.dark_blue'}
                                    name='recommendToAFriend' 
                                    value='Não'
                                    onClick={handleChange} 
                                >
                                    Não
                                </Button>
                            </Flex>
                            <Input placeholder="Observações: " 
                                name='recommendToAFriendObservation' 
                                onChange={handleChange}
                            />
                        </Stack>

                        <Flex direction='column' mt='10' mb='3' w='100%'>
                            <Text fontSize={18}>Título da sua opinião</Text>
                            <Input placeholder="Escreva aqui o título da sua opinião"
                                name='opinionTitle'
                                onChange={handleChange}
                            />
                        </Flex>

                        <Flex direction='column' w='100%' mb='3'>
                            <Text fontSize={18}>Opinião</Text>
                            <Textarea placeholder="Descreva em detalhes as suas impressões sobre o serviço prestado pelo fornecedor" 
                                name='opinionContent'
                                onChange={handleChange}
                            />
                        </Flex>

                        <Flex direction='column' w='100%' mb='3'>
                            <Text fontSize={18}>Quando foi a sua festa ?</Text>

                            <Input type='date' onChange={(event:any) => setRatingData({...ratingData, partyDate: event.currentTarget.value})}/>
                        </Flex>

                        <Flex direction='column' w='100%'>
                            <Text fontSize={18}>Qual foi o tipo da sua festa ?</Text>

                            <Menu>
                                <MenuButton as={Button} colorScheme='blue'>
                                    {typeOfParties[ratingData?.partyType]?.textToShow || 'Tipo da festa'}
                                </MenuButton>
                                <MenuList minWidth='240px'>
                                    <MenuOptionGroup
                                        onChange={(event: any) => setRatingData({...ratingData, partyType: event})}
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
                            
                        </Flex>

                    </Flex>
                </RegisterFormLayout>
            )
        case 3:
            return (
                <RegisterFormLayout 
                    question={authenticatedUser ? "Clique em finalizar para enviar a sua opinião" : "Realize o login ou cadastre-se para registrar a sua avaliação!"}
                    //subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={authenticatedUser ? handleSubmitRating : () => {}}
                    handlePreviousStep={previousStep}
                    lastStep={true}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='50%' justifyContent='center' 
                        alignItems='center'
                        h='100%'
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
                                h='90%'
                                width={500} 
                                py='6'
                                px="10" 
                                justifyContent="center"
                                bg="white" 
                                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                borderRadius={8} 
                                fontSize={20}
                            >
                                {/* LOGIN */}
                                <Flex
                                    mb='2'
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
                                                    width={400} 
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

                                <Flex direction="column" mt="3">
                                    <Text color="brand.white_40" fontSize={19}>
                                        Nome completo
                                    </Text>

                                    <Input 
                                        name="fullName"
                                        onChange={handleChangeRegister}
                                    />
                                </Flex>

                                <Flex direction="column" mt="3">
                                    <Text color="brand.white_40" fontSize={19}>
                                        E-mail
                                    </Text>

                                    <Input placeholder="email@example.com"
                                        name="email"
                                        onChange={handleChangeRegister}
                                    />
                                </Flex>

                                <Flex direction="row" mt='3'>
                                    <Flex direction="column"
                                    >
                                        <Text color="brand.white_40" fontSize={19}>
                                            Senha
                                        </Text>

                                        <Input placeholder="********"
                                            name="password"
                                            type="password"
                                            onChange={handleChangeRegister}
                                        />
                                    </Flex>

                                    <Flex direction="column" ml='2'
                                    >
                                        <Text color="brand.white_40" fontSize={19}>
                                            Confirmação da Senha
                                        </Text>

                                        <Input placeholder="********"
                                            name="passwordConfirmation"
                                            type="password"
                                            onChange={handleChangeRegister}
                                        />
                                    </Flex>
                                </Flex>


                                <Flex direction="column"
                                    mt="3"
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Telefone
                                    </Text>

                                    <Input 
                                        name="phone"
                                        type="text"
                                        onChange={handleChangeRegister}
                                    />
                                </Flex>

                                <Flex direction="column"
                                    mt="3"
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Onde reside
                                    </Text>

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
                                            mt={10}
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
                                </Flex>

                                <Flex direction="row"
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
                                            type="date"
                                            onChange={handleChangeRegister}
                                        />
                                    </Flex>
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
                        }

                    </Flex>
                </RegisterFormLayout>
            )
    }
}