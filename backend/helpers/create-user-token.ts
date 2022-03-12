import jwt = require("jsonwebtoken");

const createUserToken = async(user:any, req:any, res:any) => {
    
    // create a token
    const token = jwt.sign({
        name: user.fullName,
        id: user.id,
    }, "XXmncStwYptNz2DWXFvqbRTzEXWGjr");

    // return token
    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: user.id,
    })
}

module.exports = createUserToken;