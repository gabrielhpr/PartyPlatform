export {};
const connQuery = require('../db/conn');


module.exports = class RootModel {

    async selectServices(partyType: string, service: string, location:string) {
        
        const query_select = `
            SELECT Ads.*,
                   Ent.*
            FROM ${partyType+'Ads'} AS Ads
            INNER JOIN Enterprise AS Ent 
            ON Ads.id = Ent.id
            WHERE Ent.enterpriseSpecificCategory = '${service}' 
            AND Ent.city = '${location}'
        `;
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result; 
    }

}
   
