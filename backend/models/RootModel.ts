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
            WHERE Ads.partyMainFocus = '${partyType}' 
            AND Ent.city = '${city}'
            AND Ent.state = '${state}'
            AND Ent.country = '${country}'
            AND Ent.enterpriseSpecificCategory = '${serviceSpecificCategory}'
        `;
        
        // Number of People
        if( nOfPeople != undefined && nOfPeople != '-1' && nOfPeople.length > 0) {
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
        if( price != undefined && price != '-1' && price.length > 0) {
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
            SELECT Ads.*,
                   Ent.*
            FROM Ads
            INNER JOIN Enterprise AS Ent 
            ON Ads.enterpriseId = Ent.id
            WHERE Ent.id = ${enterpriseId}
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result; 
    }

}
   
