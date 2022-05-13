export {};
const connQuery = require('../db/conn');


module.exports = class RootModel {

    async selectServices(partyType: string, serviceCategory: string, serviceSpecificCategory: string, city: string, state: string, country: string, priceObj: {price: string, lowerPrice:string, upperPrice: string, priceColumn:string}, nOfPeopleObj: {nOfPeople: string, minPeople: string, maxPeople: string, minPeopleColumn: string, maxPeopleColumn: string}) {
        const { price, lowerPrice, upperPrice, priceColumn } = priceObj;
        const { nOfPeople, minPeople, maxPeople, minPeopleColumn, maxPeopleColumn } = nOfPeopleObj;
        console.log('model - price');
        console.log(price);

        let values:any = [];

        let query_select = `
            SELECT Ads.*,
                   Ent.enterpriseName,
                   Ent.location,
                   Ent.enterpriseCategory,
                   Ent.enterpriseSpecificCategory
            FROM Ads 
            INNER JOIN Enterprise AS Ent 
            ON Ads.enterpriseId = Ent.id            
            WHERE Ent.enterpriseCategory = ?
        `;
        values.push( ...[serviceCategory] );

        // Party Type
        if( partyType != undefined && partyType != '' ) {
            query_select = query_select + ` AND Ads.partyMainFocus = ? `;
            values.push( ...[partyType] );
        }
        // Service Specific Category
        if( serviceSpecificCategory != undefined && serviceSpecificCategory != '' ) {
            query_select = query_select + ` AND Ent.enterpriseSpecificCategory = ? `;
            values.push( ...[serviceSpecificCategory] );
        }
        /*--- LOCATION --*/
        // City
        if( city != undefined && city != '' ) {
            query_select = query_select + ` AND Ent.city = ? `;
            values.push( ...[city] );
        }
        // State
        if( state != undefined && state != '' ) {
            query_select = query_select + ` AND Ent.state = ? `;
            values.push( ...[state] );
        }
        // Country
        if( country != undefined && country != '' ) {
            query_select = query_select + ` AND Ent.country = ? `;
            values.push( ...[country] );
        }
        
        // Number of People
        if( nOfPeople != undefined && nOfPeople != '-1' && nOfPeople.length > 0 && nOfPeople != '' ) {
            if( serviceCategory == 'Espaco' && minPeopleColumn == '' ) {
                query_select = query_select + ` AND 
                                                ( 
                                                (Ads.q3 = 'Sim' AND ( ? >= Ads.q6 AND ? <= Ads.q7 ) ) 
                                                OR 
                                                (Ads.q3 = 'Não' AND ( ? >= Ads.q22 AND ? <= Ads.23 ) ) 
                                                ) 
                                            `;
                values.push(...[minPeople, maxPeople, minPeople, maxPeople]);
            }
            else {
                query_select = query_select + `AND ( ? >= ?? AND ? <= ?? ) `;
                values.push(...[minPeople, minPeopleColumn, maxPeople, maxPeopleColumn]);
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
            query_select = query_select + ` AND ?? BETWEEN ? AND ? `;
            values.push(...[priceColumn, lowerPrice, upperPrice]);
        }

        const result = await connQuery( query_select, values ).catch( (err:any) => {throw err});
        
        return result; 
    }

    async selectServiceById( enterpriseId: number, partyType: string ) {
        
        const query_select = `
            SELECT Ent.id,
                   Ent.fullName,
                   Ent.email,
                   Ent.phone,
                   Ent.whatsapp,
                   Ent.enterpriseName,
                   Ent.country,
                   Ent.state,
                   Ent.city,
                   Ent.location,
                   Ent.address,
                   Ent.addressNumber,
                   Ent.instagram,
                   Ent.facebook,
                   Ent.website,
                   Ent.enterpriseCategory,
                   Ent.enterpriseSpecificCategory,
                   Ads.*
            FROM Enterprise as Ent
            INNER JOIN Ads ON Ent.id = Ads.enterpriseId
            WHERE Ent.id = ?
            AND Ads.partyMainFocus = ?
        `;
        
        const result = await connQuery( query_select, [enterpriseId, partyType] ).catch( (err:any) => {throw err});
        
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
            WHERE Ent.id = ?
            AND Rat.partyType = ?
            ORDER BY Rat.partyDate DESC
        `;
        
        const result = await connQuery( query_select, [enterpriseId, partyType] ).catch( (err:any) => {throw err});
        
        return result; 
    }

}
   
