import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Stack, Text, Textarea, useBreakpointValue } from "@chakra-ui/react";
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
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const monetaryRegex = /^([0-9]{1,3}\.([0-9]{3}\.)*[0-9]{3}|[0-9]+)(,[0-9][0-9])?$/;
const validTextRegex = /^[^'"`]*$/;

const invalidTextRegex = 'Texto inválido! Aspas não são permitidas!';

function handleTestValidation(value:any, ctx: any, questionN: number) {
    //if( value ) {
        console.log('question number: ');
        console.log( questionN );

        let schemaQ = yup.string().optional();

        /* ESPACO */
        if( ctx.parent.enterpriseCategory == 'Espaco' ) {
            for(let i=0; i < specificQuestions.Espaco.length; i++) {
                if( specificQuestions.Espaco[i].name[0] == ('q'+questionN) ) {
                    //console.log('espaco caso 0');
                    let qObj = specificQuestions.Espaco[i];

                    if( (questionN >= 5 && questionN <=20) && ctx.parent.q3 == 'Não' ) {
                        // optional
                    }
                    else if( (questionN >= 21 && questionN <= 23) && ctx.parent.q3 == 'Sim' ) {
                        // optional
                    }
                    else {
                        switch( qObj.type ) {
                            case 'radio':
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                            .oneOf( qObj.options, 'Opção não válida');
                            case 'textarea':
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                          .matches( validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
                            case 'input':
                                if( qObj.specific == 'price' ) {
                                    schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                               .matches(monetaryRegex, {message:'Valor inválido - Exemplo válido: 99,99', excludeEmptyString: true });
                                }
                                else if( qObj.specific == 'nOfPeople' ) {
                                    schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                              .matches(/^[1-9]+[0-9]*$/, {message:'Valor inválido - O número deve ser positivo e inteiro', excludeEmptyString: true });
                                }
                        }
                    }
                }
                // Observations case
                else if( specificQuestions.Espaco[i]?.name[1] == ('q'+questionN) ) {
                    //console.log('espaco caso 1');
                    schemaQ = yup.string().optional()
                              .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
                }
            }
        }
        /* SERVICO */
        else if( ctx.parent.enterpriseCategory == 'Servico' ) {
            let spcCat = ctx.parent.enterpriseSpecificCategory;

            for(let i=0; i < specificQuestions.Servico[spcCat].length; i++) {
                
                if( specificQuestions.Servico[spcCat][i].name[0] == ('q'+questionN) ) {
                    console.log('servico caso 0');
                    let qObj = specificQuestions.Servico[spcCat][i];
                    
                    switch( qObj.type ) {
                        case 'radio':
                            schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                        .oneOf( qObj.options, 'Opção não válida');
                        case 'textarea':
                            schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
                        case 'input':
                            if( qObj.specific == 'price' ) {
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                            .matches(monetaryRegex, {message:'Valor inválido - Exemplo válido: 99,99', excludeEmptyString: true });
                            }
                            else if( qObj.specific == 'nOfPeople' ) {
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                            .matches(/^[1-9]+[0-9]*$/, {message:'Valor inválido - O número deve ser positivo e inteiro', excludeEmptyString: true });
                            }
                            else if( qObj.specific == 'float' ) {
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                          .matches(/^[0-9]+(,[0-9][0-9])?$/, {message:'Valor inválido - Exemplo válido: 1,5', excludeEmptyString: true });
                            }
                    }
                    
                }
                // Observations case
                else if( specificQuestions.Espaco[i]?.name[1] == ('q'+questionN) ) {
                    console.log('servico caso 1');
                    schemaQ = yup.string().optional()
                                .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
                }
            }
        }
        else {
            return false;
        }
    
        return schemaQ.isValid( value ).then( async (valid) => {
            if( valid ) {
                console.log(questionN);
                console.log('valor valido');
                return true;
            }
            else {
                console.log(questionN);
                console.log('valor nao valido');
                let errMes = await schemaQ.validate(value).catch((err) => {return err});
                return ctx.createError({
                    message: errMes,
                }); 
            }
        })                    
    //}
    return ctx.createError({
        message: 'Valor inválido',
    })
}

interface enterpriseDataInterf {
    step: number;
    plan: string;
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

const enterpriseDataNullState = {
    step: 7,
    plan: 'Free',
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

interface enterpriseDataFormErrorInterf {
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
    addressNumber: string;
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

const enterpriseDataFormErrorNullState = {
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
    addressNumber: '',

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

const enterpriseRegisterFormSchema = yup.object().shape({
    fullName: yup.string().required('O nome completo é obrigatório'),
    email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido"),
    phone: yup.string().required("O telefone é obrigatório").matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Telefone inválido', excludeEmptyString: true } ),
    whatsapp: yup.string().optional().matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Whatsapp inválido', excludeEmptyString: true } ),
    enterpriseName: yup.string().required('O nome da empresa é obrigatório'),
    location: yup.string().required('A localização é obrigatória').oneOf(
        Object.values(locationMap).map((el,index) => {return el.textToShow})
        , 'Opção não válida'),
    address: yup.string().required('O endereço é obrigatório'),
    addressNumber: yup.number().positive().required('O número do endereço é obrigatório'),
    instagram: yup.string().optional(),
    facebook: yup.string().optional(),
    website: yup.string().optional(),
    partyMainFocus: yup.string().required('O principal tipo de festa é obrigatório')
        .oneOf(
            Object.values(typeOfParties).map((el,index) => {return el.value})
            , 'Opção não válida'
        ),
    serviceDescription: yup.string().required('A descrição do serviço é obrigatória')
        .min(300, 'A descrição do serviço deve ter no mínimo 300 caracteres.'),
});

const enterpriseRegisterPasswordSchema = yup.object().shape({
    password: yup.string().required("Senha obrigatória").min(6, "No mínimo 6 caracteres"),
    passwordConfirmation: yup.string().oneOf([null,yup.ref("password")], 
        "As senhas precisam ser iguais")
});

const enterpriseRegisterCategoryDataSchema = yup.object().shape({
    enterpriseCategory: yup.string().required('A categoria de atuação da empresa é obrigatória')
        .oneOf(
            Object.values(enterpriseCategory).map((el,index) => {return el.value})
            , 'Opção não válida'
        ),
    enterpriseSpecificCategory: yup.string().required('A categoria específica da sua empresa é obrigatória')
        .test({
            name: 'specificCategoryTest',
            test: function(value, ctx) {
                if( value ) {
                    let specificCategories = enterpriseSpecificCategory[ ctx.parent.enterpriseCategory ].map((el,index) => {
                        return el.value;
                    });
                    if( specificCategories.includes(value) ) {
                        return true;
                    }
                }
                return this.createError({
                    message: 'Categoria inválida',
                })
            }
        }),   
});

const enterpriseRegisterQuestionsDataSchema = yup.object().shape({
    enterpriseCategory: yup.string().required('A categoria de atuação da empresa é obrigatória')
        .oneOf(
            Object.values(enterpriseCategory).map((el,index) => {return el.value})
            , 'Opção não válida'
        ),
    enterpriseSpecificCategory: yup.string().required('A categoria específica da sua empresa é obrigatória')
        .test({
            name: 'specificCategoryTest',
            test: function(value, ctx) {
                if( value ) {
                    let specificCategories = enterpriseSpecificCategory[ ctx.parent.enterpriseCategory ].map((el,index) => {
                        return el.value;
                    });
                    if( specificCategories.includes(value) ) {
                        return true;
                    }
                }
                return this.createError({
                    message: 'Categoria inválida',
                })
            }
        }),  
    q1: yup.string()
        .test({
            name: 'q1Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 1);
            }
        }),
    q2: yup.string()
        .test({
            name: 'q2Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 2);
            }
        }),
    q3: yup.string()
        .test({
            name: 'q3Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 3);
            }
        }),
    q4: yup.string()
        .test({
            name: 'q4Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 4);
            }
        }),
    q5: yup.string()
        .test({
            name: 'q5Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 5);
            }
        }),
    q6: yup.string()
        .test({
            name: 'q6Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 6);
            }
        }),
    q7: yup.string()
        .test({
            name: 'q7Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 7);
            }
        }),
    q8: yup.string()
        .test({
            name: 'q8Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 8);
            }
        }),
    q9: yup.string()
        .test({
            name: 'q9Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 9);
            }
        }),
    q10: yup.string()
        .test({
            name: 'q10Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 10);
            }
        }),
    q11: yup.string()
        .test({
            name: 'q11Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 11);
            }
        }),
    q12: yup.string()
        .test({
            name: 'q12Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 12);
            }
        }),
    q13: yup.string()
        .test({
            name: 'q13Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 13);
            }
        }),
    q14: yup.string()
        .test({
            name: 'q14Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 14);
            }
        }),
    q15: yup.string()
        .test({
            name: 'q15Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 15);
            }
        }),
    q16: yup.string()
        .test({
            name: 'q16Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 16);
            }
        }),
    q17: yup.string()
        .test({
            name: 'q17Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 17);
            }
        }),
    q18: yup.string()
        .test({
            name: 'q18Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 18);
            }
        }),
    q19: yup.string()
        .test({
            name: 'q19Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 19);
            }
        }),
    q20: yup.string()
        .test({
            name: 'q20Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 20);
            }
        }),
    q21: yup.string()
        .test({
            name: 'q21Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 21);
            }
        }),
    q22: yup.string()
        .test({
            name: 'q22Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 22);
            }
        }),
    q23: yup.string()
        .test({
            name: 'q23Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 23);
            }
        }),
    q24: yup.string()
        .test({
            name: 'q24Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 24);
            }
        }),
    q25: yup.string()
        .test({
            name: 'q25Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 25);
            }
        }),
    q26: yup.string()
        .test({
            name: 'q26Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 26);
            }
        }),
    q27: yup.string()
        .test({
            name: 'q27Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 27);
            }
        }),
    q28: yup.string()
        .test({
            name: 'q28Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 28);
            }
        }),
    q29: yup.string()
        .test({
            name: 'q29Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 29);
            }
        }),
    q30: yup.string()
        .test({
            name: 'q30Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 30);
            }
        }),
    q31: yup.string()
        .test({
            name: 'q31Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 31);
            }
        }),
    q32: yup.string()
        .test({
            name: 'q32Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 32);
            }
        }),
    q33: yup.string()
        .test({
            name: 'q33Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 33);
            }
        }),
    q34: yup.string()
        .test({
            name: 'q34Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 34);
            }
        }),
    q35: yup.string()
        .test({
            name: 'q35Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 35);
            }
        }),
    q36: yup.string()
        .test({
            name: 'q36Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 36);
            }
        }),
    q37: yup.string()
        .test({
            name: 'q37Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 37);
            }
        }),
    q38: yup.string()
        .test({
            name: 'q38Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 38);
            }
        }),
    q39: yup.string()
        .test({
            name: 'q39Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 39);
            }
        }),
    q40: yup.string()
        .test({
            name: 'q40Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 40);
            }
        }),
    q41: yup.string()
        .test({
            name: 'q41Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 41);
            }
        }),
    q42: yup.string()
        .test({
            name: 'q42Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 42);
            }
        }),
    q43: yup.string()
        .test({
            name: 'q43Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 43);
            }
        }),
    q44: yup.string()
        .test({
            name: 'q44Test',
            test: function(value, ctx) {
                return handleTestValidation(value, ctx, 44);
            }
        }),

});
   
export default function RegisterEnterprise() {
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>( enterpriseDataNullState );
    const [formErrors, setFormErrors] = useState<enterpriseDataFormErrorInterf>( enterpriseDataFormErrorNullState );
    const routerNext = useRouter();
    const { registerEnterprise } = useEnterpriseAuthContext();
    const [preview, setPreview] = useState([]);
    const [menuWhere, setMenuWhere] = useState('none');
    
    //   Close dropdown menu on click outside
    useEffect(() => {
        document.addEventListener('mouseup', function (e) {
            var menu1 = document.getElementById('menuLocation');

            if (!menu1?.contains(e.currentTarget)) {
                setMenuWhere('none');
            }
        }.bind(this));
    },[]);


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
                ['fullName', 'email', 'phone', 'whatsapp'],
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
                if( val ) {
                    // Validou bemmmm
                    console.log('Validou bemmm');
                    
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
                            fontSize={30}
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
                        //h='100%'
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
                                textToShow="Usuário - Email cadastrado na página anterior"
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
                            <FormControl isInvalid={formErrors.enterpriseName != '' ? true : false}>
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
                                <Box 
                                    id='menuLocation'
                                    height={230} 
                                    width={350}
                                    display={menuWhere}
                                    position='absolute'
                                    overflowY="scroll"
                                    bg='brand.white'
                                    mt={20}
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
                                </Box>
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
                                <Textarea h={300} resize='none' name='serviceDescription'
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
                    <Flex direction='column' alignItems='center'

                    >
                        <Flex 
                            w='100%'
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
                                        h={{base:'60vw', lg:'23vw'}}
                                        w={{base:'60vw', lg:'23vw'}}
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
                    question={`Perguntas frequentes sobre ${enterpriseSpecificCategoryDict[enterpriseData.enterpriseSpecificCategory]}`}
                    subTitle="Responda essas perguntas para facilitar o 
                    entendimento do cliente sobre os seus serviços"
                    lastStep={false}
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
                        //overflowWrap='wrap'
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
                                //console.log('entrou no sim');
                                //console.log(el.name);
                                
                                
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
                                            ?
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
    
                                                <Textarea name={el.name[1]} 
                                                    placeholder={el.placeholder}
                                                    value={enterpriseData?.[el.name[1]]}
                                                    onChange={handleChange} 
                                                />
                                            </Flex>
                                            :
                                            <>
                                            </>
                                        }
    
                                        {/* TEXTAREA */}
                                        {
                                            el.type == 'textarea'  
                                            ?
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
                                            :
                                            <>
                                            </>
                                        }       
    
                                        {/* INPUT */}
                                        {
                                            el.type == 'input'  
                                            ?
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
                                            :
                                            <>
                                            </>
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
                                        ?
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

                                            <Textarea name={el.name[1]} 
                                                placeholder={el.placeholder}
                                                value={enterpriseData?.[el.name[1]]}
                                                onChange={handleChange} 
                                            />
                                        </Flex>
                                        :
                                        <>
                                        </>
                                    }

                                    {/* TEXTAREA */}
                                    {
                                        el.type == 'textarea'  
                                        ?
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
                                        :
                                        <>
                                        </>
                                    }       

                                    {/* INPUT */}
                                    {
                                        el.type == 'input'  
                                        ?
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
                                        :
                                        <>
                                        </>
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