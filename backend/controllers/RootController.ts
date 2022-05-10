const RootModel = require('../models/RootModel');
const rootModel = new RootModel();
const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimpClient = mailchimpFactory("rcUfsa5vVBpbmJlzbkjF0A");
import bcrypt = require("bcrypt");

module.exports = class RootController {

    static async getServices(req: any, res: any) {
        console.log('getServices');
        console.log( req.query);
        
        const { partyType, serviceCategory, serviceSpecificCategory, city, state, country, price, buffetIncluded, nOfPeople } = req.query;
        console.log( partyType, serviceCategory, serviceSpecificCategory, city, state, country, price, buffetIncluded, nOfPeople );

        if( !serviceCategory ) {
            res.status(422).json({ message: "A categoria do serviço é obrigatória!"});
            return;
        }

        // Number of People
        console.log('Number of people: ');
        console.log( nOfPeople );
        
        let minPeopleColumn, maxPeopleColumn;
        let minPeople, maxPeople;
        if( nOfPeople != undefined && nOfPeople != '-1' && nOfPeople.length > 0) {
            minPeople = nOfPeople.split('-')[0];
            maxPeople = nOfPeople.split('-')[1];

            if( serviceCategory == 'Servico') {
                if( serviceSpecificCategory == 'Buffet' 
                    || serviceSpecificCategory == 'Bolos'
                    || serviceSpecificCategory == 'Decoracao'
                ) 
                {
                    minPeopleColumn = 'q2';
                    maxPeopleColumn = 'q3';
                }
            }
            else if( serviceCategory == 'Espaco' ) {                    
                if( buffetIncluded == true ) {
                    minPeopleColumn = 'q6';
                    maxPeopleColumn = 'q7';
                }
                else if( buffetIncluded == false ) {
                    minPeopleColumn = 'q22';
                    maxPeopleColumn = 'q23';
                }
                else {
                    minPeopleColumn = maxPeopleColumn = '';
                }
            }
        }
        
        // Price Filter
        console.log( 'price: ' );
        console.log( price );
        console.log(typeof(price));
        

        let lowerPrice, upperPrice, priceColumn;
        if( price != undefined && price != '-1' && price.length > 0) {
            lowerPrice = price.split('-')[0];
            upperPrice = price.split('-')[1];

            if( serviceCategory == 'Espaco') {
                // Com Buffet
                if( buffetIncluded == true ) {
                    priceColumn = 'q5';
                }
                // Sem Buffet
                else {
                    priceColumn = 'q21';
                }
            }
            // For services
            else {
                priceColumn = 'q1';
            }
        }

        const services = await rootModel.selectServices(partyType, serviceCategory, serviceSpecificCategory, city, state, country, {price: price, lowerPrice: lowerPrice, upperPrice: upperPrice, priceColumn: priceColumn }, {nOfPeople: nOfPeople, minPeople: minPeople, maxPeople: maxPeople, minPeopleColumn: minPeopleColumn, maxPeopleColumn: maxPeopleColumn} );
        
        console.log( services );
        res.status(200).json({ services });
    }

    static async getServiceById(req: any, res: any) {
        console.log( req.query);
        
        const { id, partyType } = req.query;

        const service = await rootModel.selectServiceById(parseInt(id), partyType);
        
        const opinions = await rootModel.selectOpinionsByEnterpriseId(parseInt(id), partyType);

        console.log( service );
        res.status(200).json({ service: service, opinions: opinions });
    }

    static async sendEmailResetPasswordEnterprise(req: any, res: any) {
        const { email } = req.body;

        // Check if email exists
        let enterprise = await rootModel.getEnterpriseByEmail( email );
        console.log('enterpriseId é: ');
        console.log( enterprise );
        console.log( enterprise.id );

        if( enterprise == undefined ) {
            res.status(422).json({ message: "E-mail não cadastrado!"});
            return;
        }

        let randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let token = randomToken(64); 
        console.log('o token é');
        console.log( token );

        enterprise.tokenResetPassword = token;
        enterprise.tokenCreatedAt = Date.now().toString();

        await rootModel.updateEnterprise( enterprise );

        // Sending the email using Mandril
        const run = async () => {
            const response = await mailchimpClient.messages.send({ message: 
                {
                    subject: '[Redefinição de senha]',
                    text: `
                        Olá!

                        O link para redefinição da sua senha é:
                        localhost:3000/Enterprise/Auth/resetPassword?token=${enterprise.tokenResetPassword}
                    `,
                    from_email: 'festafy@festafy.com.br',
                    to: [ {email: enterprise.email, name: 'Fornecedor', type:'to'} ]
                } 
            });
            console.log(response);
        };

        run();

        return res.status(200).json({message: "Email enviado com sucesso!"});

    }

    static async checkResetPasswordValidity(req: any, res: any) {
        const { token } = req.query;

        if( token == undefined ) {
            res.status(422).json({ message: "Token não encontrado!"});
            return;
        }

        let enterprise = await rootModel.getEnterpriseByToken( token );
        console.log( enterprise );

        if( enterprise.length == 0 ) {
            res.status(422).json({ message: "Token não encontrado!"});
            return;
        }

        let dateNow = Date.now();

        let diff = dateNow - parseInt( enterprise.tokenCreatedAt );
        diff = diff / 1000;

        // User is just allowed to reset password between the first hour of
        // token creation
        if( diff > 3600 ) {
            res.status(422).json({ message: "Token expirado!"});
            return;
        }

        return res.status(200).json({message: "Token válido!"});
    }

    static async resetPassword(req: any, res: any) {
        const { password, passwordConfirmation, token } = req.body;
        console.log( token );

        let result = await rootModel.getEnterpriseByToken( token );
        console.log('id');
        console.log(result.id);
        let enterprise = await rootModel.getEnterpriseById( result.id );

        console.log( enterprise );
        // SENHA
        if( !password ) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }
        // Tamanho da senha
        if( password.length < 6 ) {
            res.status(422).json({ message: "A senha deve ter no mínimo 6 caracteres!" });
            return;
        }
        // Senha deve ser igual a sua confirmação
        if( password != passwordConfirmation ) {
            res.status(422).json({ message: "A confirmação de senha deve ser igual a senha!" });
            return;
        }

        // Transform password to hash password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        enterprise.password = passwordHash;
        enterprise.tokenResetPassword = '';
        enterprise.tokenCreatedAt = '';

        await rootModel.updateEnterprise( enterprise );
    }
}