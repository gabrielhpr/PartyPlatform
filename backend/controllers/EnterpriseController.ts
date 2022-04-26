import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { nextTick } from "process";
const createEnterpriseToken = require('../helpers/create-enterprise-token');
const getToken = require('../helpers/get-token');
const EnterpriseModel = require('../models/EnterpriseModel');
const enterpriseModel = new EnterpriseModel();

module.exports = class EnterpriseController {

    // Register
    static async register(req: any, res: any) {

        const {
            plan,
            fullName,
            email,
            phone,
            whatsapp,
            password,
            passwordConfirmation,
            enterpriseName,
            country,
            state,
            city,
            location,
            address,
            addressNumber,
            instagram,
            facebook,
            website,
            partyMainFocus,
            serviceDescription,
            enterpriseCategory,
            enterpriseSpecificCategory,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,
            q10,
            q11,
            q12,
            q13,
            q14,
            q15,
            q16,
            q17,
            q18,
            q19,
            q20,
            q21,
            q22,
            q23,
            q24,
            q25,
            q26,
            q27,
            q28,
            q29,
            q30,
            q31,
            q32,
            q33,
            q34,
            q35,
            q36,
            q37,
            q38,
            q39,
            q40,
            q41,
            q42,
            q43,
            q44,
            q45,
            q46,
            q47,
            q48,
            q49,
            q50
        } = req.body;
        
        //console.log(req.body);

        // VALIDATIONS
        if( !fullName ) {
            res.status(422).json({ message: "O nome completo é obrigatório!"});
            return;
        }

        if( !email ) {
            res.status(422).json({ message: "O email é obrigatório!"});
            return;
        }
        // Check if the email is already registered in database
        let entEmail = await enterpriseModel.getEnterpriseByEmail( email );

        if( entEmail != undefined ) {
            res.status(422).json({ message: "Esse email já está em uso! Utilize outro email!" });
            return;
        }

        if( !phone ) {
            res.status(422).json({ message: "O telefone é obrigatório!"});
            return;
        }

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
        
        if( !enterpriseName ) {
            res.status(422).json({ message: "O nome da empresa é obrigatório!"});
            return;
        }

        if( !city ) {
            res.status(422).json({ message: "A cidade é obrigatória!"});
            return;
        }

        if( !state ) {
            res.status(422).json({ message: "O estado é obrigatório!"});
            return;
        }

        if( !country ) {
            res.status(422).json({ message: "O país é obrigatório!"});
            return;
        }

        if( !location ) {
            res.status(422).json({ message: "A localização é obrigatória!"});
            return;
        }

        if( !address ) {
            res.status(422).json({ message: "O endereço é obrigatório!"});
            return;
        }

        if( !addressNumber ) {
            res.status(422).json({ message: "O número de endereço é obrigatório!"});
            return;
        }

        if( !partyMainFocus ) {
            res.status(422).json({ message: "O campo: principal tipo de festa é obrigatório!"});
            return;
        }

        if( !serviceDescription ) {
            res.status(422).json({ message: "A descrição do serviço é obrigatória!"});
            return;
        }

        if( !enterpriseCategory ) {
            res.status(422).json({ message: "A categoria da empresa é obrigatória!"});
            return;
        }

        if( !enterpriseSpecificCategory ) {
            res.status(422).json({ message: "A categoria específica da empresa é obrigatória!"});
            return;
        }

        // Insert Enterprise
        const dataEnterprise = {
            'plan': plan,
            'fullName': fullName,
            'email': email,
            'phone': phone,
            'whatsapp': whatsapp,
            'password': passwordHash,
            'enterpriseName': enterpriseName,
            'country': country,
            'state': state,
            'city': city,
            'location': location,
            'address': address,
            'addressNumber': addressNumber,
            'instagram': instagram,
            'facebook': facebook,
            'website': website,
            'enterpriseCategory': enterpriseCategory,
            'enterpriseSpecificCategory': enterpriseSpecificCategory
        }
        
        // Photos
        const photos = req.files;

        let photosName: string[] = [];
        photos.map((photo: any) => {
            photosName.push( photo.filename );
        });
        let photosNameString = photosName.toString();

        // Try to create ENTERPRISE USER
        let newEnterprise;
        try {
            // Create Enterprise user
            newEnterprise = await enterpriseModel.insertEnterprise( dataEnterprise );
        }
        catch(err) {
            res.status(500).json({message: err});
            return;
        }
        
        // Enterprise Id
        const id = newEnterprise.id;


        // Ad data
        const dataAd = { 
            'enterpriseId': id,
            'partyMainFocus': partyMainFocus,
            'serviceDescription': serviceDescription,
            'photos': photosNameString,
            'q1': q1,
            'q2': q2,
            'q3': q3,
            'q4': q4,
            'q5': q5,
            'q6': q6,
            'q7': q7,
            'q8': q8,
            'q9': q9,
            'q10': q10,
            'q11': q11,
            'q12': q12,
            'q13': q13,
            'q14': q14,
            'q15': q15,
            'q16': q16,
            'q17': q17,
            'q18': q18,
            'q19': q19,
            'q20': q20,
            'q21': q21,
            'q22': q22,
            'q23': q23,
            'q24': q24,
            'q25': q25,
            'q26': q26,
            'q27': q27,
            'q28': q28,
            'q29': q29,
            'q30': q30,
            'q31': q31,
            'q32': q32,
            'q33': q33,
            'q34': q34,
            'q35': q35,
            'q36': q36,
            'q37': q37,
            'q38': q38,
            'q39': q39,
            'q40': q40,
            'q41': q41,
            'q42': q42,
            'q43': q43,
            'q44': q44,
            'q45': q45,
            'q46': q46,
            'q47': q47,
            'q48': q48,
            'q49': q49,
            'q50': q50
        }

        // Try to create ENTERPRISE AD
        try {
            await enterpriseModel.insertAd( dataAd );
        }
        catch (err) {
            res.status(500).json({message: err});
            return;
        }

        // Try to create ENTERPRISE TOKEN
        try {
            // Create Enterprise token
            await createEnterpriseToken(newEnterprise, req, res);        
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
        const enterpriseExists = await enterpriseModel.getEnterpriseByEmail( email );

        if( !enterpriseExists ) {
            res.status(422).json({ message: "Não há empresa cadastrada com esse email" });
            return;
        }

        // check if password matches with db password
        const checkPassword = await bcrypt.compare(password, enterpriseExists.password);

        if( !checkPassword ) {
            res.status(422).json({ message: "Senha inválida" });
            return; 
        }

        await createEnterpriseToken(enterpriseExists, req, res);
    }

    // Get Enterprise Ads
    static async getAds(req: any, res: any) {
        console.log('chegou getAds');
        let ads;
        let id;

        if(req.headers.authorization) {
            console.log('tem token');
            const token = getToken(req);
            jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
                if(err) {
                    return res.status(500).send({message: "Token inválido!"});
                }
                id = decoded.id;
            });
            ads = await enterpriseModel.getAllAds(id);                
        }
        
        res.status(200).json({ ads });
    }

    // Get Enterprise Specific Ad (Infantil, Debutante, ...)
    static async getSpecificAd(req: any, res: any) {
        console.log('chegou getSpecific Ad');
        let ad;
        let id;
        const partyType = req.params.partyType;
        
        console.log('req.query: ');
        console.log( req.params );

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
        ad = await enterpriseModel.getAd(id, partyType); 
        console.log('saiu do get Ad');
        console.log(ad);
        
                                
        res.status(200).json({ ad });
    }

    // Update Ad
    static async editAd(req: any, res: any) {

        // Get request params
        const partyType = req.params.partyType;
        console.log('partyType: ');
        console.log(partyType);
        
        var id;
        var ad;

        // Get request body
        const { 
            serviceDescription, 
            photos,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,
            q10,
            q11,
            q12,
            q13,
            q14,
            q15,
            q16,
            q17,
            q18,
            q19,
            q20,
            q21,
            q22,
            q23,
            q24,
            q25,
            q26,
            q27,
            q28,
            q29,
            q30,
            q31,
            q32,
            q33,
            q34,
            q35,
            q36,
            q37,
            q38,
            q39,
            q40,
            q41,
            q42,
            q43,
            q44,
            q45,
            q46,
            q47,
            q48,
            q49,
            q50
        } = req.body;
        
        console.log('serviceDescription');
        console.log(serviceDescription);
        

        var allPhotos;

        // New Photos
        const newPhotos = req.files;
        let newPhotosName: string[] = [];
        newPhotos.map((photo: any) => {
            newPhotosName.push( photo.filename );
        });

        // Gather editted photos and new photos
        allPhotos = photos + ',' + newPhotosName.toString();


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

        ad = await enterpriseModel.getAd(id, partyType);      
        
        
        // Validations
        if( !serviceDescription ) {
            res.status(422).json({ message: "A descrição do serviço é obrigatória!" });
            return;
        }
        ad.serviceDescription = serviceDescription;
        console.log(ad.serviceDescription);
        
        // Photos
        ad.photos = allPhotos;

        console.log('photos');
        console.log(ad.photos);
        
        
        // if( !answer1 ) {
        //     res.status(422).json({ message: "A resposta da pergunta 1 é obrigatória!" });
        //     return;
        // }
        ad.q1 = q1;
        ad.q2 = q2;
        ad.q3 = q3;
        ad.q4 = q4;
        ad.q5 = q5;
        ad.q6 = q6;
        ad.q7 = q7;
        ad.q8 = q8;
        ad.q9 = q9;
        ad.q10 = q10;
        ad.q11 = q11;
        ad.q12 = q12;
        ad.q13 = q13;
        ad.q14 = q14;
        ad.q15 = q15;
        ad.q16 = q16;
        ad.q17 = q17;
        ad.q18 = q18;
        ad.q19 = q19;
        ad.q20 = q20;
        ad.q21 = q21;
        ad.q22 = q22;
        ad.q23 = q23;
        ad.q24 = q24;
        ad.q25 = q25;
        ad.q26 = q26;
        ad.q27 = q27;
        ad.q28 = q28;
        ad.q29 = q29;
        ad.q30 = q30;
        ad.q31 = q31;
        ad.q32 = q32;
        ad.q33 = q33;
        ad.q34 = q34;
        ad.q35 = q35;
        ad.q36 = q36;
        ad.q37 = q37;
        ad.q38 = q38;
        ad.q39 = q39;
        ad.q40 = q40;
        ad.q41 = q41;
        ad.q42 = q42;
        ad.q43 = q43;
        ad.q44 = q44;
        ad.q45 = q45;
        ad.q46 = q46;
        ad.q47 = q47;
        ad.q48 = q48;
        ad.q49 = q49;
        ad.q50 = q50;

        try {
            await enterpriseModel.updateAd(ad.id, ad);
            res.status(200).send('Atualizado com sucesso');
            console.log('update com sucesso');
        }
        catch (err) {
            res.status(500).json({message: err});
            return;
        }
    }

    // Create Ad
    static async createAd(req: any, res: any) {
        var id;

        const {
            partyMainFocus,
            serviceDescription,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,
            q10,
            q11,
            q12,
            q13,
            q14,
            q15,
            q16,
            q17,
            q18,
            q19,
            q20,
            q21,
            q22,
            q23,
            q24,
            q25,
            q26,
            q27,
            q28,
            q29,
            q30,
            q31,
            q32,
            q33,
            q34,
            q35,
            q36,
            q37,
            q38,
            q39,
            q40,
            q41,
            q42,
            q43,
            q44,
            q45,
            q46,
            q47,
            q48,
            q49,
            q50
        } = req.body;
                
        // Photos
        const photos = req.files;

        let photosName: string[] = [];
        photos.map((photo: any) => {
            photosName.push( photo.filename );
        });
        let photosNameString = photosName.toString();

        if(!req.headers.authorization) {
            return res.status(500).send({message: "Não possui token!"});
        }

        const token = getToken(req);
        jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
            if(err) {
                return res.status(500).send({message: "Token inválido!"});
            }
            id = decoded.id;
        });
                
        
        // Ad data
        const dataAd = { 
            'enterpriseId': id,
            'partyMainFocus': partyMainFocus,
            'serviceDescription': serviceDescription,
            'photos': photosNameString,
            'q1': q1,
            'q2': q2,
            'q3': q3,
            'q4': q4,
            'q5': q5,
            'q6': q6,
            'q7': q7,
            'q8': q8,
            'q9': q9,
            'q10': q10,
            'q11': q11,
            'q12': q12,
            'q13': q13,
            'q14': q14,
            'q15': q15,
            'q16': q16,
            'q17': q17,
            'q18': q18,
            'q19': q19,
            'q20': q20,
            'q21': q21,
            'q22': q22,
            'q23': q23,
            'q24': q24,
            'q25': q25,
            'q26': q26,
            'q27': q27,
            'q28': q28,
            'q29': q29,
            'q30': q30,
            'q31': q31,
            'q32': q32,
            'q33': q33,
            'q34': q34,
            'q35': q35,
            'q36': q36,
            'q37': q37,
            'q38': q38,
            'q39': q39,
            'q40': q40,
            'q41': q41,
            'q42': q42,
            'q43': q43,
            'q44': q44,
            'q45': q45,
            'q46': q46,
            'q47': q47,
            'q48': q48,
            'q49': q49,
            'q50': q50
        }

        // Try to create ENTERPRISE AD
        try {
            await enterpriseModel.insertAd( dataAd );
            res.status(200).send('Anúncio inserido com sucesso!');
        }
        catch (err) {
            res.status(500).json({message: err});
            return;
        }
    }

    // Get Enterprise
    static async getEnterprise(req: any, res: any) {
        console.log('chegou getEnterprise');
        let enterpriseData;
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

        enterpriseData = await enterpriseModel.getEnterpriseById( id );                
        enterpriseData.password = '';

        res.status(200).json({ enterpriseData });
    }

    static async getOpinions(req: any, res: any) {
        console.log('chegou getOpinions');
        let opinions;
        let id;
        let partyType = req.query.partyType;

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

        opinions = await enterpriseModel.selectOpinionsByEnterpriseId( id, partyType );                

        res.status(200).json({ opinions });
    }

    static async answerRating(req: any, res: any) {
        console.log('entrou no answerRating');

        const {
            ratingId,
            userId,
            enterpriseId,
            partyType,
            answerContent
        } = req.body;

        if(!req.headers.authorization) {
            return res.status(500).send({message: "Não possui token!"});
        }
        
        console.log('tem token');
        const token = getToken(req);

        let enterpriseIdByToken;
        jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
            if(err) {
                return res.status(500).send({message: "Token inválido!"});
            }
            enterpriseIdByToken = decoded.id;
        });

        // Validations
        // if( !enterpriseId ) {
        //     res.status(422).json({ message: "É necessário ter o id da empresa que está sendo avaliada!"});
        //     return;
        // }

        //console.log( ratingGeneral );

        const ratingAnswerData = {
            'ratingId': ratingId,
            'userId': userId,
            'enterpriseId': enterpriseId,
            'partyType': partyType,
            'answerContent': answerContent
        }

        try {
            // Create Rating
            await enterpriseModel.insertAnswerRating( ratingAnswerData );
            res.status(200).send({message: 'Resposta de avaliação criada com sucesso!'});
        }
        catch(err) {
            res.status(500).json({message: err});
            return;
        }
    }

    // Update Enterprise data
    static async editEnterprise(req: any, res:any) {
       
        var id;
        var enterpriseData;

        // Get request body
        const { 
            fullName,
            email,
            phone,
            whatsapp,
            password,
            passwordConfirmation,
            enterpriseName,
            location,
            country,
            state,
            city,
            address,
            addressNumber,
            instagram,
            facebook,
            website
        } = req.body;
        
        
        console.log('entrou no edit enterprise');
        console.log(location);
        // New Enterprise Photo
        var photoName;

        var newEnterprisePhoto;
        if( req.files ) {
            newEnterprisePhoto = req.files;
            console.log('New Enterprise Photo Filename');
            console.log(newEnterprisePhoto.filename);
            
            photoName = newEnterprisePhoto.filename;
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

        enterpriseData = await enterpriseModel.getEnterpriseById( id );      
        
        
        // VALIDATIONS

        // NOME COMPLETO
        if( !fullName ) {
            res.status(422).json({ message: "O nome completo é obrigatório!" });
            return;
        }
        enterpriseData.fullName = fullName;
        console.log(enterpriseData.fullName);
        
        // PHOTO
        if( photoName ) {
            enterpriseData.photo = photoName;
    
            console.log('Photo name');
            console.log(enterpriseData.photo);
        }

        // EMAIL
        if( !email ) {
            res.status(422).json({ message: "O email é obrigatório!" });
            return;
        }
        // Check if the email is already registered in database
        let entEmail = await enterpriseModel.getEnterpriseByEmail( email );

        if( entEmail != undefined ) {
            res.status(422).json({ message: "Esse email já está em uso! Utilize outro email!" });
            return;
        }
        enterpriseData.email = email;
        console.log('Email');
        console.log(enterpriseData.email);
        
        // PHONE
        if( !phone ) {
            res.status(422).json({ message: "O telefone é obrigatório!" });
            return;
        }
        enterpriseData.phone = phone;
        console.log('Telefone');
        console.log(enterpriseData.phone);
        
        // WHATSAPP
        enterpriseData.whatsapp = whatsapp;
        console.log('Whatsapp');
        console.log(enterpriseData.whatsapp);

        // SENHA
        if( password != '' ) {
            // Transform password to hash password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            
            // Se a senha vinda do update é diferente da antiga, vamos 
            // atualizar a senha
            if( passwordHash != enterpriseData.password &&
                 password != enterpriseData.password ) 
            {
                if( password.length < 6 ) {
                    res.status(422).json({ message: "A senha deve ter no mínimo 6 caracteres!" });
                    return;
                }
                if( password != passwordConfirmation ) {
                    res.status(422).json({ message: "A confirmação de senha deve ser igual a senha!" });
                    return;
                }
                enterpriseData.password = passwordHash;
            }
        }
        

        // ENTERPRISE NAME
        if( !enterpriseName ) {
            res.status(422).json({ message: "O nome da empresa é obrigatório!" });
            return;
        }
        enterpriseData.enterpriseName = enterpriseName;

        // LOCATION
        enterpriseData.location = location;

        // PAÍS
        if( !country ) {
            res.status(422).json({ message: "O país é obrigatório!" });
            return;
        }
        enterpriseData.country = country;

        // ESTADO
        if( !state ) {
            res.status(422).json({ message: "O estado é obrigatório!" });
            return;
        }
        enterpriseData.state = state;

        // CIDADE
        if( !city ) {
            res.status(422).json({ message: "A cidade é obrigatória!" });
            return;
        }
        enterpriseData.city = city;

        // ENDEREÇO
        if( !address ) {
            res.status(422).json({ message: "O endereço é obrigatório!" });
            return;
        }
        enterpriseData.address = address;

        // NÚMERO DO ENDEREÇO
        if( !addressNumber ) {
            res.status(422).json({ message: "O número do endereço é obrigatório!" });
            return;
        }
        enterpriseData.addressNumber = addressNumber;

        // INSTAGRAM
        enterpriseData.instagram = instagram;

        // FACEBOOK
        enterpriseData.facebook = facebook;

        // WEBSITE
        enterpriseData.website = website;

        try {
            await enterpriseModel.updateEnterprise( enterpriseData.id, enterpriseData );
            res.status(200).send('Atualizado com sucesso');
            console.log('update com sucesso');
        }
        catch (err) {
            res.status(500).json({message: err});
            return;
        }
    }

    // Check Enterprise
    static async checkEnterprise(req: any, res: any) {
        let currentEnterprise;

        if(req.headers.authorization) {
            const token = getToken(req);
            jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
                if(err) {
                    return res.status(500).send({message: "Token inválido!"});
                }

                currentEnterprise = await enterpriseModel.getEnterpriseById( decoded.id );
                currentEnterprise.password = undefined;
            });
        }
        else {
            currentEnterprise = null;
        }

        res.status(200).send(currentEnterprise);
    }

    // Get Google Analytics Data
    static async getGoogleAnalyticsData(req: any, res: any) {
        let id:number;

        if(req.headers.authorization) {
            const token = getToken(req);
            jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
                if(err) {
                    return res.status(500).send({message: "Token inválido!"});
                }
                id = decoded.id;
            });
        }
        console.log('o id é: ');
        console.log( id );

        // Before running the sample:
        // - Enable the API at:
        //   https://console.developers.google.com/apis/api/analyticsdata.googleapis.com
        // - Login into gcloud by running:
        //   `$ gcloud auth application-default login`
        // - Install the npm module by running:
        //   `$ npm install googleapis`
        const { google } = require('googleapis');

        const analyticsdata = google.analyticsdata('v1beta');
        
        const service_account = require('../jwt/key.json');

        async function main() {

            //const auth = new google.auth.GoogleAuth({
                // Scopes can be specified either as an array or as a single, space-delimited string.
            //});
            //https://www.googleapis.com/auth/analytics
            let scopes = ['https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly'];

            const jwt = new google.auth.JWT(
                service_account.client_email, 
                null, 
                service_account.private_key, 
                scopes
            );
            // Acquire an auth client, and bind it to all future calls
            //const authClient = await auth.getClient();
            //google.options({auth: authClient});

            await jwt.authorize();
            //const authClient = ;
            google.options({auth: jwt});

            // Do the magic
            const result = await analyticsdata.properties.batchRunReports({
                //headers: {'Content-Type': 'application/json'}, 
                //auth: jwt, 
                // A Google Analytics GA4 property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). This property must be specified for the batch. The property within RunPivotReportRequest may either be unspecified or consistent with this property. Example: properties/1234
                property: 'properties/311158295',
                
                //'resource': reports
                // Request body metadata
                requests: [
                    // Number of visualizations
                    {
                        'property': 'properties/311158295',
                        'dateRanges': [
                            {'startDate': '2022-03-01', 'endDate': '2022-04-19'}
                        ],
                        'metrics': [
                            {"name": "uniiquePageViews", 'expression': 'screenPageViews'}
                        ],
                        'dimensions': [
                            {"name": 'pagePath'}
                        ],
                        'dimensionFilter': 
                            {
                                'filter': 
                                    {
                                        'fieldName': 'pagePath',
                                        'stringFilter': {
                                            'matchType': 'EXACT',
                                            'value': `enterprise-${id}`,
                                            'caseSensitive': true
                                        }
                                    }
                            }
                    },
                    // Clicks in show PHONE
                    {
                        'property': 'properties/311158295',
                        'dateRanges': [
                            {'startDate': '2022-03-01', 'endDate': '2022-04-19'}
                        ],
                        'metrics': [
                            {"name": "uniiquePageViews", 'expression': 'screenPageViews'}
                        ],
                        'dimensions': [
                            {"name": 'pagePath'}
                        ],
                        'dimensionFilter': 
                            {
                                'filter': 
                                    {
                                        'fieldName': 'pagePath',
                                        'stringFilter': {
                                            'matchType': 'EXACT',
                                            'value': `enterprise-${id}`,
                                            'caseSensitive': true
                                        }
                                    }
                            }
                    },
                    // Clicks in show Whatsapp if exists
                    {
                        'property': 'properties/311158295',
                        'dateRanges': [
                            {'startDate': '2022-03-01', 'endDate': '2022-04-19'}
                        ],
                        'metrics': [
                            {"name": "uniiquePageViews", 'expression': 'screenPageViews'}
                        ],
                        'dimensions': [
                            {"name": 'pagePath'}
                        ],
                        'dimensionFilter': 
                            {
                                'filter': 
                                    {
                                        'fieldName': 'pagePath',
                                        'stringFilter': {
                                            'matchType': 'EXACT',
                                            'value': `enterprise-${id}`,
                                            'caseSensitive': true
                                        }
                                    }
                            }
                    },
                    // Clicks in show E-mail
                    {
                        'property': 'properties/311158295',
                        'dateRanges': [
                            {'startDate': '2022-03-01', 'endDate': '2022-04-19'}
                        ],
                        'metrics': [
                            {"name": "uniiquePageViews", 'expression': 'screenPageViews'}
                        ],
                        'dimensions': [
                            {"name": 'pagePath'}
                        ],
                        'dimensionFilter': 
                            {
                                'filter': 
                                    {
                                        'fieldName': 'pagePath',
                                        'stringFilter': {
                                            'matchType': 'EXACT',
                                            'value': `enterprise-${id}`,
                                            'caseSensitive': true
                                        }
                                    }
                            }
                    },

                ],
            });
            console.log(result);
            res.status(200).send( result );

            // Example response
          // {
          //   "kind": "my_kind",
          //   "pivotReports": []
          // }
        }
        
        await main().catch(e => {
            console.log('error');
            console.error(e);
            throw e;
        });

        

    }

}