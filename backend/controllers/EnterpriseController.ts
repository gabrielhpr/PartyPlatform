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
            address,
            addressNumber,
            instagram,
            facebook,
            website,
            partyMainFocus,
            serviceDescription,
            enterpriseCategory,
            enterpriseSpecificCategory,
            answer1,
            answer2 
        } = req.body;
        
        // VALIDATIONS
        if( !fullName ) {
            res.status(422).json({ message: "O nome completo é obrigatório!"});
            return;
        }

        if( !email ) {
            res.status(422).json({ message: "O email é obrigatório!"});
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

        if( !country ) {
            res.status(422).json({ message: "O país é obrigatório!"});
            return;
        }

        if( !state ) {
            res.status(422).json({ message: "O estado é obrigatório!"});
            return;
        }

        if( !city ) {
            res.status(422).json({ message: "A cidade é obrigatória!"});
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
            'fullName': fullName,
            'email': email,
            'phone': phone,
            'whatsapp': whatsapp,
            'password': passwordHash,
            'enterpriseName': enterpriseName,
            'country': country,
            'state': state,
            'city': city,
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

        // Table to insert Ad
        const tableName = partyMainFocus;

        // Ad data
        const dataAd = { 
            'id': id,
            'partyMainFocus': partyMainFocus,
            'serviceDescription': serviceDescription,
            'photos': photosNameString,
            'answer1': answer1,
            'answer2': answer2
        }

        // Try to create ENTERPRISE AD
        try {
            await enterpriseModel.insertAd( tableName, dataAd );
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
            answer1, 
            answer2
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
        ad.answer1 = answer1;
        console.log('answer1');
        console.log(answer1);
        

        // if( !answer2 ) {
        //     res.status(422).json({ message: "A resposta da pergunta 2 é obrigatória!" });
        //     return;
        // }
        ad.answer2 = answer2;
        console.log('answer2');
        console.log(answer2);

        try {
            await enterpriseModel.updateAd(id, partyType, ad);
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
            answer1,
            answer2 
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
                
        // Table to insert Ad
        const tableName = partyMainFocus;

        // Ad data
        const dataAd = { 
            'id': id,
            'partyMainFocus': partyMainFocus,
            'serviceDescription': serviceDescription,
            'photos': photosNameString,
            'answer1': answer1,
            'answer2': answer2
        }

        // Try to create ENTERPRISE AD
        try {
            await enterpriseModel.insertAd( tableName, dataAd );
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

        enterpriseData = await enterpriseModel.getEnterpriseById(id);                
        
        res.status(200).json({ enterpriseData });
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
            country,
            state,
            city,
            address,
            addressNumber,
            instagram,
            facebook,
            website,
            enterpriseCategory,
            enterpriseSpecificCategory
        } = req.body;
        
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
        if( !password ) {
            res.status(422).json({ message: "A senha é obrigatória!" });
            return;
        }
        
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

        // ENTERPRISE NAME
        if( !enterpriseName ) {
            res.status(422).json({ message: "O nome da empresa é obrigatório!" });
            return;
        }
        enterpriseData.enterpriseName = enterpriseName;

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

}