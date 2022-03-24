import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, 
    MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, 
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
    ModalOverlay, Popover, PopoverArrow, PopoverBody, 
    PopoverCloseButton, PopoverContent, PopoverHeader, 
    PopoverTrigger, Stack, Text, Textarea, 
    Tooltip, useDisclosure, Link as NavLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RegisterFormLayout } from "../components/Enterprise/RegisterFormLayout";
import { RiInformationLine } from 'react-icons/ri';
import { useUserAuthContext } from "../context/userContext";
import { typeOfParties } from "../utils/typeOfParties";
import { useRouter } from "next/router";


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
    partyDate: string;
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
    partyDate: '',
    city: '',
    state: '',
    country: ''
}


export default function Rating() {
    // RATING
    const [ratingData, setRatingData] = useState<ratingDataInterf>( ratingDataNullState );
    // REGISTER
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
    // LOGIN
    const [userLoginData, setUserLoginData] = useState({email: '', password:''});

    const { authenticatedUser, loginUser, registerUser, userRate } = useUserAuthContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const routerNext = useRouter();

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        setRatingData({...ratingData, enterpriseId: routerNext.query.enterpriseId, step: 1});
    }, [routerNext.query]);

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
        await loginUser( userLoginData );
        if( authenticatedUser ) {
            await handleSubmitRating();
        }
        console.log('Saiu handleSubmitLogin');
    }

    async function handleSubmitRegister() {
        console.log('Entrou handleSubmitRegister');
        await registerUser( userRegisterData );
        if( authenticatedUser ) {
            await handleSubmitRating();
        }
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
                        <Flex
                            border='2px solid black'
                            w='100%'
                            mb='4'
                        >
                            <Text>
                                Infos do fornecedor
                            </Text>
                        </Flex>

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
                    handleNextStep={authenticatedUser ? handleSubmitRating : nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    lastStep={authenticatedUser ? true : false}
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
                    question="Realize o login ou cadastre-se para registrar a sua avaliação!"
                    //subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={handleSubmit}
                    handlePreviousStep={previousStep}
                    lastStep={true}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='50%' alignItems='center'>

                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={500} 
                            height='90%'
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
                            >
                                <Text>
                                    Já possui uma conta ?
                                </Text>

                                <Button ml='3' onClick={onOpen}> Entre</Button>
                                
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
                                                    onClick={handleSubmitLogin}
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

                            <Flex direction="column"
                                mt="3"
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

                            <Flex direction="column"
                                mt="3"
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

                                <Flex>
                                    <Input placeholder="Cidade"
                                        name="city"
                                        type="text"
                                        onChange={handleChangeRegister}
                                    />
                                    <Input placeholder="Estado"
                                        name="state"
                                        type="text"
                                        onChange={handleChangeRegister}
                                    />
                                    <Input placeholder="País"
                                        name="country"
                                        type="text"
                                        onChange={handleChangeRegister}
                                    />
                                </Flex>
                            </Flex>

                            <Flex direction="row"
                                mt="3"
                            >
                                <Flex direction='column'>
                                    <Text color="brand.white_40" fontSize={19}>
                                        Tipo de festa
                                    </Text>
                                    <Input
                                        name="partyType"
                                        type="text"
                                        onChange={handleChangeRegister}
                                    />
                                </Flex>

                                <Flex direction='column' ml='2'>
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

                    </Flex>
                </RegisterFormLayout>
            )
    }
}