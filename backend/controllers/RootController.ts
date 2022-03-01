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

    static async getServiceById(req: any, res: any) {
        console.log( req.query);
        
        const { id, partyType } = req.query;

        const service = await rootModel.selectServiceById(parseInt(id), partyType);
        
        console.log( service );
        res.status(200).json({ service });
    }
}