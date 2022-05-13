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

        var query_select_ads= `SELECT 
                                   Ads.*,
                                   Ent.*
                               FROM Ads 
                               INNER JOIN Enterprise AS Ent 
                               ON Ads.enterpriseId = Ent.id    
                               WHERE Ads.enterpriseId = ?`;    
        
        var result_ads = await connQuery( query_select_ads, [enterpriseId] ).catch( (err:any) => {throw err});
       
        console.log('ads no model');
        console.log( result_ads );

        return result_ads;
    }

    async getAd( enterpriseId: number, partyType: string ) {
        console.log('entrou getAd');
        
        var query_select = `SELECT * FROM Ads 
                            WHERE enterpriseId = ?
                            AND partyMainFocus = ?
                           `;
    
        var result = await connQuery( query_select, [enterpriseId, partyType] ).catch( (err:any) => {throw err});
        console.log('saiu getAd');
        
        return result[0];
    }

    async getEnterpriseByEmail( email: string ) {
        const query_select = `SELECT * 
                              FROM Enterprise 
                              WHERE email = ?`;
            
        const result = await connQuery( query_select, [email] ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async getEnterpriseById( enterpriseId: number ) {
        const query_select = `SELECT * 
                              FROM Enterprise 
                              WHERE id = ?`;
            
        const result = await connQuery( query_select, [enterpriseId] ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async updateAd( adId:number, data: any ){
        let objKeys = Object.keys(data);

        let values = [
            data.serviceDescription,
            data.photos,
            data.q1,
            data.q2,
            data.q3,
            data.q4,
            data.q5,
            data.q6,
            data.q7,
            data.q8,
            data.q9,
            data.q10,
            data.q11,
            data.q12,
            data.q13,
            data.q14,
            data.q15,
            data.q16,
            data.q17,
            data.q18,
            data.q19,
            data.q20,
            data.q21,
            data.q22,
            data.q23,
            data.q24,
            data.q25,
            data.q26,
            data.q27,
            data.q28,
            data.q29,
            data.q30,
            data.q31,
            data.q32,
            data.q33,
            data.q34,
            data.q35,
            data.q36,
            data.q37,
            data.q38,
            data.q39,
            data.q40,
            data.q41,
            data.q42,
            data.q43,
            data.q44,
            data.q45,
            data.q46,
            data.q47,
            data.q48,
            data.q49,
            data.q50,
            data.adId
        ];

        const query_update = `
            UPDATE Ads
            SET serviceDescription = ?,
                photos = ?,
                q1 = ?,
                q2 = ?,
                q3 = ?,
                q4 = ?,
                q5 = ?,
                q6 = ?,
                q7 = ?,
                q8 = ?,
                q9 = ?,
                q10 = ?,
                q11 = ?,
                q12 = ?,
                q13 = ?,
                q14 = ?,
                q15 = ?,
                q16 = ?,
                q17 = ?,
                q18 = ?,
                q19 = ?,
                q20 = ?,
                q21 = ?,
                q22 = ?,
                q23 = ?,
                q24 = ?,
                q25 = ?,
                q26 = ?,
                q27 = ?,
                q28 = ?,
                q29 = ?,
                q30 = ?,
                q31 = ?,
                q32 = ?,
                q33 = ?,
                q34 = ?,
                q35 = ?,
                q36 = ?,
                q37 = ?,
                q38 = ?,
                q39 = ?,
                q40 = ?,
                q41 = ?,
                q42 = ?,
                q43 = ?,
                q44 = ?,
                q45 = ?,
                q46 = ?,
                q47 = ?,
                q48 = ?,
                q49 = ?,
                q50 = ?,
            WHERE id = ?
        `;

        await connQuery( query_update, values ).catch((err:any) => {throw err});
    }

    async updateEnterprise( enterpriseId: number, data: any ){

        let values = [
            data.fullName,
            data.email,
            data.phone,
            data.whatsapp,
            data.password,
            data.enterpriseName,
            data.location,
            data.country,
            data.state,
            data.city,
            data.address,
            data.addressNumber,
            data.instagram,
            data.facebook,
            data.website,
            data.tokenResetPassword,
            data.tokenCreatedAt,
            enterpriseId
        ];

        const query_update = `
            UPDATE Enterprise
            SET fullName = ?
                email = ?
                phone = ?
                whatsapp = ?
                password = ?
                enterpriseName = ?
                location = ?
                country = ?
                state = ?
                city = ?
                address = ?
                addressNumber = ?
                instagram = ?
                facebook = ?
                website = ?
                tokenResetPassword = ?,
                tokenCreatedAt = ?
            WHERE id = ?
        `;

        await connQuery( query_update, values ).catch((err:any) => {throw err});
    }

    async selectOpinionsByEnterpriseId( enterpriseId: number, partyType: string ) {
        const query_select = `
            SELECT  Ent.id,
                    User.fullName,
                    Rat.*,
                    RatAns.answerContent
            FROM Enterprise as Ent
            INNER JOIN Rating AS Rat ON Ent.id = Rat.enterpriseId 
            INNER JOIN User ON User.id = Rat.userId
            LEFT JOIN RatingAnswer AS RatAns ON Rat.id = RatAns.ratingId 
            WHERE Ent.id = ?
            AND Rat.partyType = ?
        `;
        
        const result = await connQuery( query_select, [enterpriseId, partyType] ).catch( (err:any) => {throw err} );
        
        return result; 
    }

    async insertAnswerRating( ratingAnswerData: any ) {
        console.log('insert answer rating');
        let objLength = Object.keys(ratingAnswerData).length;

        const query_insert = `INSERT INTO RatingAnswer 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(ratingAnswerData).concat( Object.values(ratingAnswerData) );

        // INSERT rating answer into table
        await connQuery( query_insert, data ).catch((err:any) => {throw err});
    }

    async selectNEmailsOrders( enterpriseId: number ) {
        const query_select = `
            SELECT  
                COUNT( id ) as quantity
            FROM BudgetEmails 
            WHERE enterpriseId = ?
            AND created_at > now() - INTERVAL 12 month
        `;
        
        const result = await connQuery( query_select, [enterpriseId] ).catch( (err:any) => {throw err} );
        
        return result[0]; 
    }

    async selectNReviews( enterpriseId: number ) {
        const query_select = `
            SELECT  
                COUNT( id ) as quantity
            FROM Rating 
            WHERE enterpriseId = ?
            AND created_at > now() - INTERVAL 12 month
        `;
        
        const result = await connQuery( query_select, [enterpriseId] ).catch( (err:any) => {throw err} );
        
        return result[0]; 
    }

    async getEnterpriseByToken( token: string ) {
        const query_select = `
            SELECT  Ent.id 
                    ,Ent.tokenCreatedAt 
            FROM Enterprise as Ent    
            WHERE Ent.tokenResetPassword = ?
        `;
        
        const result = await connQuery( query_select, [token] ).catch( (err:any) => {throw err});
        
        return result[0]; 
    }

}
