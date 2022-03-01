const RootModel = require('../models/RootModel');
const rootModel = new RootModel();


module.exports = class RootController {

    static async getServices(req: any, res: any) {
        console.log('getServices');
        console.log( req.query);
        
        const { partyType, service, location } = req.query;

        const services = await rootModel.selectServices(partyType, service, location);
        
        console.log( services );
        res.status(200).json({ services });
    }
}