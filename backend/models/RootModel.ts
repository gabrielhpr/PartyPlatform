export {};
const connQuery = require('../db/conn');


module.exports = class RootModel {

    async selectServices(partyType: string, serviceCategory: string, serviceSpecificCategory: string, city: string, state: string, country: string, priceObj: {price: string, lowerPrice:string, upperPrice: string, priceColumn:string}, nOfPeopleObj: {nOfPeople: string, minPeople: string, maxPeople: string, minPeopleColumn: string, maxPeopleColumn: string}) {
        const { price, lowerPrice, upperPrice, priceColumn } = priceObj;
        const { nOfPeople, minPeople, maxPeople, minPeopleColumn, maxPeopleColumn } = nOfPeopleObj;
        console.log('model - price');
        console.log(price);

        let query_select = `
            SELECT Ads.*,
                   Ent.*
            FROM Ads 
            INNER JOIN Enterprise AS Ent 
            ON Ads.enterpriseId = Ent.id            
            WHERE Ent.enterpriseCategory = '${serviceCategory}' 
        `;

        // Party Type
        if( partyType != undefined && partyType != '' ) {
            query_select = query_select + ` AND Ads.partyMainFocus = '${partyType}' `;
        }
        // Service Specific Category
        if( serviceSpecificCategory != undefined && serviceSpecificCategory != '' ) {
            query_select = query_select + ` AND Ent.enterpriseSpecificCategory = '${serviceSpecificCategory}' `;
        }
        /*--- LOCATION --*/
        // City
        if( city != undefined && city != '' ) {
            query_select = query_select + ` AND Ent.city = '${city}' `;
        }
        // State
        if( state != undefined && state != '' ) {
            query_select = query_select + ` AND Ent.state = '${state}' `;
        }
        // Country
        if( country != undefined && country != '' ) {
            query_select = query_select + ` AND Ent.country = '${country}' `;
        }
        
        // Number of People
        if( nOfPeople != undefined && nOfPeople != '-1' && nOfPeople.length > 0 && nOfPeople != '' ) {
            if( serviceCategory == 'Espaco' && minPeopleColumn == '' ) {
                query_select = query_select + ` AND 
                                                ( 
                                                (Ads.q3 = 'Sim' AND ( ${minPeople} >= Ads.q6 AND ${maxPeople} <= Ads.q7 ) ) 
                                                OR 
                                                (Ads.q3 = 'Não' AND (${minPeople} >= Ads.q22 AND ${maxPeople} <= Ads.23) ) 
                                                ) 
                                            `;
            }
            else {
                query_select = query_select + `AND ( ${minPeople} >= ${minPeopleColumn} AND Ads.${maxPeople} <= ${maxPeopleColumn} ) `;
            }
        }        

        // Price
        if( price != undefined && price != '-1' && price.length > 0 && price != '' ) {
            if( serviceCategory == 'Espaco' ) {
                // Buffet included
                if( priceColumn == 'q5' ) {
                    query_select = query_select + ` AND Ads.q3 = 'Sim' `;
                }
                // Buffet not included
                else {
                    query_select = query_select + ` AND Ads.q3 = 'Não' `;
                }
            }
            query_select = query_select + ` AND Ads.${priceColumn} BETWEEN ${lowerPrice} AND ${upperPrice} `
        }

        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result; 
    }

    async getEspacoIsBuffet() {

    }


    async selectServiceById( enterpriseId: number, partyType: string ) {
        
        const query_select = `
            SELECT Ent.*,
                   Ads.*
            FROM Enterprise as Ent
            INNER JOIN Ads ON Ent.id = Ads.enterpriseId
            WHERE Ent.id = ${enterpriseId}
            AND Ads.partyMainFocus = '${partyType}'
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result; 
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
            WHERE Ent.id = ${enterpriseId}
            AND Rat.partyType = '${partyType}'
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result; 
    }

    async getEnterpriseByEmail( email: string ) {
        const query_select = `
            SELECT  Ent.*
            FROM Enterprise as Ent    
            WHERE Ent.email = '${email}'
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0]; 
    }
    async getEnterpriseById( id: number ) {
        const query_select = `
            SELECT  Ent.*
            FROM Enterprise as Ent    
            WHERE Ent.id = ${id}
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0]; 
    }

    async updateEnterprise( data: any ) {
        console.log('insert enterprise - Model');

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
                website = '${data.website}',
                tokenResetPassword = '${data.tokenResetPassword}',
                tokenCreatedAt = '${data.tokenCreatedAt}'
            WHERE id = ${data.id}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});
    }

    async getEnterpriseByToken( token: string ) {
        const query_select = `
            SELECT  Ent.id 
                    ,Ent.tokenCreatedAt 
            FROM Enterprise as Ent    
            WHERE Ent.tokenResetPassword = '${token}'
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0]; 
    }
}
   
