const RootModel = require('../models/RootModel');
const rootModel = new RootModel();


module.exports = class RootController {

    static async getServices(req: any, res: any) {
        console.log('getServices');
        console.log( req.query);
        
        const { partyType, serviceCategory, serviceSpecificCategory, city, state, country, price, buffetIncluded, nOfPeople } = req.query;
        console.log( partyType, serviceCategory, serviceSpecificCategory, city, state, country, price, buffetIncluded, nOfPeople );

        // Number of People
        console.log('Number of people: ');
        console.log( nOfPeople );
        
        let minPeopleColumn, maxPeopleColumn;
        let minPeople, maxPeople;
        if( nOfPeople != undefined && nOfPeople != '-1' && nOfPeople.length > 0) {
            minPeople = nOfPeople.split('-')[0];
            maxPeople = nOfPeople.split('-')[1];

            if( serviceCategory == 'Servico') {
                if( serviceSpecificCategory == 'Buffet' 
                    || serviceSpecificCategory == 'Bolos'
                    || serviceSpecificCategory == 'Decoracao'
                ) 
                {
                    minPeopleColumn = 'q2';
                    maxPeopleColumn = 'q3';
                }
            }
            else if( serviceCategory == 'Espaco' ) {                    
                if( buffetIncluded == true ) {
                    minPeopleColumn = 'q6';
                    maxPeopleColumn = 'q7';
                }
                else if( buffetIncluded == false ) {
                    minPeopleColumn = 'q22';
                    maxPeopleColumn = 'q23';
                }
                else {
                    minPeopleColumn = maxPeopleColumn = '';
                }
            }

        }
        
        // Price Filter
        console.log( 'price: ' );
        console.log( price );
        console.log(typeof(price));
        

        let lowerPrice, upperPrice, priceColumn;
        if( price != undefined && price != '-1' && price.length > 0) {
            lowerPrice = price.split('-')[0];
            upperPrice = price.split('-')[1];

            if( serviceCategory == 'Espaco') {
                // Com Buffet
                if( buffetIncluded == true ) {
                    priceColumn = 'q5';
                }
                // Sem Buffet
                else {
                    priceColumn = 'q21';
                }
            }
            // For services
            else {
                priceColumn = 'q1';
            }
        }

        const services = await rootModel.selectServices(partyType, serviceCategory, serviceSpecificCategory, city, state, country, {price: price, lowerPrice: lowerPrice, upperPrice: upperPrice, priceColumn: priceColumn }, {nOfPeople: nOfPeople, minPeople: minPeople, maxPeople: maxPeople, minPeopleColumn: minPeopleColumn, maxPeopleColumn: maxPeopleColumn} );
        
        console.log( services );
        res.status(200).json({ services });
    }

    static async getServiceById(req: any, res: any) {
        console.log( req.query);
        
        const { id, partyType } = req.query;

        const service = await rootModel.selectServiceById(parseInt(id), partyType);
        
        const opinions = await rootModel.selectOpinionsByEnterpriseId(parseInt(id), partyType);

        console.log( service );
        res.status(200).json({ service: service, opinions: opinions });
    }
    
}