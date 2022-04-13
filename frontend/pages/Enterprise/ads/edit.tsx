import { Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import { TopMenuEnterprise } from "../../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../../components/Header";
import Image from 'next/image';
import { LeftMenuEdit } from "../../../components/Enterprise/Ads/Edit/LeftMenu";
import { useEffect, useState } from "react";
import { AdDetailsEdit } from "../../../components/Enterprise/Ads/Edit/AdDetails";
import api from "../../../utils/api";
import { useRouter } from "next/router";
import { typeOfParties } from "../../../utils/typeOfParties";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import { NotAuthorizedComponent } from "../../../components/NotAuthorizedComponent";
import { Footer } from "../../../components/Footer";
import * as yup from 'yup';
import { monetaryRegex, validTextRegex, invalidTextRegex } from "../../../utils/regexCustom";
import { enterpriseCategory, enterpriseSpecificCategory, specificQuestions } from "../../../utils/typeOfParties";


interface adDataInterf {
    id: number;
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

const adDataNullState = {
    id: 0,
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
    passwordConfirmation: string;
    // About the enterprise
    enterpriseName: string;
    location: string;
    country: string;
    state: string;
    city: string;
    address: string;
    addressNumber: number;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
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
    passwordConfirmation: '',
    // About the enterprise
    enterpriseName: '',
    location: '',
    country: '',
    state: '',
    city: '',
    address: '',
    addressNumber: 0,

    // Enterprise Social Media
    instagram: '',
    facebook: '',
    website: '',

    enterpriseCategory: '',
    enterpriseSpecificCategory: '',
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

function handleTestValidation(value:any, ctx: any, questionN: number) {

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
            else if( specificQuestions.Servico[spcCat][i].name[1] == ('q'+questionN) ) {
                //console.log('servico caso 1');
                schemaQ = yup.string().optional()
                            .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
            }
        }
    }
    else {
        console.log('entrou no else');
        return false;
    }

    return schemaQ.isValid( value ).then( async (valid) => {
        if( valid ) {
            // console.log(questionN);
            // console.log('valor valido');
            return true;
        }
        else {
            console.log(questionN);
            console.log('valor nao valido');
            console.log(value);
            let errMes = await schemaQ.validate(value).catch((err) => {return err});
            return ctx.createError({
                message: errMes,
            }); 
        }
    })                    
}

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

export default function EditAdsEnterprise() {
    const [componentToLoad, setComponentToLoad] = useState("Detalhes do anúncio");
    const [adData, setAdData] = useState<adDataInterf>( adDataNullState );
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>(enterpriseDataNullState);
    const [hasToUpdate, setHasToUpdate] = useState(false);
    const [formErrors, setFormErrors] = useState<enterpriseDataFormErrorInterf>( enterpriseDataFormErrorNullState );
    const routerNext = useRouter();
    const { authenticatedEnterprise } = useEnterpriseAuthContext();


    // GetData - Ads and enterprise
    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }

        if( !routerNext.isReady ) {
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");
        const { partyType } = routerNext.query;

        try {
            api.get(`/enterprise/ads/${partyType}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setAdData( response.data.ad );  
                console.log( response.data.ad );             
            });
        }
        catch( err ) {
            console.log( err );
        }

    }, [routerNext.query, authenticatedEnterprise]);

    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }
        if( !routerNext.isReady ) {
            return;
        }
        const token = localStorage.getItem("tokenEnterprise");

        // Get enterprise data
        try {
            api.get("/enterprise/myenterprise", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                console.log( response.data.enterpriseData );
                setEnterpriseData( response.data.enterpriseData );
            });
        }
        catch( err ) {
            console.log( err );
        }
    }, [routerNext.query, authenticatedEnterprise]);


    // Enterprise Category and Specific Category are
    // used for validation in schema
    useEffect(() => {
        setAdData({...adData, enterpriseCategory: enterpriseData.enterpriseCategory, enterpriseSpecificCategory: enterpriseData.enterpriseSpecificCategory });
    }, [enterpriseData, authenticatedEnterprise]);


    // Update Ad
    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }

        if( !routerNext.isReady ) {
            return;
        }

        if ( !hasToUpdate ) {            
            return;
        }

        console.log('Chegou para atualizar o anúncios.');
        console.log( adData );

        const token = localStorage.getItem("tokenEnterprise");
        const formData = new FormData;
    
        Object.keys(adData).forEach((key:any) => {
            if(key == 'photosNew') {
                console.log('entrou no photos object key');
                for(let i = 0; i < adData[key].length; i++) {
                    formData.append('photosNew', adData[key][i]);
                }
            }
            else {
                formData.append(key, adData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        console.log('formData');
        console.log(formData);
        
        try {
            const { partyType } = routerNext.query;

            api.patch(
            `/enterprise/ads/edit/${partyType}`,
             formData, 
             {
                headers: {
                    "content-type": "multipart/form-data",
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
             });
        }
        catch(err) {
            // tratar o erro
            console.log(err);
        }
        setHasToUpdate(false);

    }, [adData, hasToUpdate]);


    function getQuestionsObj( parentObj: Object ) {
        let obj = {};
        
        Object.keys( parentObj ).map((el, index) => {
            if( el[0] == 'q' ) {
                obj[el] = parentObj[el];
            }
        })
        return obj;
    }
    

    async function saveDataChanged( data: Object ) {
        console.log( adData );
        console.log( enterpriseData.enterpriseCategory );
        console.log( enterpriseData.enterpriseSpecificCategory );

        console.log( adData );

        // VALIDATE THE DATA
        let fields = [
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
            .validateAt( el, adData )
            .catch((err) => {
                setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                //console.log(err);
            });
        });

        console.log( formErrors );

        // Validate
        return await enterpriseRegisterQuestionsDataSchema
        .isValid({
            enterpriseCategory: enterpriseData.enterpriseCategory,
            enterpriseSpecificCategory: enterpriseData.enterpriseSpecificCategory,
            q1: adData.q1,
            q2: adData.q2,
            q3: adData.q3,
            q4: adData.q4,
            q5: adData.q5,
            q6: adData.q6,
            q7: adData.q7,
            q8: adData.q8,
            q9: adData.q9,
            q10: adData.q10,
            q11: adData.q11,
            q12: adData.q12,
            q13: adData.q13,
            q14: adData.q14,
            q15: adData.q15,
            q16: adData.q16,
            q17: adData.q17,
            q18: adData.q18,
            q19: adData.q19,
            q20: adData.q20,
            q21: adData.q21,
            q22: adData.q22,
            q23: adData.q23,
            q24: adData.q24,
            q25: adData.q25,
            q26: adData.q26,
            q27: adData.q27,
            q28: adData.q28,
            q29: adData.q29,
            q30: adData.q30,
            q31: adData.q31,
            q32: adData.q32,
            q33: adData.q33,
            q34: adData.q34,
            q35: adData.q35,
            q36: adData.q36,
            q37: adData.q37,
            q38: adData.q38,
            q39: adData.q39,
            q40: adData.q40,
            q41: adData.q41,
            q42: adData.q42,
            q43: adData.q43,
            q44: adData.q44
        })
        .then((val) =>{
            if( val == true ) {
                // Validou bemmmm
                console.log('Validou bemmm');

                // Update the data in database
                setHasToUpdate(true);

                console.log('antes do formData');
                console.log(adData);
                return true;
            }
            else {
                console.log('Não validou');
                // Update the data with previous data changed
                // Object.keys( data ).map((key, index) => {
                //     setAdData((prevAdData) => ({...prevAdData, [key]: prevAdDataState[key]}) );
                // });
                return false;
            }
        });
    }

    if( authenticatedEnterprise ) {
        if( adData.id != 0 && enterpriseData.id != 0 ) {
            return (    
                <Box>
                    <Header name="" position="relative" />
                    <TopMenuEnterprise />
                    <Flex 
                        mt="5"
                        mb='14'
                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                        borderRadius={8} 
                        maxWidth={1200}
                        justifyContent="space-between"
                        mx="auto" 
                        direction={{base:'column', lg:'row'}}
                        w={{base:'100%', lg:'80%'}}
                    >
                        {/* Left Menu */}
                        <LeftMenuEdit 
                            propertyName={typeOfParties[adData?.partyMainFocus].textToShow}
                            srcImage={`http://localhost:5000/images/enterprise/${adData?.photos.split(",")[0]}`}
                            stateChanger={setComponentToLoad}
                            w={{base:'100%', lg:'25%'}}
                        />
        
                        {/* Forms */}
                        <Flex
                            as="form"                    
                            pb="5"
                            w={{base:'100%', lg:'75%'}}
                            h='auto'
                        >
                            
                            {
                                componentToLoad == "Detalhes do anúncio"
                                ?
                                <AdDetailsEdit
                                    serviceDescription={adData['serviceDescription']}
                                    photos={adData['photos'].split(",")}
                                    enterpriseCategory={enterpriseData?.enterpriseCategory}
                                    enterpriseSpecificCategory={enterpriseData?.enterpriseSpecificCategory}
                                    questions={getQuestionsObj( adData )} 
                                    formErrors={formErrors}     
                                    setData={setAdData}                              
                                    saveDataChanged={saveDataChanged}
                                />                            
                                :
                                <h2>afsdfas</h2>
                            }    
                        </Flex>
                    </Flex>
                </Box>
            )
        }
        else {
            return (
                <Box>
                    <Header name="" position="relative" />
                    <TopMenuEnterprise />
                    <Flex>
                        <Text>Loading</Text>
                    </Flex>
                </Box>
            )
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