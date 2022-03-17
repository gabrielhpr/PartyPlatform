export {};
const connQuery = require('../db/conn');


module.exports = class RootModel {

    async selectServices(partyType: string, service: string, city: string, state: string, country: string) {
        
        const query_select = `
            SELECT Ads.*,
                   Ent.*
            FROM Ads 
            INNER JOIN Enterprise AS Ent 
            ON Ads.enterpriseId = Ent.id
            WHERE Ent.enterpriseSpecificCategory = '${service}'
            AND Ads.partyMainFocus = '${partyType}' 
            AND Ent.city = '${city}'
            AND Ent.state = '${state}'
            AND Ent.country = '${country}'
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result; 
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
   
