import { Box, Flex, Text, Input, Icon, Img, Textarea, Button } from "@chakra-ui/react";
//import Image from 'next/image'
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { RiStarSFill, RiPhoneFill, RiWhatsappFill, RiMailFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";
import { ModalServiceProfile } from "../components/ModalServiceProfile";
import { ModalImageGallery } from "../components/ModalImageGallery";
import { Header } from "../components/Header";

const serviceNullState = {
    step: 0,
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
    country: '',
    state: '',
    city: '',
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

    photos: '',

    answer1: '',
    answer2: '',
}

export default function ServiceProfilePage() {

    const routerNext = useRouter();
    const [service, setService] = useState(serviceNullState);
    const [showAllImages, setShowAllImages] = useState(false);

    function handleShowAllImages() {
        setShowAllImages(true);
    }

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        const {id, partyType} = routerNext.query;

        api.get('/serviceProfile', {
                params: {
                    id: id,
                    partyType: partyType
                }
            })
            .then((response) => {
                console.log(response.data.service[0]);
                setService(response.data.service[0]);
            })
    }, [routerNext.query]);

    return (
        <Box>
            <Header name="" position="relative" />

            {/* Content */}
            <Flex w='100%' justifyContent='center'
                bg='brand.white'
            >
                <Flex w='80%' direction='column'
                    bg='white' px={34}
                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                    borderRadius={8}
                    mt='5'
                >

                    {/* Details about the service */}
                    <Flex direction='column'>
                        <Flex alignItems='flex-end' mt='5'>
                            <Text as='h1'
                                fontSize={30}
                                fontWeight={500}
                            >
                                {service.enterpriseName}
                            </Text>
                            <Text ml='3' 
                                border='2px solid'
                                borderColor='brand.red'
                                borderRadius={5}
                                p='1'
                            >
                                Premium
                            </Text>
                        </Flex>
                        
                        <Flex mt='2'>
                            <Text>{service.city}, {service.state}</Text>
                            <Text ml='5'>Ver no mapa</Text>
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
                                subtitle="Conte para o fornecedor que você
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
                                    subtitle="Conte para o fornecedor que você
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
                                subtitle="Conte para o fornecedor que você
                                o encontrou pelo Festafy"
                                icon={RiMailFill}
                                iconColor='black'
                                content={service.email}
                            />

                        </Flex>
                    </Flex>                        


                    {/* Photos */}
                    <Flex w='100%' pb='10' pt='5' h={500}>
                        <Flex w='50%'>
                            <Img 
                                borderLeftRadius={8} 
                                objectFit='cover'
                                src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[0]}`}
                            />
                        </Flex>

                        <Flex w='50%' h='100%' flexWrap='wrap' >
                            <Flex w='50%' h='50%' pl='2' pb='1'>
                                <Img 
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[1]}`}
                                    objectFit='cover'
                                />
                            </Flex>
                            <Flex w='50%' h='50%' pl='2' pb='1'>
                                <Img 
                                    borderTopRightRadius={8}
                                    objectFit='cover'
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[2]}`}
                                />
                            </Flex>
                            <Flex w='50%' h='50%' pl='2' pt='1'>
                                <Img 
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[3]}`}
                                    objectFit='cover'
                                />
                            </Flex>
                            <Flex w='50%' h='50%' pl='2' pt='1' position='relative'>
                                
                                
                                <Button 
                                    bg='brand.yellow'
                                    color='black'
                                    w='70%'
                                    position='absolute'
                                    top='50%'
                                    left='50%'
                                    transform='translate(-50%, 80%)'
                                    onClick={handleShowAllImages}
                                >
                                    Ver todas fotos
                                </Button>

                                <ModalImageGallery
                                    buttonText='Ver todas as fotos'
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


                                <Img 
                                    src={`http://localhost:5000/images/enterprise/${service.photos.split(',')[4]}`}
                                    borderBottomRightRadius={8}
                                    objectFit='cover'
                                />
                            </Flex>
                        </Flex>
                            
                    </Flex>

                    <Flex direction='row'>

                        <Flex w='65%' direction='column' pr='20'>
                            {/* Description about the service */}
                            <Flex direction='column'>
                                <Text
                                    as='h2'
                                    fontSize={20}
                                    fontWeight={700}
                                >
                                    Descrição
                                </Text>

                                <Text as='p'>
                                    {service.serviceDescription}
                                </Text>
                            </Flex>                            

                            {/* Usefull details about the service */}
                            <Flex direction='column' my='3'>
                                <Text as='h2' 
                                    fontSize={18}
                                    fontWeight={700}
                                >
                                    Informações rápidas
                                </Text>

                                <Text as='h3'>
                                    Subtitle
                                </Text>

                                <Text as='p'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                </Text>

                            </Flex>
                        </Flex>

                        {/* Card */}
                        <Flex w='35%' 
                            justifyContent='flex-end'
                        >
                            <Flex 
                                h={420}
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
                                        <Input type='date' />
                                    </Flex>

                                    <Flex direction='column' mb='3'>
                                        <Text as='span'>Número de convidados</Text>
                                        <Input type='number' />
                                    </Flex>

                                    <Flex direction='column' mb='3'>
                                        <Text as='span'>Mensagem</Text>
                                        <Textarea resize='none' maxLength={300} h={100}/>
                                    </Flex>

                                    <Button
                                        bg='brand.red'
                                        color='white'
                                        height={12}
                                        fontSize={18}
                                    >
                                        Pedir orçamento!
                                    </Button>




                                </Flex>
                            </Flex>    


                        </Flex>

                    </Flex>


                    {/* Rating */}
                    <Flex>

                    </Flex>

                    {/* Opinions about the service */}
                    <Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}