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
app.use(cors({ credentials: true, origin: FRONTEND_NAME }));

// Public folder for images
//app.use(express.static("public"));

// Routes
const EnterpriseRoutes = require("./routes/EnterpriseRoutes");
app.use("/enterprise", EnterpriseRoutes);

const UserRoutes = require("./routes/UserRoutes");
app.use("/user", UserRoutes);

const RootRoutes = require("./routes/RootRoutes");
app.use("", RootRoutes);

console.log('Ouvindo na porta 5000');

const PORT = process.env.PORT || 5000;
app.listen( PORT );