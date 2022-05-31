import { 
        enterpriseCategory, enterpriseSpecificCategory, typeOfParties,
        specificQuestions, enterpriseSpecificCategoryDict, locationMap, locationMapUser 
        } from "./typeOfParties";
import * as yup from 'yup';
import { monetaryRegex, validTextRegex, invalidTextRegex, dateRegex, passwordStrongRegex } from "./regexCustom";

function handleTestValidation(value:any, ctx: any, questionN: number) {
    //console.log('question number: ');
    //console.log( questionN );

    let schemaQ = yup.string().optional();

    /* ESPACO */
    if( ctx.parent.enterpriseCategory == 'Espaco' ) {
        for(let i=0; i < specificQuestions.Espaco.length; i++) {
            if( specificQuestions.Espaco[i].name[0] == ('q'+questionN) ) {
                ////console.log('espaco caso 0');
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
                                        .max(190, 'A resposta deve ter no máximo 190 caracteres.')
                                        .matches( validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
                        case 'input':
                            if( qObj.specific == 'price' ) {
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                    .max(20, 'A resposta deve ter no máximo 20 caracteres.')    
                                    .matches(monetaryRegex, {message:'Valor inválido - Exemplo válido: 99,99', excludeEmptyString: true });
                            }
                            else if( qObj.specific == 'nOfPeople' ) {
                                schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                    .max(10, 'A resposta deve ter no máximo 10 caracteres.')    
                                    .matches(/^[1-9]+[0-9]*$/, {message:'Valor inválido - O número deve ser positivo e inteiro', excludeEmptyString: true });
                            }
                    }
                }
            }
            // Observations case
            else if( specificQuestions.Espaco[i]?.name[1] == ('q'+questionN) ) {
                //console.log('espaco caso 1');
                schemaQ = yup.string().optional()
                            .max(190, 'A resposta deve ter no máximo 190 caracteres.')
                            .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
            }
        }
    }
    /* SERVICO */
    else if( ctx.parent.enterpriseCategory == 'Servico' ) {
        let spcCat = ctx.parent.enterpriseSpecificCategory;

        for(let i=0; i < specificQuestions.Servico[spcCat].length; i++) {
            
            if( specificQuestions.Servico[spcCat][i].name[0] == ('q'+questionN) ) {
                //console.log('servico caso 0');
                let qObj = specificQuestions.Servico[spcCat][i];
                
                switch( qObj.type ) {
                    case 'radio':
                        schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                    .oneOf( qObj.options, 'Opção não válida');
                    case 'textarea':
                        schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                    .max(190, 'A resposta deve ter no máximo 190 caracteres.')
                                    .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
                    case 'input':
                        if( qObj.specific == 'price' ) {
                            schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                        .max(20, 'A resposta deve ter no máximo 20 caracteres.')    
                                        .matches(monetaryRegex, {message:'Valor inválido - Exemplo válido: 99,99', excludeEmptyString: true });
                        }
                        else if( qObj.specific == 'nOfPeople' ) {
                            schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                        .max(10, 'A resposta deve ter no máximo 10 caracteres.')    
                                        .matches(/^[1-9]+[0-9]*$/, {message:'Valor inválido - O número deve ser positivo e inteiro', excludeEmptyString: true });
                        }
                        else if( qObj.specific == 'float' ) {
                            schemaQ = yup.string().required('A resposta dessa questão é obrigatória')
                                        .max(10, 'A resposta deve ter no máximo 10 caracteres.')    
                                        .matches(/^[0-9]+(,[0-9][0-9])?$/, {message:'Valor inválido - Exemplo válido: 1,5', excludeEmptyString: true });
                        }
                }
            }
            // Observations case
            else if( specificQuestions.Servico[spcCat][i].name[1] == ('q'+questionN) ) {
                //console.log('servico caso 1');
                schemaQ = yup.string().optional()
                            .max(190, 'A resposta deve ter no máximo 190 caracteres.')
                            .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true});                        
            }
        }
    }
    else {
        //console.log('chegou no else');
        return false;
    }

    return schemaQ.isValid( value ).then( async (valid) => {
        if( valid ) {
            //console.log(questionN);
            //console.log('valor valido');
            return true;
        }
        else {
            //console.log(questionN);
            //console.log('valor nao valido');
            let errMes = await schemaQ.validate(value).catch((err) => {return err});
            return ctx.createError({
                message: errMes,
            }); 
        }
    })                    
}

export const enterpriseRegisterFormSchema = yup.object().shape({
    fullName: yup.string().required('O nome completo é obrigatório')
        .min(3, 'O nome completo deve ter no mínimo 3 caracteres')
        .max(90, 'O nome completo deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message: 'O nome completo não pode apresentar aspas.', excludeEmptyString: true}),
    email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido")
        .max(90, 'O email deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message:'O email não pode apresentar aspas', excludeEmptyString: true}),
    phone: yup.string().required("O telefone é obrigatório")
        .matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Telefone inválido', excludeEmptyString: true } ),
    whatsapp: yup.string().optional()
        .matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Whatsapp inválido', excludeEmptyString: true } ),
    accept: yup.string()
        .oneOf(['true'], 'Você deve aceitar os termos de uso e de privacidade para prosseguir!'),
    enterpriseName: yup.string().required('O nome da empresa é obrigatório')
        .min(3, 'O nome da empresa deve ter no mínimo 3 caracteres')
        .max(40, 'O nome da empresa deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'O nome da empresa não pode apresentar aspas', excludeEmptyString: true}),
    location: yup.string().required('A localização é obrigatória').oneOf(
        Object.values(locationMap).map((el,index) => {return el.textToShow})
        , 'Opção não válida'),
    address: yup.string().required('O endereço é obrigatório')
        .min(5, 'O endereço deve ter no mínimo 5 caracteres')
        .max(90, 'O endereço deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message:'O endereço não pode apresentar aspas', excludeEmptyString: true}),
    addressNumber: yup.string().required('O número de endereço é obrigatório')
        .max(90, 'O número de endereço deve ter no máximo 10 caracteres')
        .matches(/^[1-9]+[0-9]*$/, {message: 'Número de endereço inválido', excludeEmptyString: true}),
    instagram: yup.string().optional()
        .max(40, 'A conta do instagram deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'A conta do instagram não pode apresentar aspas', excludeEmptyString: true}),
    facebook: yup.string().optional()
        .max(40, 'A conta do facebook deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'A conta do facebook não pode apresentar aspas', excludeEmptyString: true}),
    website: yup.string().optional()
        .max(40, 'O website deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'O website não pode apresentar aspas', excludeEmptyString: true}),
    partyMainFocus: yup.string().required('O principal tipo de festa é obrigatório')
        .oneOf(
            Object.values(typeOfParties).map((el,index) => {return el.value})
            , 'Opção não válida'
        ),
    serviceDescription: yup.string().required('A descrição do serviço é obrigatória')
        .min(300, 'A descrição do serviço deve ter no mínimo 300 caracteres.')
        .max(3000, 'A descrição do serviço deve ter no máximo 3000 caracteres.')
        .matches(validTextRegex, {message:'A descrição do serviço não pode apresentar aspas', excludeEmptyString: true}),
});

export const enterpriseRegisterMyBusinessFormSchema = yup.object().shape({
    fullName: yup.string().required('O nome completo é obrigatório')
        .min(3, 'O nome completo deve ter no mínimo 3 caracteres')
        .max(90, 'O nome completo deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message: 'O nome completo não pode apresentar aspas.', excludeEmptyString: true}),
    email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido")
        .max(90, 'O email deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message:'O email não pode apresentar aspas', excludeEmptyString: true}),
    phone: yup.string().required("O telefone é obrigatório")
        .matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Telefone inválido', excludeEmptyString: true } ),
    whatsapp: yup.string().optional()
        .matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Whatsapp inválido', excludeEmptyString: true } ),
    enterpriseName: yup.string().required('O nome da empresa é obrigatório')
        .min(3, 'O nome da empresa deve ter no mínimo 3 caracteres')
        .max(40, 'O nome da empresa deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'O nome da empresa não pode apresentar aspas', excludeEmptyString: true}),
    location: yup.string().required('A localização é obrigatória').oneOf(
        Object.values(locationMap).map((el,index) => {return el.textToShow})
        , 'Opção não válida'),
    address: yup.string().required('O endereço é obrigatório')
        .min(5, 'O endereço deve ter no mínimo 5 caracteres')
        .max(90, 'O endereço deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message:'O endereço não pode apresentar aspas', excludeEmptyString: true}),
    addressNumber: yup.string().required('O número de endereço é obrigatório')
        .max(90, 'O número de endereço deve ter no máximo 10 caracteres')
        .matches(/^[1-9]+[0-9]*$/, {message: 'Número de endereço inválido', excludeEmptyString: true}),
    instagram: yup.string().optional()
        .max(40, 'A conta do instagram deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'A conta do instagram não pode apresentar aspas', excludeEmptyString: true}),
    facebook: yup.string().optional()
        .max(40, 'A conta do facebook deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'A conta do facebook não pode apresentar aspas', excludeEmptyString: true}),
    website: yup.string().optional()
        .max(40, 'O website deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message:'O website não pode apresentar aspas', excludeEmptyString: true}),
});

export const enterpriseRegisterPasswordSchema = yup.object().shape({
    password: yup.string().required("Senha obrigatória")
        .min(8, "No mínimo 8 caracteres")
        .max(20, "No máximo 20 caracteres")
        .matches(passwordStrongRegex, {message:'A senha deve apresentar pelo menos 1 caractere maiúsculo, 1 minúsculo, 1 especial (!@#$%^&*_) e 1 número.', excludeEmptyString: true}),
    passwordConfirmation: yup.string().oneOf([null,yup.ref("password")], 
        "As senhas precisam ser iguais")
});

export const enterpriseRegisterCategoryDataSchema = yup.object().shape({
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

export const enterpriseRegisterQuestionsDataSchema = yup.object().shape({
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

export const userRegisterFormSchema = yup.object().shape({
    fullName: yup.string().required('O nome completo é obrigatório')
        .min(3, 'O nome completo deve ter no mínimo 3 caracteres')
        .max(90, 'O nome completo deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message: 'O nome completo não pode apresentar aspas.', excludeEmptyString: true}),
    email: yup.string().required("O e-mail é obrigatório").email("E-mail inválido")
        .max(90, 'O email deve ter no máximo 90 caracteres')
        .matches(validTextRegex, {message:'O email não pode apresentar aspas', excludeEmptyString: true}),
    phone: yup.string().required("O telefone é obrigatório")
        .matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Telefone inválido. Digite somente os números, não inclua (), - ou espaços.', excludeEmptyString: true } ),
    whatsapp: yup.string().optional()
        .matches(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/, { message: 'Whatsapp inválido. Digite somente os números, não inclua (), - ou espaços.', excludeEmptyString: true } ),
    location: yup.string().required('A localização é obrigatória').oneOf(
        Object.values(locationMapUser).map((el,index) => {return el.textToShow})
        , 'Opção não válida'),
    accept: yup.string()
        .oneOf(['true'], 'Você deve aceitar os termos de uso e de privacidade para prosseguir!')
});

export const userRegisterPasswordSchema = yup.object().shape({
    password: yup.string().required("Senha obrigatória")
        .min(8, "No mínimo 8 caracteres")
        .max(20, "No máximo 20 caracteres")
        .matches(passwordStrongRegex, {message:'A senha deve apresentar pelo menos 1 caractere maiúsculo, 1 minúsculo, 1 especial (!@#$%^&*_) e 1 número.', excludeEmptyString: true}),
    passwordConfirmation: yup.string().oneOf([null,yup.ref("password")], 
        "As senhas precisam ser iguais")
});

export const askBudgetSchema = yup.object().shape({
    partyDate: yup.string().required("A data da festa é obrigatória")
        .matches(dateRegex, { message: 'Data inválida. A data deve ter o formato dd/mm/yyyy.', excludeEmptyString: true } ),    
    nOfPeople: yup.string().required("A quantidade de pessoas é obrigatória")
        .max(5, "O número de pessoas deve ter no máximo 5 dígitos")
        .matches(/^[1-9]+[0-9]*$/, {message: 'Deve ser um número inteiro e positivo, sem vírgulas ou pontos', excludeEmptyString: true}),
    messageContent: yup.string().required("O conteúdo da mensagem é obrigatório")
        .max(500, "A mensagem deve ter no máximo 500 caracteres")
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString: true})    
});

export const RatingFormSchema = yup.object().shape({
    partyType: yup.string().required('O tipo da festa é obrigatório').oneOf(
        Object.values(typeOfParties).map((el,index) => {return el.value})
        , 'Opção não válida'),
    partyDate: yup.string().required("A data da festa é obrigatória")
        .matches(dateRegex, { message: 'Data inválida. A data deve ter o formato dd/mm/yyyy.', excludeEmptyString: true } ),
    ratingServiceQuality: yup.string().required('Esse quesito é obrigatório')
        .oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingPrice: yup.string().required('Esse quesito é obrigatório')
        .oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingAnswerTime: yup.string().required('Esse quesito é obrigatório')
        .oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingFlexibility: yup.string().required('Esse quesito é obrigatório')
        .oneOf(['1','2','3','4','5'], 'Opção inválida'),
    ratingProfessionalism: yup.string().required('Esse quesito é obrigatório')
        .oneOf(['1','2','3','4','5'], 'Opção inválida'),
    recommendToAFriend: yup.string().required('Esse quesito é obrigatório')
        .oneOf(['Sim', 'Não'], 'Opção inválida'),
    recommendToAFriendObservation: yup.string().optional()
        .max(290, 'A observação deve ter no máximo 290 caracteres')
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true}),                       
    opinionTitle: yup.string().required('O título da opinião é obrigatório')
        .max(40, 'O título da opinião deve ter no máximo 40 caracteres')
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true}),                       
    opinionContent: yup.string().required('O conteúdo da opinião é obrigatório')
        .max(500, 'A opinião deve ter no máximo 500 caracteres')
        .matches(validTextRegex, {message: invalidTextRegex, excludeEmptyString:true})                      
});