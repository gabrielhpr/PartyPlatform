import { Flex, Stack, Textarea, Text, Input, Box, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ItemList } from "../../../components/Enterprise/ItemList";
import { RegisterFormLayout } from "../../../components/Enterprise/RegisterFormLayout";
import Image from 'next/image';
import api from "../../../utils/api";
import { specificQuestions, typeOfParties } from "../../../utils/typeOfParties";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import { NotAuthorizedComponent } from "../../../components/NotAuthorizedComponent";
import { enterpriseRegisterFormSchema, enterpriseRegisterQuestionsDataSchema } from "../../../utils/validations";
import * as yup from 'yup';

interface adDataInterf {
    partyMainFocus: string;
    serviceDescription: string;

    enterpriseCategory: string, 
    enterpriseSpecificCategory: string, 

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

const adDataNullState = {
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

interface enterpriseDataInterf {
    id: number;
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    // Access Data
    password: string;
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
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;
}

const enterpriseDataNullState = {
    id: 0,
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    // Access Data
    password: '',
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
    enterpriseCategory: '',
    enterpriseSpecificCategory: ''    
}

interface enterpriseDataFormErrorInterf {
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

const enterpriseDataFormErrorNullState = {
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

export default function CreateAdEnterprise() {
    const [newAdData, setNewAdData] = useState<adDataInterf>(adDataNullState);
    const [adsCreated, setAdsCreated] = useState([]);
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>(enterpriseDataNullState);
    const [formErrors, setFormErrors] = useState<enterpriseDataFormErrorInterf>( enterpriseDataFormErrorNullState );
    const [step, setStep] = useState(0);
    const [preview, setPreview] = useState([]);
    const [partiesAdsAlreadyCreated, setPartiesAdsAlreadyCreated] = useState([]);
    const { createAd, authenticatedEnterprise } = useEnterpriseAuthContext();

    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }
        const token = localStorage.getItem("tokenEnterprise");

        // Get all ads created by the enterprise - To check which
        // ads the enterprise can create
        try {
            api.get("/enterprise/ads", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                console.log('createAd - /enterprise/ads');
                console.log( response.data.ads );
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
                setNewAdData(
                    {
                        ...newAdData, 
                        enterpriseCategory: response.data.enterpriseData.enterpriseCategory,
                        enterpriseSpecificCategory: response.data.enterpriseData.enterpriseSpecificCategory 
                    }
                );
            });
        }
        catch( err ) {
            console.log( err );
        }

    }, [authenticatedEnterprise]);

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

    async function handleValidation( fields: Array<string>, schemaForm: any ) {
        console.log(fields);

        // Reset errors message
        fields.map((el, index) => {
            setFormErrors((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await schemaForm
            .validateAt( el, newAdData)
            .catch((err) => {
                setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                console.log(err);
            });
        });

        let validForm = true;

        // Check if can go to the next step
        fields.map( (el, index) => {
            
            let isValidField = yup.reach( schemaForm, el )
            .isValidSync( newAdData[el] );
            console.log(isValidField);

            validForm = validForm && isValidField;                
        });

        console.log('validForm');
        console.log(validForm);
        // If there is no error its validated
        if( validForm ) {
            setStep(step + 1);
        }
    }

    async function handleSubmit() {
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

    async function nextStep() { 
        if( step == 0 ) {
            console.log('entrou no step 0');       
            await handleValidation(
                ['partyMainFocus'],
                enterpriseRegisterFormSchema
            ); 
        }
        else if( step == 1 ) {
            console.log('entrou no step 1');       
            await handleValidation(
                ['serviceDescription'],
                enterpriseRegisterFormSchema
            ); 
        }
        else if( step == 2 ) {
            setStep( step + 1 );
        }
        else if( step == 3 ) {
            console.log('entrou no step 3');
            console.log( newAdData );

            let fields = [
                'enterpriseCategory', 
                'enterpriseSpecificCategory', 
                'q1',
                'q2',
                'q3',
                'q4',
                'q5',
                'q6',
                'q7',
                'q8',
                'q9',
                'q10',
                'q11',
                'q12',
                'q13',
                'q14',
                'q15',
                'q16',
                'q17',
                'q18',
                'q19',
                'q20',
                'q21',
                'q22',
                'q23',
                'q24',
                'q25',
                'q26',
                'q27',
                'q28',
                'q29',
                'q30',
                'q31',
                'q32',
                'q33',
                'q34',
                'q35',
                'q36',
                'q37',
                'q38',
                'q39',
                'q40',
                'q41',
                'q42',
                'q43',
                'q44'
            ];

            //Reset errors message
            fields.map((el, index) => {
                setFormErrors((formE) => ({...formE, [el]:''}));
            })

            // Error messages
            await fields.map(async (el,index) => {
                await enterpriseRegisterQuestionsDataSchema
                .validateAt( el, newAdData)
                .catch((err) => {
                    setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                    console.log(err);
                });
            });

            console.log( formErrors );

            // Validate
            await enterpriseRegisterQuestionsDataSchema
            .isValid({
                enterpriseCategory: newAdData.enterpriseCategory,
                enterpriseSpecificCategory: newAdData.enterpriseSpecificCategory,
                q1: newAdData.q1,
                q2: newAdData.q2,
                q3: newAdData.q3,
                q4: newAdData.q4,
                q5: newAdData.q5,
                q6: newAdData.q6,
                q7: newAdData.q7,
                q8: newAdData.q8,
                q9: newAdData.q9,
                q10: newAdData.q10,
                q11: newAdData.q11,
                q12: newAdData.q12,
                q13: newAdData.q13,
                q14: newAdData.q14,
                q15: newAdData.q15,
                q16: newAdData.q16,
                q17: newAdData.q17,
                q18: newAdData.q18,
                q19: newAdData.q19,
                q20: newAdData.q20,
                q21: newAdData.q21,
                q22: newAdData.q22,
                q23: newAdData.q23,
                q24: newAdData.q24,
                q25: newAdData.q25,
                q26: newAdData.q26,
                q27: newAdData.q27,
                q28: newAdData.q28,
                q29: newAdData.q29,
                q30: newAdData.q30,
                q31: newAdData.q31,
                q32: newAdData.q32,
                q33: newAdData.q33,
                q34: newAdData.q34,
                q35: newAdData.q35,
                q36: newAdData.q36,
                q37: newAdData.q37,
                q38: newAdData.q38,
                q39: newAdData.q39,
                q40: newAdData.q40,
                q41: newAdData.q41,
                q42: newAdData.q42,
                q43: newAdData.q43,
                q44: newAdData.q44
            })
            .then((val) =>{
                if( val == true ) {
                    // Validou bemmmm
                    console.log('Validou bemmm');
                    
                    // Register enterprise
                    handleSubmit();
                    //setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
                }
            });
        }
        
    }

    function previousStep() {
        if( step > 0) {
            setStep(step - 1);
        }
    }   

    if( authenticatedEnterprise ) {
        switch( step ) {
            case 0:
                return (
                    <RegisterFormLayout 
                        question="Para qual tipo de festa você quer criar esse anúncio ?"
                        handleNextStep={nextStep}
                        handlePreviousStep={previousStep}
                    >
                        <FormControl 
                            w={{base:'80%', lg:'50%'}}
                            isInvalid={formErrors.partyMainFocus != '' ? true : false}
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

                            <FormErrorMessage>
                                {formErrors.partyMainFocus}
                            </FormErrorMessage>
                        </FormControl>
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
                        <Flex direction='column' 
                            w={{base:'80%', lg:'50%'}}
                        >
                            <Flex direction='column'>
                                <FormControl isInvalid={formErrors.serviceDescription != '' ? true : false}>

                                    <Text as='span'>
                                        Descrição
                                    </Text>

                                    <Textarea h={300} resize='none' name='serviceDescription'
                                        onChange={handleChange} value={newAdData.serviceDescription}
                                    />

                                    <FormErrorMessage>
                                        {formErrors.serviceDescription}
                                    </FormErrorMessage>

                                </FormControl>
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
                                    w={{base:'80%', lg:'60%'}}
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
                                h={{ base:'50vh', lg:'80vh' }}
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
                        handleNextStep={nextStep}
                        handlePreviousStep={previousStep}
                    >
                         <Stack direction='column' 
                            justifyContent='flex-start'
                            spacing={5}
                            alignItems='center'
                            overflowY='scroll'
                            w={{base:'100vw', lg:'100%'}}
                            h={{base:'55vh', lg:'75vh'}}
                            //overflowWrap='wrap'
                        >
                            {
                            enterpriseData?.enterpriseCategory == 'Espaco'
                            ?
                            specificQuestions['Espaco']
                            .map((el, index) => {
                                // POSSUI BUFFET JUNTO COM O ESPAÇO
                                if( newAdData.q3 == 'Sim' && 
                                    (
                                    ['q21','q22','q23'].includes(el?.name[0])
                                    ||
                                    ['q21','q22','q23'].includes(el?.name[1])
                                    ) ) 
                                {
                                    console.log('entrou no sim');
                                    console.log(el.name);
                                    return (
                                        <>
                                        </>
                                    );
                                }
                                // SEM BUFFET JUNTO COM O ESPAÇO
                                else if(newAdData.q3 == 'Não' && 
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
                                // NÃO SABE SE TEM OU NÃO BUFFET
                                else {
                                    return (
                                        <Flex direction='column' bg='white'
                                            w={{base:'90%', lg:'60%'}}  p='5'
                                            justifyContent='center'
                                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                            borderRadius={8} 
                                        >
                                            <Text 
                                                fontSize={22}
                                                mb='3'
                                            >
                                                {el.question}
                                            </Text>
        
                                            {/* RADIO */}
                                            {
                                                el.type == 'radio'
                                                &&
                                                <Flex direction='column'>
                                                    <FormControl isInvalid={formErrors[el.name[0]] != '' ? true : false}>
                                                        <Flex
                                                            justifyContent='space-evenly'
                                                            mb='4'
                                                        >
                                                            {
                                                                el.options.map((element, index) => {
                                                                    return (
                                                                        <ItemList
                                                                            styleType={2}
                                                                            width='40%'
                                                                            name={el.name[0]}
                                                                            textAlign='center'
                                                                            value={element}
                                                                            textToShow={element}
                                                                            selectedName={newAdData?.[el.name[0]]}
                                                                            handleOnClick={handleChange}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                        </Flex>
                                                        <FormErrorMessage>
                                                            {formErrors[el.name[0]]}
                                                        </FormErrorMessage>
                                                    </FormControl>
        
                                                    <FormControl isInvalid={formErrors[el.name[1]] != '' ? true : false}>
                                                        <Textarea name={el.name[1]} 
                                                            placeholder={el.placeholder}
                                                            value={newAdData?.[el.name[1]]}
                                                            onChange={handleChange} 
                                                        />
                                                        <FormErrorMessage>
                                                            {formErrors[el.name[1]]}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                </Flex>
                                            }
        
                                            {/* TEXTAREA */}
                                            {
                                                el.type == 'textarea'  
                                                &&
                                                <Flex direction='column'>
                                                    <FormControl isInvalid={formErrors[el.name[0]] != '' ? true : false}>
                                                        <Textarea 
                                                            name={el.name[0]} 
                                                            placeholder={el.placeholder}
                                                            value={newAdData?.[el.name[0]]}
                                                            onChange={handleChange} 
                                                        />
                                                        <FormErrorMessage>
                                                            {formErrors[el.name[0]]}
                                                        </FormErrorMessage>
                                                    </FormControl>
                                                </Flex>
                                            }       
        
                                            {/* INPUT */}
                                            {
                                                el.type == 'input'  
                                                &&
                                                <Flex direction='row'
                                                    alignItems='center'
                                                    //justifyContent='center'
                                                >
                                                    <FormControl isInvalid={formErrors[el.name[0]] != '' ? true : false}>
                                                        {
                                                            el.span
                                                            ?
                                                            <Text as='span' mr='2'
            
                                                            >
                                                                {el.span}
                                                            </Text>
                                                            :
                                                            <>
                                                            </>
                                                        }
                                                        <Input 
                                                            name={el.name[0]} 
                                                            type={el.inputType}
                                                            width='40%'
                                                            value={newAdData?.[el.name[0]]}
                                                            onChange={handleChange} 
                                                        />
                                                        <FormErrorMessage>
                                                            {formErrors[el.name[0]]}
                                                        </FormErrorMessage>
                                                    </FormControl>

                                                </Flex>
                                            }       
        
                                        </Flex>
                                    )
                                }
                            })
                            :
                            specificQuestions['Servico'][enterpriseData.enterpriseSpecificCategory]
                            .map((el, index) => {
                                return (
                                    <Flex direction='column' bg='white'
                                        w={{base:'90%', lg:'60%'}}
                                        p='5'
                                        justifyContent='center'
                                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                        borderRadius={8} 
                                    >
                                        <Text 
                                            fontSize={22}
                                            mb='3'
                                        >
                                            {el.question}
                                        </Text>
    
                                        {/* RADIO */}
                                        {
                                            el.type == 'radio'
                                            &&
                                            <Flex 
                                                direction='column'
                                            >
                                                <FormControl isInvalid={formErrors[el.name[0]] != '' ? true : false}>
                                                    <Stack
                                                        justifyContent='space-evenly'
                                                        alignItems='center'
                                                        mb='4'
                                                        direction={el.options.length < 3 ? 'row' : 'column'}
                                                    >
                                                        {
                                                            el.options.map((element, index) => {
                                                                return (
                                                                    <ItemList
                                                                        styleType={2}
                                                                        width={el.options.length < 3 ? '40%' : '70%'}
                                                                        name={el.name[0]}
                                                                        textAlign='center'
                                                                        value={element}
                                                                        textToShow={element}
                                                                        selectedName={newAdData?.[el.name[0]]}
                                                                        handleOnClick={handleChange}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    </Stack>
                                                    <FormErrorMessage>
                                                        {formErrors[el.name[0]]}
                                                    </FormErrorMessage>
                                                </FormControl>
    
                                                <FormControl isInvalid={formErrors[el.name[1]] != '' ? true : false}>
                                                    <Textarea name={el.name[1]} 
                                                        placeholder={el.placeholder}
                                                        value={newAdData?.[el.name[1]]}
                                                        onChange={handleChange} 
                                                    />
                                                    <FormErrorMessage>
                                                        {formErrors[el.name[1]]}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            </Flex>
                                        }
    
                                        {/* TEXTAREA */}
                                        {
                                            el.type == 'textarea'  
                                            &&
                                            <Flex direction='column'>
                                                <FormControl isInvalid={formErrors[el.name[0]] != '' ? true : false}>
                                                    <Textarea 
                                                        name={el.name[0]} 
                                                        placeholder={el.placeholder}
                                                        value={newAdData?.[el.name[0]]}
                                                        onChange={handleChange} 
                                                    />
                                                    <FormErrorMessage>
                                                        {formErrors[el.name[0]]}
                                                    </FormErrorMessage>
                                                </FormControl>
                                            </Flex>
                                        }       
    
                                        {/* INPUT */}
                                        {
                                            el.type == 'input'  
                                            &&
                                            <Flex direction='row'
                                                alignItems='center'
                                            >                                     
                                                <FormControl isInvalid={formErrors[el.name[0]] != '' ? true : false}>
                                                    {
                                                        el.span
                                                        ?
                                                        <Text as='span' mr='2'
    
                                                        >
                                                            {el.span}
                                                        </Text>
                                                        :
                                                        <>
                                                        </>
                                                    }
                                                    <Input 
                                                        name={el.name[0]} 
                                                        type={el.inputType}
                                                        width='40%'
                                                        value={newAdData?.[el.name[0]]}
                                                        onChange={handleChange} 
                                                    />
                                                    <FormErrorMessage>
                                                        {formErrors[el.name[0]]}
                                                    </FormErrorMessage>
                                                </FormControl>
    
                                            </Flex>
                                        }       
    
                                    </Flex>
                                )
                            })
                            }
                            
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
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}