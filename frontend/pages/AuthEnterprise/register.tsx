import { Box, Button, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { ItemList } from "../../components/Enterprise/ItemList";
import { RegisterFormLayout } from "../../components/Enterprise/RegisterFormLayout";
import { useRouter } from "next/router";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import Image from 'next/image';

interface enterpriseDataInterf {
    step: number;
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
    country: string;
    state: string;
    city: string;
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

    answer1: string;
    answer2: string;
}

const enterpriseDataNullState = {
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

    photos: [],

    answer1: '',
    answer2: '',
}


export default function RegisterEnterprise() {
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>( enterpriseDataNullState );
    const routerNext = useRouter();
    const { register } = useEnterpriseAuthContext();
    const [preview, setPreview] = useState([]);

    function handleFileChange( event: any ) {
        console.log( 'event files images' );
        console.log( event.currentTarget.files );
        setPreview(Array.from(event.currentTarget.files));
        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: [...event.currentTarget.files]});
    }

    function handleChange( event: any ) {
        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( enterpriseData );
    }

    async function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit!');

        const formData = new FormData;
    
        await Object.keys(enterpriseData).forEach((key:any) => {
            if(key == 'photos') {
                console.log('entrou no photos object key');
                for(let i = 0; i < enterpriseData[key].length; i++) {
                    formData.append('photos', enterpriseData[key][i]);
                }
            }
            else {
                formData.append(key, enterpriseData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        console.log( formData.values );
        register( formData );
        routerNext.push("/enterpriseAccess");
    }

    function nextStep() {
        setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
    }
    function previousStep() {
        if( enterpriseData.step > 0) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step - 1});
        }
    }

    switch( enterpriseData.step ) {

        case 0:
            return (
                <Flex h='100vh' w='100vw' justifyContent='center'
                    alignItems='center' direction='column'
                >
                    <Text 
                        mb='20'
                        fontSize={32} fontWeight={600}
                    >
                        Seja bem-vindo ao Cadastro Gratuito do Festafy!
                    </Text>

                    <Button bg='red' color='white'
                        onClick={nextStep}
                    >
                        Começar cadastro!
                    </Button>
                </Flex>
            );
        
        {/* Dados de Contato */}
        case 1:
            return (
        
                <RegisterFormLayout 
                    question="Dados de contato"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <Text as='span'>
                                Nome completo 
                            </Text>
                            <Input type='text' name='fullName' onChange={handleChange}
                                value={enterpriseData.fullName}
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                E-mail
                            </Text>
                            <Input type='email' name='email' onChange={handleChange} 
                                value={enterpriseData.email}
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Telefone/Celular
                            </Text>
                            <Input type='number' name='phone' 
                                value={enterpriseData.phone} onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                WhatsApp
                            </Text>
                            <Input type='number' name='whatsapp' 
                                value={enterpriseData.whatsapp} onChange={handleChange} 
                            />
                        </Flex>                        
                    </Stack>
                </RegisterFormLayout>
            );

        
        {/* Dados de Acesso */}
        case 2:
            return (
                <RegisterFormLayout 
                    question="Dados de acesso"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <Text as='span'>
                                Usuário - Email cadastrado na página anterior 
                            </Text>
                            <Input type='text' value={enterpriseData.email}
                                disabled={true} 
                            />
                        </Flex>
                        
                        <Flex direction='column'>
                            <Text as='span'>
                                Senha  
                            </Text>
                            <Input type='password' name='password' 
                                value={enterpriseData.password} 
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Confirme a sua senha
                            </Text>
                            <Input type='password' name='passwordConfirmation' 
                                value={enterpriseData.passwordConfirmation}    
                                onChange={handleChange} 
                            />
                        </Flex>                        
                    </Stack>
                </RegisterFormLayout>
            );

        {/* Dados da empresa */}
        case 3:
            return (
                <RegisterFormLayout 
                    question="Sobre a sua empresa"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <Text as='span'>
                                Nome da empresa
                            </Text>
                            <Input type='text' name='enterpriseName' 
                                value={enterpriseData.enterpriseName}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                País
                            </Text>
                            <Input type='text' name='country' 
                                value={enterpriseData.country}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Estado
                            </Text>
                            <Input type='text' name='state' 
                                value={enterpriseData.state}
                                onChange={handleChange}
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Cidade
                            </Text>
                            <Input type='text' name='city' 
                                value={enterpriseData.city}
                                onChange={handleChange}
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Endereço
                            </Text>
                            <Input type='text' name='address'
                                value={enterpriseData.address} 
                                onChange={handleChange} 
                            />
                        </Flex>
                        <Flex direction='column'>
                            <Text as='span'>
                                Número
                            </Text>
                            <Input type='number' name='addressNumber' 
                                value={enterpriseData.addressNumber}
                                onChange={handleChange} 
                            />
                        </Flex>
                    </Stack>
                </RegisterFormLayout>
            );

        case 4:
            return (
                <RegisterFormLayout 
                    question="Redes sociais da sua empresa"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction='column' spacing={4} w='50%'>
                        <Flex direction='column'>
                            <Text as='span'>
                                Instagram
                            </Text>
                            <Input type='text' name='instagram' 
                                value={enterpriseData.instagram}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Facebook
                            </Text>
                            <Input type='text' name='facebook' 
                                value={enterpriseData.facebook}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <Text as='span'>
                                Site próprio
                            </Text>
                            <Input type='text' name='website' 
                                value={enterpriseData.website}
                                onChange={handleChange}
                            />
                        </Flex>

                    </Stack>
                </RegisterFormLayout>
            );

        case 5:
            return (
                <RegisterFormLayout 
                    question="Qual é o principal tipo de festa que você atende ?"
                    subTitle="Caso atenda mais de uma opção, fique tranquilo. Você
                    poderá criar mais anúncios depois de concluir o cadastro. "
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column"
                        spacing={5}
                    >
                        {
                        [
                        'Infantil', '15 anos (Debutante)', 'Outros aniversários'
                        ].map((el, i) => {
                            return(
                                
                                <ItemList
                                    styleType={2}
                                    name="partyMainFocus"
                                    value={el}
                                    selectedName={enterpriseData.partyMainFocus}
                                    handleOnClick={handleChange}
                                />
                                
                                
                            );
                        })
                        }
                    </Stack>
                </RegisterFormLayout>        
            );

        case 6:
            return (
                <RegisterFormLayout 
                    question="Descrição dos seus serviços"
                    subTitle="Descreva em detalhes todos os serviços e produtos
                    oferecidos por você referente a festa principal escolhida no 
                    item anterior (Infatil, Debutante, ...)."
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Flex direction='column' w='50%'>
                        <Flex direction='column'>
                            <Text as='span'>
                                Descrição
                            </Text>
                            <Textarea h={300} resize='none' name='serviceDescription'
                                onChange={handleChange} 
                            />
                        </Flex>

                    </Flex>
                </RegisterFormLayout>
            );

        case 7:
            return (
                <RegisterFormLayout 
                    question="Qual a categoria de atuação da sua empresa ?"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column"
                        spacing={5}
                    >
                        {
                        [
                        'Espaço para festas', 'Prestador de serviço',
                        'Vendas de produtos'
                        ].map((el, i) => {
                            return(
                                
                                <ItemList
                                    styleType={2}
                                    name="enterpriseCategory"
                                    value={el}
                                    selectedName={enterpriseData.enterpriseCategory}
                                    handleOnClick={handleChange}
                                />
                                
                                
                            );
                        })
                        }
                    </Stack>


                </RegisterFormLayout>
            );

        case 8:
            return (
                <RegisterFormLayout 
                    question="Qual o setor de atividade da empresa ?"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column" 
                        spacing={5}
                    >
                        {
                        [
                        'Fotografia', 'Decoração'
                        ].map((el, i) => {
                            return(
                                <ItemList
                                    styleType={2}
                                    name="enterpriseSpecificCategory"
                                    value={el}
                                    selectedName={enterpriseData.enterpriseSpecificCategory}
                                    handleOnClick={handleChange}
                                />
                            );
                        })
                        }
                    </Stack>


                </RegisterFormLayout>
            );

        case 9:
            return (
                <RegisterFormLayout 
                    question="Inclua aqui as fotos do seu serviço"
                    subTitle="Escolha aquelas relacionadas com o evento 
                    Festa Infantil"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Flex direction='column' alignItems='center'>
                        <Flex w='100%'
                            justifyContent='center'
                        >
                            <Input
                                w='60%'
                                type='file'
                                name='photos'
                                onChange={handleFileChange}
                                multiple={true}
                            />
                        </Flex>

                        <Flex 
                            w='100%' 
                            mt='5'
                            mx='1'
                            h={700}
                            alignItems='center'
                            justifyContent='center'
                            flexWrap='wrap'
                            overflowY='scroll'
                        >
                            {
                                preview.length > 0
                                ?
                                preview.map((image, index) => (
                                    <Flex 
                                        position='relative'
                                        h='18vw'
                                        w='23vw'
                                        mx='2'
                                        my='2'
                                    >
                                        <Image 
                                            src={URL.createObjectURL(image)} 
                                            key={`${enterpriseData.enterpriseName}
                                            +${index}`} 
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </Flex>    
                                ))
                                :
                                <></>
                            }
                        </Flex>

                    </Flex>

                </RegisterFormLayout>

            );

        case 10:
            return (
                <RegisterFormLayout 
                    question="Perguntas frequentes sobre o seu serviço"
                    subTitle="Responda essas perguntas para facilitar o 
                    entendimento do cliente sobre os seus serviços"
                    lastStep={true}
                    handleNextStep={handleSubmit}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction='column' justifyContent='center'
                        spacing={5}
                        alignItems='center'
                        w='100%'
                    >

                        <Flex direction='column' bg='white'
                            w='60%'  p='5'
                            justifyContent='center'
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            
                        >
                            <Text 
                                fontSize={22}
                                mb='3'
                            >
                                1-) A partir de qual preço posso contratar o seu serviço ?
                            </Text>
                            <Input type='text' name='answer1' 
                                value={enterpriseData.answer1}
                                onChange={handleChange} 
                            />
                        </Flex>


                        <Flex direction='column' bg='white'
                            w='60%'  p='5'
                            justifyContent='center'
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                        >
                            <Text 
                                fontSize={22}
                                mb='3'
                            >
                                2-) A partir de qual preço posso contratar o seu serviço ?
                            </Text>
                            <Input type='text' name='answer2'
                                value={enterpriseData.answer2} 
                                onChange={handleChange} 
                            />
                        </Flex>

                    </Stack>

                </RegisterFormLayout>

            );

        default:
            return (
                <Box>
                    default
                </Box>
            );
    }

}