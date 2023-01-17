import jwt = require("jsonwebtoken");
const getToken = require("./get-token");

// Middleware to validate token
const checkToken = (req:any, res:any, next:any) => {

    if( !req.headers.authorization ) {
        return res.status(401).json({message: "Acesso negado!"});
    }

    const token = getToken(req);

    if( !token ) {
        return res.status(401).json({message: "Acesso negado!"});
    }

    try {
        const verified = jwt.verify(token, "");
        req.enterprise = verified;
        next();
    }
    catch {
        return res.status(400).json({message: "Token inválido!"});
    }
}

module.exports = checkToken;
