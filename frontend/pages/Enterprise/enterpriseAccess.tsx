import { Box, Flex, Text, Input, Link as NavLink, Button, Icon, useBreakpointValue, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import Image from 'next/image';
import { useState } from "react";
import KidBirthday from '../../assets/imgs/kid-birthday.jpg';
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import VitrineExample from '../../assets/imgs/ad.png';
import { RiCustomerService2Fill, RiMailDownloadLine, RiNotificationBadgeFill, RiSearchEyeLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { HiSpeakerphone } from 'react-icons/hi';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { typeOfParties, typeOfServices } from "../../utils/typeOfParties";
import { Sidebar } from "../../components/Sidebar";
import { Footer } from "../../components/Footer";
import { FlashMessageComponent } from "../../components/FlashMessageComponent";
import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import Head from 'next/head';

export default function EnterpriseAccess() {
    const [enterpriseAccessData, setEnterpriseAccessData] = useState({email: '', password:''});
    const [emailResetPassword, setEmailResetPassword] = useState('');
    const { loginEnterprise } = useEnterpriseAuthContext();
    const routerNext = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalResetPassword = useDisclosure();
    const { setFlashMessage } = useFlashMessage();

    const handleDragStart = (e) => e.preventDefault();

    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });

    function handleChange( event: any ) {
        setEnterpriseAccessData({...enterpriseAccessData, [event.currentTarget.name]: event.currentTarget.value });
    }

    async function handleSendEmailResetPassword() {
        let msgText = 'Acesse o seu e-mail e clique no link enviado!';
        let msgType = "success";

        try {
            const data = await api.post("/sendEmailResetPasswordEnterprise", {email: emailResetPassword}).then((response) => {
                return response.data;
            })
            .then((res) => {
                modalResetPassword.onClose();
                setEmailResetPassword('');
            });
        }   
        catch(err) {
            //console.log( err );
            msgText = err.response.data.message;
            msgType = "error";
        }
        setFlashMessage( msgText, msgType );
    }
    
    function handleSubmit( event: any ) {
        event.preventDefault();
        //console.log('entrou no submit');
        //console.log( enterpriseAccessData );

        loginEnterprise( enterpriseAccessData );
    }

    return (
        <Box w='100vw'>
            <Head>
                <title>Acesso Empresa</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <meta name="description" content="Acesso Empresa - Aqui os fornecedores do ramo de festa podem se cadastrar e exibir os seus serviços ou produtos para novos clientes."/>
                <meta property="og:title" content="Acesso empresa"/>
                <meta property="og:description" content="Aqui os fornecedores do ramo de festa podem se cadastrar e exibir os seus serviços ou produtos para novos clientes."/>
                <meta property="og:url" content="https://www.festafy.com.br/Enterprise/enterpriseAccess"/>
                <meta property="og:type" content="website"/>
            </Head>
            {/* Header */}
            <Header name="" position='relative' />
            
            <Sidebar/>

            <FlashMessageComponent/>

            {/* Top Picture */}
            <Flex w='100%' 
                h='55vh' 
                minH={500}
                position='relative' 
                justifyContent='center'
            >
                {
                    isMobileVersion == false
                    &&
                    <Image src={KidBirthday}
                        priority={true}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                    />
                }
                
                {/* Shadow */}
                <Flex w='100%' h='100%'
                    justifyContent='center'
                    bg={{base:'brand.white',lg:'rgba(0,0,0,0.30)'}}
                    zIndex={3}
                >

                    <Flex w='90%' h='100%' 
                        justifyContent='space-between'
                        alignItems='center' 
                        flexWrap='wrap'
                    >
                        {/* TEXT */}
                        <Flex direction='column'
                            alignItems='center'
                            w={{base:'100%', lg:'40%'}}
                            textAlign={{base:'center', lg:'left'}}
                            textColor={{base:'brand.dark_blue', lg:'brand.white'}}
                            mt={{base:'10', lg:'0'}}
                        >
                            <Flex  direction='column' mb='5'>
                                <Text as='h2' 
                                    fontSize={{base:28, lg:39}} 
                                    fontWeight={600}
                                    mb='3'
                                >
                                    Anuncie o seu serviço aqui!
                                </Text>

                                <Text as='h3' 
                                    fontSize={{base: 20, lg:23}} 
                                    fontWeight={500}
                                >
                                    * Fique visível para centenas de novos clientes
                                </Text>

                                <Text as='h3' 
                                    fontSize={{base: 20, lg:23}} 
                                    fontWeight={500}
                                >
                                    * Seja encontrado por clientes interessados
                                </Text>

                            </Flex>

                            {
                                isMobileVersion
                                ?
                                <Flex direction='column'>

                                    <Button bg='brand.red'  py='6'
                                        onClick={onOpen}
                                    >
                                        <Text
                                            color='brand.white'
                                            fontSize={19}
                                            fontWeight={600}
                                        >
                                            Entrar
                                        </Text>
                                    </Button>

                                    <Modal blockScrollOnMount={true} 
                                        isOpen={isOpen} onClose={onClose}
                                        size='full'
                                    >
                                        <ModalOverlay />
                                        <ModalContent
                                            bg='brand.white'
                                            h='100%'
                                        >
                                            <ModalHeader></ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Flex
                                                    h='100%'
                                                    alignItems='center'
                                                >
                                                    {/* Form Login */}
                                                    <Flex 
                                                        direction="column"
                                                        w='100%'
                                                        height='80%'
                                                        pt="0"
                                                        pb="1"
                                                        px="10"
                                                        justifyContent="center"
                                                        bg="brand.white" 
                                                        //boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                                        borderRadius={8} 
                                                        fontSize={20}
                                                    >
                                                        <Text as="h2" textAlign="center" my="3" 
                                                            fontSize={25} 
                                                            fontWeight={500}
                                                            color='brand.dark_blue'
                                                        >
                                                            SEJA BEM-VINDO!
                                                        </Text>
                                                    
                                                        <Flex direction="column" mt="3">
                                                            <Text color="brand.white_40" fontSize={19}>
                                                                E-mail
                                                            </Text>

                                                            <Input placeholder="email@example.com"
                                                                name="email"
                                                                onChange={handleChange}
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
                                                                onChange={handleChange}
                                                            />
                                                        </Flex>

                                                        <Button 
                                                            mt="8"
                                                            bg="brand.red"
                                                            color="brand.white"
                                                            fontSize={18}
                                                            py="6"
                                                            onClick={handleSubmit}
                                                        >
                                                            LOGIN
                                                        </Button>

                                                        <Flex direction="column" justifyContent="center" mt='4'>
                                                            <Button onClick={modalResetPassword.onOpen}
                                                                bg='brand.white'
                                                            >
                                                                <Text textAlign="center" fontSize={16}
                                                                    color="brand.light_blue_40"
                                                                >
                                                                    Esqueceu sua senha ?
                                                                </Text>
                                                            </Button>
                                                        </Flex>

                                                    </Flex>
                                                </Flex>
                                            </ModalBody>
                                        </ModalContent>
                                    </Modal>



                                    <Flex direction='row'
                                        mt='5'
                                    >
                                        <Text>
                                            
                                            Não possui uma conta ?  
                                            <NavLink
                                                color='blue'
                                                href='/Enterprise/Auth/register'
                                                _hover={{textDecoration: 'none'}}
                                                fontSize={18}

                                            > Cadastre-se gratuitamente
                                            </NavLink>
                                        
                                        </Text>

                                    </Flex>

                                </Flex>
                                :
                                <NavLink 
                                    href='/Enterprise/Auth/register'
                                    _hover={{textDecoration: 'none'}}
                                >
                                    <Button bg='brand.red'  py='7'
                                        
                                    >
                                        <Text
                                            fontSize={20}
                                            fontWeight={600}
                                        >
                                            Cadastre-se gratuitamente!
                                        </Text>
                                    </Button>
                                </NavLink>
                            }
                        </Flex>
                        
                        {/* Form Login - DESKTOP */}
                        <Flex 
                            display={{base:'none', lg:'flex'}}
                            direction="column"
                            w='30%'
                            height='80%'
                            //height={300}
                            pt="0"
                            pb="1"
                            px="10" 
                            justifyContent="center"
                            bg="brand.white" 
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            fontSize={20}
                        >
                            <Text as="h2" textAlign="center" my="3" 
                                fontSize={25} 
                                fontWeight={500}
                                color='brand.dark_blue'
                            >
                                SEJA BEM-VINDO!
                            </Text>

                            <Flex direction="column" mt="3">
                                <Text color="brand.white_40" fontSize={19}>
                                    E-mail
                                </Text>

                                <Input placeholder="email@example.com"
                                    name="email"
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                            </Flex>

                            <Button 
                                mt="8"
                                bg="brand.red"
                                color="brand.white"
                                fontSize={18}
                                py="6"
                                onClick={handleSubmit}
                            >
                                LOGIN
                            </Button>

                            <Flex direction="column" justifyContent="center" mt='4'>
                                <Button 
                                    onClick={modalResetPassword.onOpen}
                                    bg='brand.white'
                                >
                                    <Text textAlign="center" fontSize={16}
                                        color="brand.light_blue_40"
                                    >
                                        Esqueceu sua senha ?
                                    </Text>
                                </Button>
                            </Flex>

                        </Flex>
                    
                        {/* MODAL - RESET PASSWORD */}
                        <Modal blockScrollOnMount={true} 
                            isOpen={modalResetPassword.isOpen} 
                            onClose={modalResetPassword.onClose}
                            size='xl'
                        >
                            <ModalOverlay />
                            <ModalContent
                                bg='brand.white'
                                h={{base: '40%',lg:'35%'}}
                            >
                                <ModalHeader>
                                    <FlashMessageComponent/>
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody
                                >
                                    <Flex
                                        h='100%'
                                        direction='column'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Text
                                            textAlign='center'
                                            fontSize={18}
                                            w={{base:'95%', lg:'70%'}}
                                        >
                                            Digite abaixo o seu e-mail cadastrado. Enviaremos um link para 
                                            prosseguir com a criação de uma nova senha.
                                        </Text>
                                        <Input 
                                            mt='4'
                                            w={{base:'90%', lg:'60%'}}
                                            placeholder="email@example.com"
                                            name="email"
                                            onChange={(event: any) => {
                                                setEmailResetPassword( event.currentTarget.value );
                                            }}
                                        />
                                        <Button
                                            onClick={handleSendEmailResetPassword}
                                            w={{base:'90%', lg:'60%'}}
                                            bg='brand.red'
                                            color='brand.white'
                                            mt='4'
                                        >
                                            Redefinir senha
                                        </Button>
                                    </Flex>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Flex>

                </Flex>

            </Flex>


            {/* Festafy advantages */}
            <Flex
                w='100%'
                h='auto'
                bg='brand.dark_blue'
                direction='column'
                alignItems='center'
                justifyContent='center'
                pt={{base:'10',lg:'10'}}
                pb={{base:'4',lg:'10'}}                
            >         
                <Flex 
                    justifyContent='center'
                    alignItems='flex-start'
                    //minH={{base: 300, lg: 400}}
                    //h={{base:'45vh', lg:'35vh'}}
                    h={{base:400, lg:330}}

                    w='100%'
                >
                    <Flex
                        w={{base:'80%', lg:'70%'}}
                        //minH={{base: 300, lg: 400}}
                        h={{base: 380, lg: 320}}
                    >
                        <AliceCarousel                                
                            autoPlay={false}
                            autoHeight={true}
                            responsive={{
                                0: {items:1.2},
                                576: {items:2.2},
                                1024: {items:3}
                            }}
                            disableButtonsControls={true}
                            disableSlideInfo={ isMobileVersion ? false : true}
                            disableDotsControls={ isMobileVersion ? false : true}
                            mouseTracking
                            items={
                                [
                                    {icon: RiUserAddLine, title: 'Novos Clientes', content: 'Fique visível para centenas de novos clientes.'},
                                    {icon: RiMailDownloadLine, title: 'Receba orçamentos', content: 'Receba orçamentos de clientes interessados no seu serviço'},
                                    {icon: RiSearchEyeLine, title: 'Visibilidade', content: 'Criação de um anúncio incrível para encantar os clientes'},
                                ].map((el, index) => {
                                    return (
                                        <Flex direction='column'
                                            key={index}
                                            justifyContent='center'
                                            alignItems='center'
                                            w={{base:'90%',lg:'90%'}}
                                            h={{base:300, lg: 270}}
                                            p='5'
                                            my='1'
                                            mx={{base:'5',lg:'5'}}
                                            bg='brand.yellow'
                                            borderRadius={8} 
                                            border='1px solid rgba(0,0,0,0.2)'                               
                                        >
                                            <Icon as={el.icon} 
                                                fontSize={65}
                                                color='brand.dark_blue'
                                                mb='4'
                                            />
                                            <Text
                                                fontWeight={600}
                                                fontSize={25}
                                                color='brand.dark_blue'
                                                mb='3'
                                                textAlign='center'
                                            >
                                                {el.title}
                                            </Text>
                                            <Text
                                                fontSize={19}
                                                textAlign='center'
                                                color='brand.dark_blue'
                                            >
                                                {el.content}
                                            </Text>
                                        </Flex>
                                    )
                                })
                            }
                        />
                    
                    </Flex>

                </Flex>                
            </Flex>


            {/* O que o Festafy te oferece ? */}
            <Flex w='100%' alignItems='center' 
                direction='column'
                pb='20'
            >
                <Text as='h2' 
                    mt='8'
                    mb='12'
                    fontSize={32}
                    fontWeight={600}
                >
                    No Festafy você tem
                </Text>

                <Flex direction='row'
                    w={{base:'100%',lg:'80%'}}
                    justifyContent='space-between'
                    flexWrap='wrap'
                >
                   
                    {/* Software example image */}
                    <Flex w={{base:'100%',lg:'45%'}}
                        alignItems='center'
                        justifyContent='center'
                        mb={{base:'5',lg:'0'}}
                    >
                        <Flex position='relative'
                            h={{base:300,lg:300}}
                            w={{base:'85vw',lg:'35vw'}}
                            borderRadius={4}
                            overflow='hidden'
                            border='1px solid rgba(0,0,0,0.2)'
                            //alignItems='center'
                        >
                            <Image
                                src={VitrineExample}
                                layout='fill'
                                objectFit='cover'
                                objectPosition='top'
                            /> 
                        </Flex>
                    </Flex>
                

                    <Flex direction='column' 
                        flexWrap='wrap'
                        w={{base:'100%',lg:'55%'}}
                        alignItems='center'
                    >
                        {
                            [
                            {image: RiNotificationBadgeFill, content: 'Anúncios para que clientes interessados possam conhecer o seu trabalho e pedir orçamentos' },
                            {image: HiSpeakerphone, content: 'Uma plataforma de marketing que traz os clientes interessados até o seu anúncio'},
                            {image: RiCustomerService2Fill, content: 'Suporte para qualquer dúvida que tiver enquanto utiliza a plataforma'},
                            ].map((el, index) => {
                                return (
                                    <Flex my='4' 
                                        alignItems='center' 
                                        justifyContent='space-evenly'
                                        w='100%'
                                        key={index}
                                    >
                                        <Text w='65%'
                                            fontSize={21}
                                        >
                                            {el.content}
                                        </Text>

                                        <Icon as={el.image} 
                                            fontSize={45}
                                        />
                                    </Flex>
                                )
                            })
                        }                       
                        <NavLink href='/Enterprise/Auth/register'
                            mt='5'
                            _hover={{textDecoration: 'none'}}
                        >
                            <Button 
                                variant='outline'
                                colorScheme='red'
                                py='7'
                                borderRadius={20}
                            >
                                <Text
                                    fontSize={20}
                                    fontWeight={600}
                                >
                                    Cadastre-se gratuitamente!
                                </Text>
                            </Button>
                        </NavLink>
                    </Flex>
                </Flex>
            </Flex>


            <Footer/>
        </Box>
    );
}


