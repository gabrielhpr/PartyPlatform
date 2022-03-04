export {};
const router = require("express").Router();
const EnterpriseController = require("../controllers/EnterpriseController");

// middleware
const { imageUpload } = require("../helpers/image-upload");
////const verifyToken = require("../helpers/verify-token");

router.post(
    "/register", 
    imageUpload.array('photos'), 
    EnterpriseController.register
);
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