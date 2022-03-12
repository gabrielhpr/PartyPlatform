export {};
const connQuery = require('../db/conn');


interface userDataObjProps {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    partyType: string;
    partyDate: string;
    country: string;
    state: string;
    city: string;
}

module.exports = class UserModel {
   
    // Insert User
    async insertUser( dataObject: userDataObjProps ) {
        const { email } = dataObject;

        console.log('insertUser');
        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO User 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        // INSERT enterprise in table
        await connQuery( query_insert, data ).catch((err:any) => {throw err});
    
        // GET the user and return it
        const result = this.getUserByEmail( email );
        return result;
    }

    async getUserByEmail( email: string ) {
        const query_select = `SELECT * FROM User WHERE email = '${email}'`;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async getUserById( id: number ) {
        const query_select = `SELECT * FROM User WHERE id = ${id}`;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async updateUser( id: number, data: any ){
        const query_update = `
            UPDATE User
            SET fullName = '${data.fullName}',
                email = '${data.email}',
                phone = '${data.phone}',
                password = '${data.password}',
                partyType = '${data.partyType}',
                partyDate = '${data.partyDate}',
                city = '${data.city}',
                state = '${data.state}',
                country = '${data.country}'
            WHERE id = ${id}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});
    }

}
