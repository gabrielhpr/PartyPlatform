import express = require("express");
import cors = require("cors");
import { FRONTEND_NAME } from "./utils/frontendname";

const app = express();

// Config JSON response 
app.use(express.json());

// PRODUCTION
// https://dssgh3dia3p2z.cloudfront.net

// TEST
// http://localhost:3000

// Solve cors
app.use(cors({ 
    credentials: true, 
    origin: FRONTEND_NAME, 
    optionsSuccessStatus: 200,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// app.use(function (req:any, res:any, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://www.festafy.com.br');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// Public folder for images
//app.use(express.static("public"));

// Routes
const EnterpriseRoutes = require("./routes/EnterpriseRoutes");
app.use("/enterprise", EnterpriseRoutes);

const UserRoutes = require("./routes/UserRoutes");
app.use("/user", UserRoutes);

const RootRoutes = require("./routes/RootRoutes");
app.use("", RootRoutes);

//console.log('Ouvindo na porta 5000');

const PORT = process.env.PORT || 5000;
app.listen( PORT );