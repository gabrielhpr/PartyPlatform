import express = require("express");
import cors = require("cors");

const app = express();

// Config JSON response 
app.use(express.json());

// Solve cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folder for images
app.use(express.static("public"));

// Routes
const EnterpriseRoutes = require("./routes/EnterpriseRoutes");
app.use("/enterprise", EnterpriseRoutes);

// const UserRoutes = require("./routes/UserRoutes");
// app.use("/user", UserRoutes);

const RootRoutes = require("./routes/RootRoutes");
app.use("", RootRoutes);

console.log('Ouvindo na porta 5000');
app.listen(5000);