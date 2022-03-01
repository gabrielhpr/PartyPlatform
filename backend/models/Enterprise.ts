export {};
const connQuery = require('../db/conn');


module.exports = class EnterpriseModel {
   

    // Insert Enterprise
    async insertEnterprise( dataObject:Object ) {
        console.log('insertEnterprise');
        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO Enterprise 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        await connQuery( query_insert, data ).catch((err:any) => {throw err});
    }

    // Insert Ad
    async insertAd( tableName: string, dataObject: Object ) {
        console.log('insertAd');

        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO ${tableName+'Ads'} 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        await connQuery( query_insert, data ).catch((err:any) => {throw err});

        return ;
    }

    async getEnterpriseId( email: string, res: any ) {
        console.log(email);
        
        const query_select = `SELECT id FROM Enterprise WHERE email = '${email}'`;
    
        console.log( query_select );
        
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result;
        
    }

    update() {
        console.log('update');
    }
}
