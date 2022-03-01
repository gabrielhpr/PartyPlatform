export {};
const router = require("express").Router();
const UserController = require("../controllers/EnterpriseController");

// middleware
////const verifyToken = require("../helpers/verify-token");
//const { imageUpload } = require("../helpers/image-upload");

//router.get("/services/:", UserController.getServices);
//router.get("/services", EnterpriseController.services);
//router.post("/login", UserController.login);
//router.get("/checkuser", UserController.checkUser);
//router.get("/:id", UserController.getUserById);
/*
router.patch(
    "/edit/:id",
    verifyToken, 
    imageUpload.single("image"), 
    UserController.editUser
);
*/

module.exports = router;
