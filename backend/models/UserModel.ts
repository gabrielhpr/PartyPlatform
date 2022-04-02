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

interface ratingObjProps {
    userId: string;
    type: string;
    enterpriseId: string;
    partyType: string;
    partyDate: string; 
    opinionTitle: string;
    opinionContent: string;
    recommendToAFriend: string;
    recommendToAFriendObservation: string;
    ratingServiceQuality: number;
    ratingPrice: number;
    ratingAnswerTime: number;
    ratingFlexibility: number;
    ratingProfessionalism: number;
    ratingGeneral: number;
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

    async insertRating( ratingData: ratingObjProps ) {

        console.log('insert rating');
        let objLength = Object.keys(ratingData).length;

        const query_insert = `INSERT INTO Rating 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(ratingData).concat( Object.values(ratingData) );

        // INSERT rating in table
        await connQuery( query_insert, data ).catch((err:any) => {throw err});    
    }

    async insertEmail( emailData: any ) {
        console.log('insert email data');
        let objLength = Object.keys(emailData).length;

        const query_insert = `INSERT INTO BudgetEmails 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(emailData).concat( Object.values(emailData) );

        // INSERT email in table
        await connQuery( query_insert, data ).catch((err:any) => {throw err});    
    }

    async getAdRating( enterpriseId: number, partyType: string ) {
        console.log('entrou model getAdRating');
        const query_select = `
                             SELECT 
                                    id as adId,
                                    ratingQuantity,
                                    ratingSum 
                             FROM Ads 
                             WHERE enterpriseId = ${enterpriseId}
                             AND partyMainFocus = '${partyType}'
                            `;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});        

        return result[0];
    }

    async updateAdRating( adId: number, ratingQuantity: number, ratingSum: number ) {
        console.log('updateAdRating model');
        console.log(adId);
        
        console.log(ratingQuantity);
        console.log(ratingSum);
        
        
        
        const query_update = `
            UPDATE Ads
            SET ratingQuantity = '${ratingQuantity}',
                ratingSum = '${ratingSum}'
            WHERE id = ${adId}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});  
    }

    async getEntepriseEmail( enterpriseId: number ) {
        const query_select = `
                                SELECT email as enterpriseEmail
                                FROM Enterprise 
                                WHERE id = ${enterpriseId}
                             `;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }
}
