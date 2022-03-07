import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import { nextTick } from "process";
const createEnterpriseToken = require('../helpers/create-enterprise-token');
const getToken = require('../helpers/get-token');
const EnterpriseModel = require('../models/Enterprise');
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
        
        // Create a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

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

    // checkUser
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

    static async getSpecificAd(req: any, res: any) {
        console.log('chegou getSpecific Ad');
        let ad;
        let id;
        const { partyType } = req.query;
        
        console.log('req.query: ');
        console.log( req.query );

        if(req.headers.authorization) {
            console.log('tem token');
            const token = getToken(req);
            jwt.verify(token, "XXmncStwYptNz2DWXFvqbRTzEXWGjr", async function(err: any, decoded:any) {
                if(err) {
                    return res.status(500).send({message: "Token inválido!"});
                }
                id = decoded.id;
            });
            ad = await enterpriseModel.getAd(id, partyType);                
        }
        
        res.status(200).json({ ad });
    }
}