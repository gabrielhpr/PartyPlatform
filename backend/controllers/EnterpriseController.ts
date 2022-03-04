const EnterpriseModel = require('../models/Enterprise');
const enterpriseModel = new EnterpriseModel();


module.exports = class EnterpriseController {

    static async register(req: any, res: any) {
        console.log('register');
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
        
        // Insert Enterprise
        const dataEnterprise = {
            'fullName': fullName,
            'email': email,
            'phone': phone,
            'whatsapp': whatsapp,
            'password': password,
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

        console.log(req.body);
        console.log( 'photos: ' );
        console.log( photos );

        let photosName: string[] = [];
        photos.map((photo: any) => {
            photosName.push( photo.filename );
        });
        let photosNameString = photosName.toString();

        console.log('photosnamestring');
        console.log(photosNameString);

        await enterpriseModel.insertEnterprise( dataEnterprise );
        
        // Get Enterprise Id
        const result = await enterpriseModel.getEnterpriseId( email );
        const id = result[0]['id'];

        console.log('enterprise id: ');
        console.log(result[0]['id']);

        //Insert Ad
        const tableName = partyMainFocus;

        const dataAd = { 
            'id': id,
            'partyMainFocus': partyMainFocus,
            'serviceDescription': serviceDescription,
            'photos': photosNameString,
            'answer1': answer1,
            'answer2': answer2
        }
        await enterpriseModel.insertAd( tableName, dataAd );

        res.status(200).json({ message: "Deu bom!" });
    }


}