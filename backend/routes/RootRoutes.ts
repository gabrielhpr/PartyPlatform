export {};
const router = require("express").Router();
const RootController = require("../controllers/RootController");

// middleware
////const verifyToken = require("../helpers/verify-token");
//const { imageUpload } = require("../helpers/image-upload");

router.get("/services", RootController.getServices);
router.get("/serviceProfile", RootController.getServiceById);

router.get("/checkResetPasswordValidityEnterprise", RootController.checkResetPasswordValidityEnterprise);
router.post("/sendEmailResetPasswordEnterprise", RootController.sendEmailResetPasswordEnterprise);
router.patch("/resetPasswordEnterprise", RootController.resetPasswordEnterprise);

router.get("/checkResetPasswordValidityUser", RootController.checkResetPasswordValidityUser);
router.post("/sendEmailResetPasswordUser", RootController.sendEmailResetPasswordUser);
router.patch("/resetPasswordUser", RootController.resetPasswordUser);
router.get("/", function(req: any, res: any) {
    res.status(200).json({ message: "Success" });
} );
//partyType='.+'&service='.+'&location='.+'
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
