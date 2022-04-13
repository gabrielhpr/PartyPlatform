export {};
const connQuery = require('../db/conn');


interface enterpriseDataObjProps {
    fullName: string,
    email: string,
    phone: string,
    whatsapp: string,
    password: string,
    enterpriseName: string,
    country: string,
    state: string,
    city: string,
    address: string,
    addressNumber: string,
    instagram: string,
    facebook: string,
    website: string,
    enterpriseCategory: string,
    enterpriseSpecificCategory: string
}

module.exports = class EnterpriseModel {

    // Insert Enterprise
    async insertEnterprise( dataObject:enterpriseDataObjProps ) {
        const { email } = dataObject;

        console.log('insertEnterprise');
        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO Enterprise 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        // INSERT enterprise in table
        await connQuery( query_insert, data ).catch((err:any) => {throw err});
    
        // GET the enterprise and return it
        const result = this.getEnterpriseByEmail( email );
        return result;
    }

    // Insert Ad
    async insertAd( dataObject: Object ) {
        console.log('insertAd - Model');

        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO Ads 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        await connQuery( query_insert, data ).catch((err:any) => {throw err});

        return ;
    }

    async getAllAds( enterpriseId: number ) {

        var query_select_ads= `SELECT * FROM Ads WHERE enterpriseId = ${enterpriseId}`;    
        
        var result_ads = await connQuery( query_select_ads ).catch( (err:any) => {throw err});
       
        console.log('ads no model');
        console.log( result_ads );

        return result_ads;
    }

    async getAd( enterpriseId: number, partyType: string ) {
        console.log('entrou getAd');
        
        var query_select = `SELECT * FROM Ads 
                            WHERE enterpriseId = ${enterpriseId}
                            AND partyMainFocus = '${partyType}'
                           `;
    
        var result = await connQuery( query_select ).catch( (err:any) => {throw err});
        console.log('saiu getAd');
        
        return result[0];
    }

    async getEnterpriseByEmail( email: string ) {
        const query_select = `SELECT * FROM Enterprise WHERE email = '${email}'`;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async getEnterpriseById( enterpriseId: number ) {
        const query_select = `SELECT * FROM Enterprise WHERE id = ${enterpriseId}`;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async updateAd( adId:number, data: any ){
        let objKeys = Object.keys(data);

        const query_update = `
            UPDATE Ads
            SET serviceDescription = '${data.serviceDescription}',
                q1 = '${data.q1}',
                q2 = '${data.q2}',
                q3 = '${data.q3}',
                q4 = '${data.q4}',
                q5 = '${data.q5}',
                q6 = '${data.q6}',
                q7 = '${data.q7}',
                q8 = '${data.q8}',
                q9 = '${data.q9}',
                q10 = '${data.q10}',
                q11 = '${data.q11}',
                q12 = '${data.q12}',
                q13 = '${data.q13}',
                q14 = '${data.q14}',
                q15 = '${data.q15}',
                q16 = '${data.q16}',
                q17 = '${data.q17}',
                q18 = '${data.q18}',
                q19 = '${data.q19}',
                q20 = '${data.q20}',
                q21 = '${data.q21}',
                q22 = '${data.q22}',
                q23 = '${data.q23}',
                q24 = '${data.q24}',
                q25 = '${data.q25}',
                q26 = '${data.q26}',
                q27 = '${data.q27}',
                q28 = '${data.q28}',
                q29 = '${data.q29}',
                q30 = '${data.q30}',
                q31 = '${data.q31}',
                q32 = '${data.q32}',
                q33 = '${data.q33}',
                q34 = '${data.q34}',
                q35 = '${data.q35}',
                q36 = '${data.q36}',
                q37 = '${data.q37}',
                q38 = '${data.q38}',
                q39 = '${data.q39}',
                q40 = '${data.q40}',
                q41 = '${data.q41}',
                q42 = '${data.q42}',
                q43 = '${data.q43}',
                q44 = '${data.q44}',
                q45 = '${data.q45}',
                q46 = '${data.q46}',
                q47 = '${data.q47}',
                q48 = '${data.q48}',
                q49 = '${data.q49}',
                q50 = '${data.q50}'
            WHERE id = ${adId}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});
    
    }

    async updateEnterprise( enterpriseId: number, data: any ){
        const query_update = `
            UPDATE Enterprise
            SET fullName = '${data.fullName}',
                email = '${data.email}',
                phone = '${data.phone}',
                whatsapp = '${data.whatsapp}',
                password = '${data.password}',
                enterpriseName = '${data.enterpriseName}',
                location = '${data.location}',
                country = '${data.country}',
                state = '${data.state}',
                city = '${data.city}',
                address = '${data.address}',
                addressNumber = '${data.addressNumber}',
                instagram = '${data.instagram}',
                facebook = '${data.facebook}',
                website = '${data.website}'
            WHERE id = ${enterpriseId}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});
    }

}
