import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { nextTick } from "process";
const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimpClient = mailchimpFactory("rcUfsa5vVBpbmJlzbkjF0A");

const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const UserModel = require('../models/UserModel');
const userModel = new UserModel();

module.exports = class UserController {

    // Register
    static async register(req: any, res: any) {

        const {
            fullName,
            email,
            phone,
            whatsapp,
            accept,
            password,
            passwordConfirmation,
            location,
            city,
            state,
            country
        } = req.body;
        
        // EMAIL
        if( !email ) {
            res.status(422).json({ message: "O email é obrigatório!" });
            return;
        }

        let userEmail = await userModel.getUserByEmail( email );

        if( userEmail != undefined ) {
            res.status(422).json({ message: "Esse email já está em uso! Utilize outro email!" });
            return;
        }

        if( !accept || accept != 'true' ) {
            res.status(422).json({ message: "É necesário aceitar os termos de uso e de privacidade!" });
            return;
        }

        if( !password ) {
            res.status(422).json({ message: "A senha é obrigatória!"});
            return;
        }

        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert User
        const userData = {
            'accept': accept,
            'fullName': fullName,
            'email': email,
            'phone': phone,
            'whatsapp': whatsapp,
            'password': passwordHash,
            'location': location,
            'city': city,
            'state': state,
            'country': country
        }
        
        // Try to create USER
        let newUser;
        try {
            // Create User
            newUser = await userModel.insertUser( userData );
        }
        catch(err) {
            res.status(500).json({message: err});
            return;
        }
        
        // Try to create USER TOKEN
        try {
            // Create USER token
            await createUserToken(newUser, req, res);        
        }
        catch(err) {
            res.status(500).json({message: err});
            return;
        }
    }

    // Login
    static async login(req: any, res: any) {
        const { email, password } = req.body;

        console.log( req.body );

        if(!email) {
            res.status(422).json({ message: "O e-mail é obrigatório!"});
            return;
        }

        if(!password) {
            res.status(422).json({ message: "A senha é obrigatória!"});
            return;
        }

        // check if user exists
        const userExists = await userModel.getUserByEmail( email );

        if( !userExists ) {
            res.status(422).json({ message: "Não há usuário cadastrado com esse email" });
            return;
        }

        // check if password matches with db password
        const checkPassword = await bcrypt.compare(password, userExists.password);

        if( !checkPassword ) {
            res.status(422).json({ message: "Senha inválida" });
            return; 
        }

        await createUserToken(userExists, req, res);
    }
   
    // Get User
    static async getUser(req: any, res: any) {
        console.log('chegou getUser');
        let userData;
        let id;

        if(!req.headers.authorization) {
            return res.status(500).send({message: "Não possui token!"});
        }
        
        console.log('tem token');
        const token = getToken(req);

        jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
            if(err) {
                return res.status(500).send({message: "Token inválido!"});
            }
            id = decoded.id;
        });

        userData = await userModel.getUserById(id);                
        
        res.status(200).json({ userData });
    }

    // Update User data
    static async editUser(req: any, res:any) {
       
        var id;
        var userData;

        // Get request body
        const { 
            fullName,
            photo,
            email,
            phone,
            password,
            passwordConfirmation,
            partyType,
            partyDate,
            city,
            state,
            country
        } = req.body;
        
        // New User Photo
        var photoName;

        var newUserPhoto;
        if( req.files ) {
            newUserPhoto = req.files;
            console.log('New User Photo Filename');
            console.log(newUserPhoto.filename);
            
            photoName = newUserPhoto.filename;
        }

        if(!req.headers.authorization) {
            return res.status(500).send({message: "Não possui token!"});
        }
        console.log('tem token');

        // Token
        const token = getToken(req);

        jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
            if(err) {
                return res.status(500).send({message: "Token inválido!"});
            }
            id = decoded.id;
        });

        userData = await userModel.getUserById( id );      
        
        // VALIDATIONS

        // NOME COMPLETO
        if( !fullName ) {
            res.status(422).json({ message: "O nome completo é obrigatório!" });
            return;
        }
        userData.fullName = fullName;
        console.log(userData.fullName);
        
        // PHOTO
        if( photoName ) {
            userData.photo = photoName;
    
            console.log('Photo name');
            console.log(userData.photo);
        }

        // EMAIL
        if( !email ) {
            res.status(422).json({ message: "O email é obrigatório!" });
            return;
        }
        userData.email = email;
        console.log('Email');
        console.log(userData.email);
        
        // PHONE
        if( !phone ) {
            res.status(422).json({ message: "O telefone é obrigatório!" });
            return;
        }
        userData.phone = phone;
        console.log('Telefone');
        console.log(userData.phone);

        // SENHA
        if( !password ) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }
        
        // Transform password to hash password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        // Se a senha vinda do update é diferente da antiga, vamos 
        // atualizar a senha
        if( passwordHash != userData.password &&
             password != userData.password ) 
        {
            if( password.length < 6 ) {
                res.status(422).json({ message: "A senha deve ter no mínimo 6 caracteres!" });
                return;
            }
            if( password != passwordConfirmation ) {
                res.status(422).json({ message: "A confirmação de senha deve ser igual a senha!" });
                return;
            }
            userData.password = passwordHash;
        }

        // Tipo da Festa
        if( !partyType ) {
            res.status(422).json({ message: "O tipo da festa é obrigatório!" });
            return; 
        }
        userData.partyType = partyType;

        // Data da festa
        if( !partyDate ) {
            res.status(422).json({ message: "A data da festa é obrigatória!" });
            return; 
        }
        userData.partyDate = partyDate;

        // CIDADE
        if( !city ) {
            res.status(422).json({ message: "A cidade é obrigatória!" });
            return;
        }
        userData.city = city;

        // ESTADO
        if( !state ) {
            res.status(422).json({ message: "O estado é obrigatório!" });
            return;
        }
        userData.state = state;
        
        // PAÍS
        if( !country ) {
            res.status(422).json({ message: "O país é obrigatório!" });
            return;
        }
        userData.country = country;

        try {
            await userModel.updateUser( userData.id, userData );
            res.status(200).send('Atualizado com sucesso');
            console.log('update com sucesso');
        }
        catch (err) {
            res.status(500).json({message: err});
            return;
        }
    }

    // Check User
    static async checkUser(req: any, res: any) {
        let currentUser;

        if( req.headers.authorization ) {
            const token = getToken(req);
            jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
                if(err) {
                    return res.status(500).send({message: "Token inválido!"});
                }

                currentUser = await userModel.getUserById( decoded.id );
                currentUser.password = undefined;
            });
        }
        else {
            currentUser = null;
        }

        res.status(200).send(currentUser);
    }

    // Create user rating about the service
    static async rate(req: any, res: any) {
        
        console.log('entrou no rate');

        const {
            enterpriseId,
            partyType,
            partyDate, 
            opinionTitle,
            opinionContent,
            recommendToAFriend,
            recommendToAFriendObservation
        } = req.body;

        let {
            ratingServiceQuality,
            ratingPrice,
            ratingAnswerTime,
            ratingFlexibility,
            ratingProfessionalism
        } = req.body;

        ratingServiceQuality = parseInt( ratingServiceQuality );
        ratingPrice = parseInt( ratingPrice );
        ratingAnswerTime = parseInt( ratingAnswerTime );
        ratingFlexibility = parseInt( ratingFlexibility );
        ratingProfessionalism = parseInt( ratingProfessionalism );

        if(!req.headers.authorization) {
            return res.status(500).send({message: "Não possui token!"});
        }
        
        console.log('tem token');
        const token = getToken(req);

        let userId;
        jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
            if(err) {
                return res.status(500).send({message: "Token inválido!"});
            }
            userId = decoded.id;
        });

        // Validations
        if( !enterpriseId ) {
            res.status(422).json({ message: "É necessário ter o id da empresa que está sendo avaliada!"});
            return;
        }

        let ratingExists = await userModel.checkRatingExists(userId, enterpriseId, partyType, partyDate);

        console.log('O valor de rating exists in controller é: ');
        console.log(ratingExists);
        console.log( typeof(ratingExists) );

        if( ratingExists.length != 0 ) {
            res.status(422).json({ message: "Já existe uma avaliação sua para esse prestador de serviço para o tipo de festa e data inserida!"});
            return;
        }

        const ratingGeneral = (ratingServiceQuality + ratingPrice + ratingAnswerTime + ratingFlexibility + ratingProfessionalism) / 5;
        
        //console.log( ratingGeneral );

        const ratingData = {
            'userId': userId,
            'enterpriseId': enterpriseId,
            'partyType': partyType,
            'partyDate': partyDate, 
            'opinionTitle': opinionTitle,
            'opinionContent': opinionContent,
            'recommendToAFriend': recommendToAFriend,
            'recommendToAFriendObservation': recommendToAFriendObservation,
            'ratingServiceQuality': ratingServiceQuality,
            'ratingPrice': ratingPrice,
            'ratingAnswerTime': ratingAnswerTime,
            'ratingFlexibility': ratingFlexibility,
            'ratingProfessionalism': ratingProfessionalism,
            'ratingGeneral': ratingGeneral
        }

        try {
            // Create Rating
            await userModel.insertRating( ratingData );
            
            const { adId, ratingQuantity, ratingSum } = await userModel.getAdRating(enterpriseId, partyType);
            console.log('getAdRating');
            console.log( ratingQuantity, ratingSum );
            // Update Ad ratingQuantity and ratingSum
            await userModel.updateAdRating( adId, ratingQuantity + 1, ratingSum + ratingGeneral );

            res.status(200).send({message: 'Avaliação criada com sucesso!'});
        }
        catch(err) {
            res.status(500).json({message: err});
            return;
        }

    }

    static async sendEmail(req: any, res: any) {
        console.log('Entrou - Controller - sendEmail');
        const {
            enterpriseId,
            partyType,
            partyDate,
            messageContent
        } = req.body;

        let { nOfPeople } = req.body;
        nOfPeople = parseInt( nOfPeople );

        if(!req.headers.authorization) {
            return res.status(500).json({message: "Não possui token!"});
        }
        
        let userId;
        console.log('tem token');
        const token = getToken(req);

        jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
            if(err) {
                return res.status(500).json({message: "Token inválido!"});
            }
            userId = decoded.id;
        });

        let userData = await userModel.getUserById( userId );   

        const { enterpriseEmail } = await userModel.getEntepriseEmail( enterpriseId );

        console.log( 'enterpriseEmail' );
        console.log( enterpriseEmail );

        const emailData = {
            'type': 'budget',
            'userId': userData.id,
            'enterpriseId': enterpriseId,
            'partyType': partyType,
            'partyDate': partyDate,
            'nOfPeople': nOfPeople,
            'messageContent': messageContent
        }

        // Inserting email in table
        await userModel.insertEmail( emailData );

        // Sending the email using Mandril

        const run = async () => {
            const response = await mailchimpClient.messages.send({ message: 
                {
                    subject: '[Pedido de orçamento]',
                    text: `
                        Olá, tudo bem ? ${userData.fullName} 
                        enviou um pedido de orçamento para você! 
                        Sua festa será realizada no dia ${emailData.partyDate}
                        e é do tipo ${emailData.partyType}. 
                        Para entrar em contato com o cliente, utilize o 
                        email: ${userData.email} ou o telefone: 
                        ${userData.phone}.
                        A mensagem deixada por ele foi: 
                        ${emailData.messageContent}.
                    `,
                    from_email: 'festafy@festafy.com.br',
                    to: [ {email: enterpriseEmail, name: 'Fornecedor', type:'to'} ]
                } 
            });
            console.log(response);
        };

        run();

        return res.status(200).json({message: "Email enviado com sucesso!"});
    }
}