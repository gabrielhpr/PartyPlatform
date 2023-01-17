import jwt = require("jsonwebtoken");

const createEnterpriseToken = async(enterprise:any, req:any, res:any) => {
    
    // create a token
    const token = jwt.sign({
        name: enterprise.enterpriseName,
        id: enterprise.id,
    }, "");

    // return token
    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        enterpriseId: enterprise.id,
    })
}

module.exports = createEnterpriseToken;