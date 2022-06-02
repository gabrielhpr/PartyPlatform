const RootModel = require('../models/RootModel');
const rootModel = new RootModel();


const EnterpriseModel = require('../models/EnterpriseModel');
const enterpriseModel = new EnterpriseModel();

const UserModel = require('../models/UserModel');
const userModel = new UserModel();


const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimpClient = mailchimpFactory("rcUfsa5vVBpbmJlzbkjF0A");
import bcrypt = require("bcrypt");
import { getAllImages } from "../helpers/get-images-aws";
import { BUCKET_NAME } from "../utils/bucketname";
import { FRONTEND_NAME } from "../utils/frontendname";

module.exports = class RootController {

    static async getServices(req: any, res: any) {
        var aws = require("aws-sdk");
        aws.config.update({region: 'us-east-1'});
        var s3 = new aws.S3({ 
            apiVersion: 'latest',
        });
        
        //console.log('getServices');
        //console.log( req.query);
        
        const { partyType, serviceCategory, serviceSpecificCategory, city, state, country, price, buffetIncluded, nOfPeople } = req.query;
        //console.log( partyType, serviceCategory, serviceSpecificCategory, city, state, country, price, buffetIncluded, nOfPeople );

        if( !serviceCategory ) {
            res.status(422).json({ message: "A categoria do serviço é obrigatória!"});
            return;
        }

        // Number of People
        //console.log('Number of people: ');
        //console.log( nOfPeople );
        
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
        //console.log( 'price: ' );
        //console.log( price );
        //console.log(typeof(price));
        

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

        let services = await rootModel.selectServices(partyType, serviceCategory, serviceSpecificCategory, city, state, country, {price: price, lowerPrice: lowerPrice, upperPrice: upperPrice, priceColumn: priceColumn }, {nOfPeople: nOfPeople, minPeople: minPeople, maxPeople: maxPeople, minPeopleColumn: minPeopleColumn, maxPeopleColumn: maxPeopleColumn} );
        
        for(let i=0; i < services.length; i++) {
            services[i].photos = await getAllImages( s3, BUCKET_NAME, services[i].photos );
        }

        //console.log( services );
        res.status(200).json({ services });
    }

    static async getServiceById(req: any, res: any) {
        var aws = require("aws-sdk");
        aws.config.update({region: 'us-east-1'});
        var s3 = new aws.S3({ 
            apiVersion: 'latest',
        });

        //console.log( req.query);
        
        const { id, partyType } = req.query;
        //console.log( id );
        //console.log( partyType );
        

        let service = await rootModel.selectServiceById(parseInt(id), partyType);
        service.photos = await getAllImages( s3, BUCKET_NAME, service.photos );

        const opinions = await rootModel.selectOpinionsByEnterpriseId(parseInt(id), partyType);

        //console.log( service );
        res.status(200).json({ service: service, opinions: opinions });
    }

    // ENTERPRISE
    static async sendEmailResetPasswordEnterprise(req: any, res: any) {
        const { email } = req.body;

        if( !email ) {
            res.status(422).json({ message: "O e-mail é obrigatório!"});
            return;
        }

        // Check if email exists
        let enterprise = await enterpriseModel.getEnterpriseByEmail( email );
        //console.log('enterpriseId é: ');
        //console.log( enterprise );

        if( enterprise.length == 0 ) {
            res.status(422).json({ message: "E-mail não cadastrado!"});
            return;
        }

        let randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let token = randomToken(64); 
        //console.log('o token é');
        //console.log( token );

        enterprise.tokenResetPassword = token;
        enterprise.tokenCreatedAt = Date.now().toString();

        await enterpriseModel.updateEnterprise( enterprise.id, enterprise );

        // Sending the email using Mandril
        const run = async () => {
            const response = await mailchimpClient.messages.sendTemplate({ 
                template_name: 'RecoveryPassword',
                template_content: [{}], 
                message: 
                {
                    subject: '[Redefinição de senha] - Festafy - Portal de Festas',
                    merge_vars: [
                        {
                            rcpt: enterprise.email,
                            vars: [
                                {name: 'NAME', content: `${enterprise.enterpriseName}`},
                                {name: 'LINKRECOVER', content: `${FRONTEND_NAME}/Enterprise/Auth/resetPassword?token=${enterprise.tokenResetPassword}`}                                
                            ]
                        }
                    ],
                    from_email: 'festafy@festafy.com.br',
                    to: [ {email: enterprise.email, name: `${enterprise.enterpriseName}`, type:'to'} ]
                } 
            });
            //console.log(response);
        };

        run();

        return res.status(200).json({message: "Email enviado com sucesso!"});
    }

    static async checkResetPasswordValidityEnterprise(req: any, res: any) {
        const { token } = req.query;

        if( token == undefined ) {
            res.status(422).json({ message: "Token não encontrado!"});
            return;
        }

        let enterprise = await enterpriseModel.getEnterpriseByToken( token );
        //console.log( enterprise );

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

    static async resetPasswordEnterprise(req: any, res: any) {
        const { password, passwordConfirmation, token } = req.body;
        //console.log( token );

        let result = await enterpriseModel.getEnterpriseByToken( token );
        //console.log('id');
        if( result.length == 0 ) {
            res.status(422).json({ message: "Token inválido ou expirado" });
            return;
        }
        //console.log(result.id);
        let enterprise = await enterpriseModel.getEnterpriseById( result.id );

        //console.log( enterprise );
        // SENHA
        if( !password ) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }
        // Tamanho da senha
        if( password.length < 8 ) {
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

        await enterpriseModel.updateEnterprise( enterprise.id, enterprise );
        res.status(200).json({message: "Senha alterada com sucesso!"});
    }

    // USER
    static async sendEmailResetPasswordUser(req: any, res: any) {
        const { email } = req.body;

        if( !email ) {
            res.status(422).json({ message: "O e-mail é obrigatório!"});
            return;
        }
        // Check if email exists
        let user = await userModel.getUserByEmail( email );
        //console.log('userId é: ');
        //console.log( user );
        ////console.log( user.id );

        if( user.length == 0 ) {
            //console.log('user undefined');
            res.status(422).json({ message: "E-mail não cadastrado!"});
            return;
        }

        let randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        let token = randomToken(64); 
        //console.log('o token é');
        //console.log( token );

        user.tokenResetPassword = token;
        user.tokenCreatedAt = Date.now().toString();

        await userModel.updateUser( user.id, user );

        // Sending the email using Mandril
        const run = async () => {
            const response = await mailchimpClient.messages.sendTemplate({ 
                template_name: 'RecoveryPassword',
                template_content: [{}], 
                message: 
                {
                    subject: '[Redefinição de senha] - Festafy - Portal de Festas',
                    merge_vars: [
                        {
                            rcpt: user.email,
                            vars: [
                                {name: 'NAME', content: `${user.fullName}`},                                
                                {name: 'LINKRECOVER', content: `${FRONTEND_NAME}/User/Auth/resetPassword?token=${user.tokenResetPassword}`}                                
                            ]
                        }
                    ],
                    from_email: 'festafy@festafy.com.br',
                    to: [ {email: user.email, name: `${user.fullName}`, type:'to'} ]
                } 
            });
            //console.log(response);
        };

        run();

        return res.status(200).json({message: "Email enviado com sucesso!"});
    }

    static async checkResetPasswordValidityUser(req: any, res: any) {
        const { token } = req.query;

        if( token == undefined ) {
            res.status(422).json({ message: "Token não encontrado!"});
            return;
        }

        let user = await userModel.getUserByToken( token );
        //console.log( user );

        if( user.length == 0 ) {
            res.status(422).json({ message: "Token não encontrado!"});
            return;
        }

        let dateNow = Date.now();

        let diff = dateNow - parseInt( user.tokenCreatedAt );
        diff = diff / 1000;

        // User is just allowed to reset password between the first hour of
        // token creation
        if( diff > 3600 ) {
            res.status(422).json({ message: "Token expirado!"});
            return;
        }

        return res.status(200).json({message: "Token válido!"});
    }

    static async resetPasswordUser(req: any, res: any) {
        const { password, passwordConfirmation, token } = req.body;
        //console.log( token );

        let result = await userModel.getUserByToken( token );
        //console.log('id');

        if( result.length == 0 ) {
            res.status(422).json({ message: "Token expirado ou inválido!" });
            return;
        }

        let user = await userModel.getUserById( result.id );

        //console.log( user );
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

        user.password = passwordHash;
        user.tokenResetPassword = '';
        user.tokenCreatedAt = '';

        await userModel.updateUser( user.id, user );

        res.status(200).json({message: "Senha alterada com sucesso!"});
    }
}