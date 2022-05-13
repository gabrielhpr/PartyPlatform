import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Stack, Text, Textarea, Icon, useBreakpointValue, useToast, Checkbox, Link as NavLink } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ItemList } from "../../../components/Enterprise/ItemList";
import { RegisterFormLayout } from "../../../components/Enterprise/RegisterFormLayout";
import { useRouter } from "next/router";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import Image from 'next/image';
import { enterpriseCategory, enterpriseSpecificCategory, typeOfParties,
specificQuestions, 
enterpriseSpecificCategoryDict,
locationMap} from "../../../utils/typeOfParties";
import { TextSpanInput } from "../../../components/Enterprise/TextSpanInput";
import { PriceCard } from "../../../components/Enterprise/priceCard";
import { enterpriseRegisterFormSchema, enterpriseRegisterPasswordSchema, enterpriseRegisterCategoryDataSchema, enterpriseRegisterQuestionsDataSchema } from '../../../utils/validations';
import * as yup from 'yup';
// Add style manually
import 'react-upload-gallery/dist/style.css' // or scss
import RUG, { DragArea, DropArea, Card, List } from 'react-upload-gallery'
import { FiUpload } from "react-icons/fi";


interface enterpriseDataInterf {
    step: number;
    plan: string;
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

const enterpriseDataNullState = {
    step: 0,
    plan: 'Free',
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    accept: 'false',
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

interface enterpriseDataFormErrorInterf {
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
    addressNumber: string;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
    partyMainFocus: string;
    serviceDescription: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;

    photos: {
        accept: string;
        minLimit: string;
        maxLimit: string;
        size: string;
        minDim: string;
        maxDim: string;
    };

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
    addressNumber: '',

    // Enterprise Social Media
    instagram: '',
    facebook: '',
    website: '',

    partyMainFocus: '',
    serviceDescription: '',
    enterpriseCategory: '',
    enterpriseSpecificCategory: '',

    photos: {
        accept: '',
        minLimit: '',
        maxLimit: '',
        size: '', 
        minDim: '',
        maxDim: '' 
    },

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
   
export default function RegisterEnterprise() {
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>( enterpriseDataNullState );
    const [formErrors, setFormErrors] = useState<enterpriseDataFormErrorInterf>( enterpriseDataFormErrorNullState );
    const routerNext = useRouter();
    const { registerEnterprise } = useEnterpriseAuthContext();
    const [preview, setPreview] = useState([]);
    const [menuWhere, setMenuWhere] = useState('none');

    const onImageChange = (imageList: any, addUpdateIndex: any) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setEnterpriseData({...enterpriseData, photos: imageList});
    };

    //   Close dropdown menu on click outside
    useEffect(() => {
        document.addEventListener('mouseup', function (e) {
            var menu1 = document.getElementById('menuLocation');

            if (!menu1?.contains(e.currentTarget)) {
                setMenuWhere('none');
            }
        }.bind(this));
    },[]);

    // Toast Feedback for Image Upload
    

    function handleFileChange( event: any ) {
        console.log( 'event files images' );
        console.log( event.currentTarget.files );
        setPreview(Array.from(event.currentTarget.files));
        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: [...event.currentTarget.files]});
        
    }

    function handleChange( event: any ) {
        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: event.currentTarget.value});
        setFormErrors({...formErrors, [event.currentTarget.name]: ''});
        console.log( enterpriseData );
    }

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

    async function handleSubmit() {
        console.log('entrou no submit!');

        const formData = new FormData;
    
        await Object.keys(enterpriseData).forEach((key:any) => {
            if(key == 'photos') {
                console.log('entrou no photos object key');
                for(let i = 0; i < enterpriseData[key].length; i++) {
                    formData.append('photos', enterpriseData[key][i].file);
                }
            }
            else {
                formData.append(key, enterpriseData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        console.log( formData.values );
        registerEnterprise( formData );
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
            .validateAt( el, enterpriseData)
            .catch((err) => {
                setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                console.log(err);
            });
        });

        let validForm = true;

        // Check if can go to the next step
        fields.map( (el, index) => {
            
            let isValidField = yup.reach( schemaForm, el )
            .isValidSync( enterpriseData[el] );
            console.log(isValidField);

            validForm = validForm && isValidField;                
        });

        console.log('validForm');
        console.log(validForm);
        // If there is no error its validated
        if( validForm ) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
        }
    }

    async function nextStep() {
        
        if( enterpriseData.step == 1 ) {     
            console.log('entrou no step 1');       
            await handleValidation(
                ['fullName', 'email', 'phone', 'whatsapp', 'accept'],
                enterpriseRegisterFormSchema
            );
        }
        else if( enterpriseData.step == 2 ) {
            console.log('entrou no step 2');
        
            let fields = ['password', 'passwordConfirmation'];

            //Reset errors message
            fields.map((el, index) => {
                setFormErrors((formE) => ({...formE, [el]:''}));
            })

            // Error messages
            await fields.map(async (el,index) => {
                await enterpriseRegisterPasswordSchema
                .validateAt( el, enterpriseData)
                .catch((err) => {
                    setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                    console.log(err);
                });
            });

            // Validate
            await enterpriseRegisterPasswordSchema
            .isValid({password:enterpriseData.password, passwordConfirmation:enterpriseData.passwordConfirmation})
            .then((val) =>{
                if( val ) {
                    setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
                }
            });
        }
        else if( enterpriseData.step == 3 ) {
            console.log('entrou no step 3');       
            await handleValidation(
                ['enterpriseName', 'location', 'address', 'addressNumber'],
                enterpriseRegisterFormSchema
            ); 
        }
        else if( enterpriseData.step == 4 ) {
            console.log('entrou no step 4');       
            await handleValidation(
                ['instagram', 'facebook', 'website'],
                enterpriseRegisterFormSchema
            ); 
        }
        else if( enterpriseData.step == 5 ) {
            console.log('entrou no step 5');       
            await handleValidation(
                ['partyMainFocus'],
                enterpriseRegisterFormSchema
            ); 
        }
        else if( enterpriseData.step == 6 ) {
            console.log('entrou no step 6');       
            await handleValidation(
                ['serviceDescription'],
                enterpriseRegisterFormSchema
            ); 
        }
        else if( enterpriseData.step == 7 ) {
            console.log('entrou no step 7');       
            await handleValidation(
                ['enterpriseCategory'],
                enterpriseRegisterCategoryDataSchema
            ); 
        }
        else if( enterpriseData.step == 8 ) {
            console.log('entrou no step 8');
        
            let fields = ['enterpriseCategory', 'enterpriseSpecificCategory'];

            //Reset errors message
            fields.map((el, index) => {
                setFormErrors((formE) => ({...formE, [el]:''}));
            })

            // Error messages
            await fields.map(async (el,index) => {
                await enterpriseRegisterCategoryDataSchema
                .validateAt( el, enterpriseData)
                .catch((err) => {
                    setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                    console.log(err);
                });
            });

            // Validate
            await enterpriseRegisterCategoryDataSchema
            .isValid({enterpriseCategory: enterpriseData.enterpriseCategory, enterpriseSpecificCategory: enterpriseData.enterpriseSpecificCategory})
            .then((val) =>{
                if( val ) {
                    setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
                }
            });
        }
        else if( enterpriseData.step == 9 ) {
            if( enterpriseData.photos.length < 5 ) {
                console.log('min images error');
                setFormErrors((formE) => ({...formE, photos: {...formE.photos, minLimit: 'Você deve adicionar no mínimo 5 imagens.'}}));
            }
            else {
                setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
            }
        }
        else if( enterpriseData.step == 10 ) {
            console.log('entrou no step 10');
            console.log( enterpriseData );

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
                .validateAt( el, enterpriseData)
                .catch((err) => {
                    setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                    console.log(err);
                });
            });

            console.log( formErrors );

            // Validate
            await enterpriseRegisterQuestionsDataSchema
            .isValid({
                enterpriseCategory: enterpriseData.enterpriseCategory,
                enterpriseSpecificCategory: enterpriseData.enterpriseSpecificCategory,
                q1: enterpriseData.q1,
                q2: enterpriseData.q2,
                q3: enterpriseData.q3,
                q4: enterpriseData.q4,
                q5: enterpriseData.q5,
                q6: enterpriseData.q6,
                q7: enterpriseData.q7,
                q8: enterpriseData.q8,
                q9: enterpriseData.q9,
                q10: enterpriseData.q10,
                q11: enterpriseData.q11,
                q12: enterpriseData.q12,
                q13: enterpriseData.q13,
                q14: enterpriseData.q14,
                q15: enterpriseData.q15,
                q16: enterpriseData.q16,
                q17: enterpriseData.q17,
                q18: enterpriseData.q18,
                q19: enterpriseData.q19,
                q20: enterpriseData.q20,
                q21: enterpriseData.q21,
                q22: enterpriseData.q22,
                q23: enterpriseData.q23,
                q24: enterpriseData.q24,
                q25: enterpriseData.q25,
                q26: enterpriseData.q26,
                q27: enterpriseData.q27,
                q28: enterpriseData.q28,
                q29: enterpriseData.q29,
                q30: enterpriseData.q30,
                q31: enterpriseData.q31,
                q32: enterpriseData.q32,
                q33: enterpriseData.q33,
                q34: enterpriseData.q34,
                q35: enterpriseData.q35,
                q36: enterpriseData.q36,
                q37: enterpriseData.q37,
                q38: enterpriseData.q38,
                q39: enterpriseData.q39,
                q40: enterpriseData.q40,
                q41: enterpriseData.q41,
                q42: enterpriseData.q42,
                q43: enterpriseData.q43,
                q44: enterpriseData.q44
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
        else if(enterpriseData.step == 0) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
        }
        else {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step + 1});
        }
    }

    function previousStep() {
        // Reseta as respostas das perguntas específicas sobre cada segmento
        if( enterpriseData.step == 10 ) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step - 1, q1: '',q2: '',q3: '',q4: '',q5: '',q6: '',q7: '',q8: '',q9: '',q10: '',q11: '',q12: '',q13: '',q14: '',q15: '',q16: '',q17: '',q18: '',q19: '',q20: '',q21: '',q22: '',q23: '',q24: '',q25: '',q26: '',q27: '',q28: '',q29: '',q30: '',q31: '',q32: '',q33: '',q34: '',q35: '',q36: '',q37: '',q38: '',q39: '',q40: '',q41: '',q42: '',q43: '',q44: '',q45: '',q46: '',q47: '',q48: '',q49: '',q50: ''});
        }
        else if( enterpriseData.step > 0) {
            setEnterpriseData({...enterpriseData, step: enterpriseData.step - 1});
        }
    }

    switch( enterpriseData.step ) {
        case 0:
            return (
                <RegisterFormLayout 
                    question="Seja bem-vindo ao Cadastro Gratuito do Festafy!"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex 
                        h={{base:'100%',lg:'50%'}}
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                        //mx='auto'
                        //my='auto'
                    >
                        <Text
                            fontWeight={500}
                            fontSize={{base:25, lg:30}}
                            textAlign='center'
                        >
                            Fique visível para centenas de clientes!
                        </Text>
                        <Button 
                            mt='10'
                            bg='brand.red' color='white'
                            onClick={nextStep}
                            fontSize={24}
                            p='7'
                            //w='60%'
                        >
                            Começar cadastro!
                        </Button>
                    </Flex>
                
                </RegisterFormLayout>
            );
        
        {/* Dados de Contato */}
        case 1:
            return (
                <RegisterFormLayout 
                    question="Dados de contato"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    style='dark'
                >
                    <Stack direction='column' spacing={4} 
                        w={{base:'80%', lg:'50%'}}
                        h={{base:'100%', lg:'auto'}}
                        py='2'
                        overflowY='scroll'
                        mx='auto'
                        //my='auto'
                        //alignItems='center'
                        //justifyContent='center'
                    >
                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.fullName != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Nome completo"
                                />
                                <Input type='text' name='fullName' onChange={handleChange}
                                    value={enterpriseData.fullName}
                                />
                                <FormErrorMessage>
                                    {formErrors.fullName}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.email != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="E-mail"
                                />
                                <Input type='email' name='email' onChange={handleChange} 
                                    value={enterpriseData.email}
                                />
                                <FormErrorMessage>
                                        {formErrors.email}
                                </FormErrorMessage>
                            </FormControl>   
                        </Flex>

                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.phone != '' ? true : false}>

                                <TextSpanInput
                                    textToShow="Telefone/Celular"
                                />
                                <Input type='tel' name='phone' 
                                    value={enterpriseData.phone} onChange={handleChange} 
                                    placeholder="Ex. 11912345678"
                                />
                                <FormHelperText>Digite somente os números do telefone com o DDD </FormHelperText>
                                <FormErrorMessage>
                                    {formErrors.phone}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.whatsapp != '' ? true : false}>

                                <TextSpanInput
                                    textToShow="WhatsApp"
                                />
                                <Input type='number' name='whatsapp' 
                                    value={enterpriseData.whatsapp} onChange={handleChange} 
                                />
                                <FormHelperText>Digite somente os números do whatsapp com o DDD </FormHelperText>
                                <FormErrorMessage>
                                    {formErrors.whatsapp}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>  

                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.accept != '' ? true : false}>                                
                                <Checkbox
                                    name='accept'
                                    //value={}
                                    onChange={(event: any) => {
                                        setEnterpriseData({...enterpriseData, [event.currentTarget.name]: String(event.currentTarget.checked)});
                                        setFormErrors({...formErrors, [event.currentTarget.name]: ''});
                                        console.log(event.currentTarget.checked);
                                    }}
                                    isChecked={enterpriseData.accept == 'true' ? true : false}
                                >
                                    Aceito os <NavLink href='https://www.iubenda.com/termos-e-condicoes/19023979' color='brand.blue' fontWeight={500} isExternal>Termos e Condições</NavLink> e <NavLink href='https://www.iubenda.com/privacy-policy/19023979' color='brand.blue' fontWeight={500} isExternal>Política de Privacidade</NavLink>.
                                </Checkbox>
                                
                                <FormErrorMessage>
                                    {formErrors.accept}
                                </FormErrorMessage>
                            </FormControl>
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
                    style='dark'
                >
                    <Stack direction='column' spacing={4} 
                        w={{base:'80%', lg:'50%'}}
                    >
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Usuário ( E-mail cadastrado na página anterior )"
                            />
                            <Input type='text' value={enterpriseData.email}
                                disabled={true} 
                            />
                        </Flex>
                        
                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.password != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Senha"
                                />
                                <Input type='password' name='password' 
                                    value={enterpriseData.password} 
                                    onChange={handleChange} 
                                />
                                <FormErrorMessage>
                                    {formErrors.password}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.passwordConfirmation != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Confirme a sua senha"
                                />
                                <Input type='password' name='passwordConfirmation' 
                                    value={enterpriseData.passwordConfirmation}    
                                    onChange={handleChange} 
                                />
                                <FormErrorMessage>
                                    {formErrors.passwordConfirmation}
                                </FormErrorMessage>
                            </FormControl>
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
                    style='dark'
                >
                    <Stack direction='column' spacing={4} 
                        w={{base:'80%', lg:'50%'}}
                        as='form'
                        autoComplete='off'
                    >
                        <Flex direction='column'>
                            <FormControl 
                                isInvalid={formErrors.enterpriseName != '' ? true : false}
                            >
                                <TextSpanInput
                                    textToShow="Nome da empresa"
                                />
                                <Input type='text' name='enterpriseName' 
                                    value={enterpriseData.enterpriseName}
                                    onChange={handleChange} 
                                    autoCapitalize="off"
                                />
                                <FormErrorMessage>
                                    {formErrors.enterpriseName}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>

                        <Flex direction='column'
                        >
                            <FormControl isInvalid={formErrors.location != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Localização da empresa"
                                />
                                {/* Onde - Localização */}
                                <Input 
                                    _focus={{outline:'none'}}
                                    value={enterpriseData.location}
                                    onChange={(event: any) => {
                                        setEnterpriseData({...enterpriseData, location: event.currentTarget.value});
                                        searchFunction(event, "menuWhere");
                                    }}
                                    onClick={() => {
                                        setMenuWhere('onclick')
                                    }}
                                />
                                <Flex 
                                    id='menuLocation'
                                    height={230} 
                                    width={{base:'100%', lg:350}}
                                    display={menuWhere}
                                    position='absolute'
                                    overflowY="scroll"
                                    bg='brand.white'
                                    mt={{base:2, lg:2}}
                                    borderRadius={10}
                                    zIndex={3}
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
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
                                                        setEnterpriseData({...enterpriseData, location: el.textToShow, city: el.city, state: el.state, country: el.country})
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
                                </Flex>
                                <FormErrorMessage>
                                    {formErrors.location}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>                        

                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.address != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Endereço"
                                />
                                <Input type='text' name='address'
                                    value={enterpriseData.address} 
                                    onChange={handleChange} 
                                />
                                <FormErrorMessage>
                                    {formErrors.address}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.addressNumber != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Número de endereço"
                                />
                                <Input type='number' name='addressNumber' 
                                    value={enterpriseData.addressNumber}
                                    onChange={handleChange} 
                                />
                                <FormErrorMessage>
                                    {formErrors.addressNumber}
                                </FormErrorMessage>
                            </FormControl>
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
                    style='dark'
                >
                    <Stack direction='column' spacing={4} 
                        w={{base:'80%', lg:'50%'}}
                    >
                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Instagram"
                            />
                            <Input type='text' name='instagram' 
                                value={enterpriseData.instagram}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Facebook"
                            />
                            <Input type='text' name='facebook' 
                                value={enterpriseData.facebook}
                                onChange={handleChange} 
                            />
                        </Flex>

                        <Flex direction='column'>
                            <TextSpanInput
                                textToShow="Site Próprio"
                            />
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
                    <FormControl 
                        w={{base:'80%', lg:'50%'}}
                        isInvalid={formErrors.partyMainFocus != '' ? true : false}
                    >
                        <Stack direction="column"
                            spacing={5}
                        >
                            {
                            Object.values(typeOfParties).map((el, i) => {
                                return(
                                    <ItemList
                                        styleType={2}
                                        name="partyMainFocus"
                                        textToShow={el.textToShow}
                                        value={el.value}
                                        selectedName={enterpriseData.partyMainFocus}
                                        handleOnClick={handleChange}
                                    />
                                );
                            })
                            }
                        </Stack>
                        <FormErrorMessage>
                            {formErrors.partyMainFocus}
                        </FormErrorMessage>
                    </FormControl>
                </RegisterFormLayout>        
            );

        case 6:
            return (
                <RegisterFormLayout 
                    question="Descrição dos seus serviços"
                    subTitle="Descreva em detalhes todos os serviços e produtos
                    oferecidos por você referente a festa principal escolhida no 
                    item anterior (Infantil, Debutante, ...)."
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <Flex direction='column' 
                        w={{base:'80%', lg:'50%'}}
                    >
                        <Flex direction='column'>
                            <FormControl isInvalid={formErrors.serviceDescription != '' ? true : false}>
                                <TextSpanInput
                                    textToShow="Descrição"
                                />
                                <Textarea h={300} resize='none' 
                                    name='serviceDescription'
                                    value={enterpriseData.serviceDescription}
                                    onChange={handleChange} 
                                />
                                <FormErrorMessage>
                                    {formErrors.serviceDescription}
                                </FormErrorMessage>
                            </FormControl>
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
                    <FormControl 
                        w={{base:'80%', lg:'60%'}}
                        isInvalid={formErrors.enterpriseCategory != '' ? true : false}
                    >
                        <Stack direction="column"
                            spacing={5}
                        >
                            {
                            Object.values(enterpriseCategory).map((el, i) => {
                                return(
                                    <ItemList
                                        styleType={2}
                                        name="enterpriseCategory"
                                        value={el.value}
                                        textToShow={el.textToShow}
                                        description={el.description}
                                        selectedName={enterpriseData.enterpriseCategory}
                                        handleOnClick={handleChange}
                                    />
                                );
                            })
                            }
                        </Stack>
                        <FormErrorMessage>
                            {formErrors.enterpriseCategory}
                        </FormErrorMessage>
                    </FormControl>
                </RegisterFormLayout>
            );

        case 8:
            return (
                <RegisterFormLayout 
                    question="Qual o setor de atividade da empresa ?"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                >
                    <FormControl 
                        w='100%'
                        isInvalid={formErrors.enterpriseSpecificCategory != '' ? true : false}
                    >
                        <Stack direction="column" 
                            spacing={5} 
                            alignItems='center'
                            justifyContent='center'
                            flexWrap='wrap'
                            w='100%' 
                            h={{base:'60vh', lg:'80vh'}}
                        >
                            {
                            enterpriseSpecificCategory[enterpriseData.enterpriseCategory]
                            .map((el, i) => {
                                return(
                                    <ItemList
                                        styleType={2}
                                        width='40%'
                                        name="enterpriseSpecificCategory"
                                        textAlign='center'
                                        value={el.value}
                                        textToShow={el.textToShow}
                                        selectedName={enterpriseData.enterpriseSpecificCategory}
                                        handleOnClick={handleChange}
                                    />
                                );
                            })
                            }
                        </Stack>

                        <FormErrorMessage>
                            {formErrors.enterpriseSpecificCategory}
                        </FormErrorMessage>
                    </FormControl>
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
                    <Flex
                        direction='column'
                        w='100%'
                        h='100%'
                        alignItems='center'
                        justifyContent='space-evenly'
                    >
                        {
                            Object.values( formErrors.photos ).some( value => value != '')
                            &&
                            Object.values(formErrors.photos).map((el, index) => {
                                if( el != '' ) {
                                    return (
                                        <Alert status='error'
                                            justifyContent='center'
                                        >
                                            <AlertIcon />
                                            <AlertTitle>{el}</AlertTitle>
                                        </Alert>
                                    );
                                }
                            })
                        }

                        <Text
                            h='10%'
                            fontSize={18}
                            my='3'
                        >
                            Clique e segure na foto para reordenar
                        </Text>

                        <Flex
                            w='100%'
                            h='80%'
                            //h={{ base:'40vh', lg:'80vh' }}
                            //alignItems='center'
                            justifyContent='center'
                            //flexWrap='wrap'
                            overflowY='scroll'
                            pt='2'
                            //direction='column'
                        >
                            <RUG 
                                //w='100%'
                                action="http://example.com/upload"  
                                autoUpload={false}
                                rules={{
                                    limit: 25,
                                    size: 1024,
                                    width: {
                                        min: 600
                                    },
                                    height: {
                                        min: 400
                                    }
                                }}
                                accept={['jpg', 'jpeg', 'png']}
                                onChange={(images) => {
                                    console.log( enterpriseData );
                                    setEnterpriseData({...enterpriseData, photos: images});
                                    
                                }}
                                onWarning={(type, rules) => {
                                    switch(type) {
                                        case 'accept':
                                            console.log(`Only ${rules.accept.join(', ')}`);
                                            setFormErrors((formE) => ({...formE, photos: {...formE.photos, accept: `Formato inválido. Os formatos permitidos são ${rules.accept.join(', ')}`}}));

                                        case 'limit':
                                            console.log('limit <= ', rules.limit);
                                            setFormErrors((formE) => ({...formE, photos: {...formE.photos, maxLimit: `O limite de fotos é ${rules.limit}`}}));

                                        case 'size':
                                            console.log('max size <= ', rules.size);
                                            setFormErrors((formE) => ({...formE, photos: {...formE.photos, size: `O tamanho da imagem deve ser menor do que 1Mb.`}}));
                                    
                                        case 'minWidth': case 'minHeight':
                                            console.log('Dimensions > ', `${rules.width.min}x${rules.height.min}`);
                                            setFormErrors((formE) => ({...formE, photos: {...formE.photos, minDim: `A largura mínima deve ser 600px e a altura mínima deve ser 400px.`}}));
                                    
                                        case 'maxWidth': case 'maxHeight':
                                            console.log('Dimensions < ', `${rules.width.max}x${rules.height.max}`);
                                            //setFormErrors((formE) => ({...formE, photos: {...formE.photos, maxDim: `A largura máxima deve ser xx e a altura máxima deve ser yy.`}}));
                                    
                                        default:
                                    }
                                }}
                                header={({ openDialogue }) => (
                                    <DropArea
                                    >
                                    {
                                        (isDrag) => 
                                        <Flex style={{ background: isDrag ? 'yellow' : '#fff' }}
                                            w='100%'
                                        >
                                            <Button 
                                                onClick={() => {
                                                    openDialogue();
                                                    setFormErrors((formE) => ({...formE, photos: {accept: '', minLimit: '', maxLimit: '', size: '', minDim: '', maxDim: ''}}));
                                                }}
                                                rightIcon={<Icon as={FiUpload}/>}
                                            >
                                                Upload de Fotos
                                            </Button>
                                        </Flex>
                                    }
                                    </DropArea>
                                )}
                            >                                
                            </RUG>                            
                        </Flex>
                    </Flex>
                </RegisterFormLayout>
            );

        case 10:
            return (
                <RegisterFormLayout 
                    question={`Perguntas frequentes sobre ${enterpriseSpecificCategoryDict[enterpriseData.enterpriseSpecificCategory]}`}
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
                        py='5'
                    >
                        {
                        enterpriseData.enterpriseCategory == 'Espaco'
                        ?
                        specificQuestions['Espaco']
                        .map((el, index) => {
                            // POSSUI BUFFET JUNTO COM O ESPAÇO
                            if( enterpriseData.q3 == 'Sim' && 
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
                            else if(enterpriseData.q3 == 'Não' && 
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
                                                                        selectedName={enterpriseData?.[el.name[0]]}
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
                                                        value={enterpriseData?.[el.name[1]]}
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
                                                        value={enterpriseData?.[el.name[0]]}
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
                                                        value={enterpriseData?.[el.name[0]]}
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
                                                                    selectedName={enterpriseData?.[el.name[0]]}
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
                                                    value={enterpriseData?.[el.name[1]]}
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
                                                    value={enterpriseData?.[el.name[0]]}
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
                                                    value={enterpriseData?.[el.name[0]]}
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

        case 11:
            return (
                <RegisterFormLayout 
                    question={`Perguntas frequentes sobre ${enterpriseSpecificCategoryDict[enterpriseData.enterpriseSpecificCategory]}`}
                    subTitle="Responda essas perguntas para facilitar o 
                    entendimento do cliente sobre os seus serviços"
                    lastStep={true}
                    handleNextStep={handleSubmit}
                    handlePreviousStep={previousStep}
                >
                    <Flex w='100vw' h='100vh' justifyContent='center'>
                        <Flex 
                            direction='column'
                            justifyContent='center' 
                            width='70%' height='100%'
                            alignItems='center' 
                        >
                            <Text fontSize={36}
                                fontWeight={500}
                                mb='20'
                            >
                                Escolha o seu plano
                            </Text>

                            <Stack direction="row" spacing="10"
                                justifyContent="center" 
                                alignItems="center" 
                                bg="brand.white_95"
                            >
                                {/* Card */}
                                <PriceCard title="START (Grátis)" price={0}
                                    functionalities={[
                                        "Gerenciador de anúncios",
                                        "Gerenciador de mensagens"
                                    ]}
                                />

                                <PriceCard title="PRO" price={69.99}
                                    functionalities={[
                                        "Gerenciador de anúncios",
                                        "Gerenciador de mensagens"
                                    ]}
                                />

                                <PriceCard title="VIP" price={139.99}
                                    functionalities={[
                                        "Gerenciador de anúncios",
                                        "Gerenciador de mensagens"
                                    ]}
                                />
                        
                        
                            </Stack> 
                        </Flex>
                    </Flex>

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