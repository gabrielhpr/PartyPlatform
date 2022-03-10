import { Flex, Stack, Textarea, Text, Input, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ItemList } from "../../../components/Enterprise/ItemList";
import { RegisterFormLayout } from "../../../components/Enterprise/RegisterFormLayout";
import Image from 'next/image';
import api from "../../../utils/api";
import { typeOfParties } from "../../../utils/typeOfParties";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";

interface adDataInterf {
    partyMainFocus: string;
    serviceDescription: string;

    photos: any[];

    answer1: string;
    answer2: string;
}

const adDataNullState = {
    partyMainFocus: '',
    serviceDescription: '',

    photos: [],

    answer1: '',
    answer2: '',
}

export default function CreateAdEnterprise() {
    const [newAdData, setNewAdData] = useState<adDataInterf>(adDataNullState);
    const [adsCreated, setAdsCreated] = useState([]);
    const [enterpriseData, setEnterpriseData] = useState({});
    const [step, setStep] = useState(0);
    const [preview, setPreview] = useState([]);
    const [partiesAdsAlreadyCreated, setPartiesAdsAlreadyCreated] = useState([]);
    const { createAd } = useEnterpriseAuthContext();

    // 1) Puxar os dados da empresa - Para saber qual o ramo 
    // de atuação da empresa para saber quais perguntas fazer.
    // 2) Puxar o id da empresa para saber quais anúncios ela já tem
    // e quais ela pode criar (tipoDeFesta).

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Get all ads created by the enterprise - To check which
        // ads the enterprise can create
        try {
            api.get("/enterprise/ads", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setAdsCreated( response.data.ads );
                setPartiesAdsAlreadyCreated( response.data.ads.map((el, index) => {
                    return el.partyMainFocus;
                }));
                console.log('partiesAdsAlreadyCreated');
                console.log( partiesAdsAlreadyCreated );
            });
        }
        catch( err ) {
            console.log( err );
        }
        

        // Get enterprise data
        try {
            api.get("/enterprise/myenterprise", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setEnterpriseData( response.data.enterpriseData );
            });
        }
        catch( err ) {
            console.log( err );
        }

    }, []);


    function handleFileChange( event: any ) {
        console.log( 'event files images' );
        console.log( event.currentTarget.files );
        setPreview(Array.from(event.currentTarget.files));
        setNewAdData({...newAdData, [event.currentTarget.name]: [...event.currentTarget.files]});
    }

    function handleChange( event: any ) {
        setNewAdData({...newAdData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( newAdData );
    }

    async function handleSubmit( event: any ) {
        event.preventDefault();
        console.log('entrou no submit!');

        const formData = new FormData;
    
        await Object.keys(newAdData).forEach((key:any) => {
            if(key == 'photos') {
                console.log('entrou no photos object key');
                for(let i = 0; i < newAdData[key].length; i++) {
                    formData.append('photos', newAdData[key][i]);
                }
            }
            else {
                formData.append(key, newAdData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        console.log( formData.values );

        createAd( formData );
    }

    function nextStep() { 
        setStep(step + 1);
    }

    function previousStep() {
        if( step > 0) {
            setStep(step - 1);
        }
    }   

    switch( step ) {
        case 0:
            return (
                <RegisterFormLayout 
                    question="Para qual tipo de festa você quer criar esse anúncio ?"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Stack direction="column"
                        spacing={5}
                    >
                        {
                        partiesAdsAlreadyCreated.length > 0 
                        ?
                        Object.values(typeOfParties).map((el, i) => {
                            // The enterprise can only create a new ad 
                            // which partyType wasnt used before
                            if( !partiesAdsAlreadyCreated.includes( el.value ) ) {
                                return(
                                    <ItemList
                                        styleType={2}
                                        name="partyMainFocus"
                                        value={el.value}
                                        textToShow={el.textToShow}
                                        selectedName={newAdData.partyMainFocus}
                                        handleOnClick={handleChange}
                                    />                                    
                                );
                            }
                        })
                        :
                        <>
                        </>
                        }
                    </Stack>
                </RegisterFormLayout>        
            );

        case 1:
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
                                onChange={handleChange} value={newAdData.serviceDescription}
                            />
                        </Flex>

                    </Flex>
                </RegisterFormLayout>
            );

        case 2:
            return (
                <RegisterFormLayout 
                    question="Inclua aqui as fotos do seu serviço"
                    subTitle={`Escolha aquelas relacionadas com o evento:
                    ${typeOfParties[newAdData.partyMainFocus].textToShow}`}
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
                                            key={index} 
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

        case 3:
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
                                value={newAdData.answer1}
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
                                value={newAdData.answer2} 
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