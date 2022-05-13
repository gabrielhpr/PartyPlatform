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
        const query_select = `SELECT * 
                              FROM User 
                              WHERE email = ?`;
            
        const result = await connQuery( query_select, [email] ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async getUserById( id: number ) {
        const query_select = `SELECT * 
                              FROM User 
                              WHERE id = ?`;
            
        const result = await connQuery( query_select, [id] ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async updateUser( id: number, data: any ){
        let values = [
            data.fullName,
            data.email,
            data.phone,
            data.password,
            data.city,
            data.state,
            data.country,
            data.tokenResetPassword,
            data.tokenCreatedAt,
            id
        ];

        const query_update = `
            UPDATE User
            SET fullName = ?,
                email = ?,
                phone = ?,
                password = ?,
                city = ?,
                state = ?,
                country = ?,
                tokenResetPassword = ?,
                tokenCreatedAt = ?
            WHERE id = ?
        `;

        await connQuery( query_update, values ).catch((err:any) => {throw err});
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

    async checkRatingExists( userId: number, enterpriseId: number, partyType: string, partyDate: string) {
        console.log('entrou no checkRatingExists');
        
        const query_select = `
            SELECT  Ent.id,
                    User.fullName,
                    Rat.*,
                    RatAns.answerContent
            FROM Enterprise as Ent
            INNER JOIN Rating AS Rat ON Ent.id = Rat.enterpriseId 
            INNER JOIN User ON User.id = Rat.userId
            LEFT JOIN RatingAnswer AS RatAns ON Rat.id = RatAns.ratingId 
            WHERE User.id = ?
            AND Ent.id = ?
            AND Rat.partyType = ?
            AND Rat.partyDate = ?
        `;
        
        const result = await connQuery( query_select, [userId, enterpriseId, partyType, partyDate] ).catch( (err:any) => {throw err} );
        
        return result; 
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
                             WHERE enterpriseId = ?
                             AND partyMainFocus = ?
                            `;
            
        const result = await connQuery( query_select, [enterpriseId, partyType] ).catch( (err:any) => {throw err});        

        return result[0];
    }

    async updateAdRating( adId: number, ratingQuantity: number, ratingSum: number ) {
        console.log('updateAdRating model');
        console.log(adId);
        
        console.log(ratingQuantity);
        console.log(ratingSum);
                
        const query_update = `
            UPDATE Ads
            SET ratingQuantity = ?,
                ratingSum = ?
            WHERE id = ?
        `;

        await connQuery( query_update, [ratingQuantity, ratingSum, adId] ).catch((err:any) => {throw err});  
    }

    async getEntepriseEmail( enterpriseId: number ) {
        const query_select = `
                                SELECT email as enterpriseEmail
                                FROM Enterprise 
                                WHERE id = ?
                             `;
            
        const result = await connQuery( query_select, [enterpriseId] ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async getUserByToken( token: string ) {
        const query_select = `
            SELECT  id 
                    ,tokenCreatedAt 
            FROM User
            WHERE tokenResetPassword = ?
        `;
        
        const result = await connQuery( query_select, [token] ).catch( (err:any) => {throw err});
        
        return result[0]; 
    }
}
