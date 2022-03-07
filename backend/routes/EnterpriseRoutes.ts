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
router.post("/login", EnterpriseController.login);
router.get("/checkenterprise", EnterpriseController.checkEnterprise);
router.get("/ads/ad", EnterpriseController.getSpecificAd);
router.get("/ads", EnterpriseController.getAds);

//router.get("/services", EnterpriseController.services);
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
