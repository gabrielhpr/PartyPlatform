export {};
const router = require("express").Router();
const EnterpriseController = require("../controllers/EnterpriseController");

// middleware
const { upload } = require("../helpers/image-upload");
const verifyToken = require("../helpers/verify-token");

// POST
router.post(
    "/register", 
    upload.array('photos'), 
    EnterpriseController.register
);
router.post("/login", EnterpriseController.login);
router.post(
    "/ads/create",
    upload.array('photos'),
    EnterpriseController.createAd
);
router.post("/answerRating", EnterpriseController.answerRating);

// PATCH
router.patch(
    "/ads/edit/:partyType",
    verifyToken, 
    upload.array('photosNew'), 
    EnterpriseController.editAd
);
router.patch(
    "/myenterprise/edit",
    verifyToken, 
    EnterpriseController.editEnterprise
);

// GET
router.get("/checkenterprise", EnterpriseController.checkEnterprise);
router.get("/ads/:partyType", EnterpriseController.getSpecificAd);
router.get("/ads", EnterpriseController.getAds);
router.get("/opinions", EnterpriseController.getOpinions);
router.get("/myenterprise", EnterpriseController.getEnterprise);
router.get("/getGoogleAnalyticsData", EnterpriseController.getGoogleAnalyticsData);
router.get("/getStatistics", EnterpriseController.getStatistics);

//router.get("/services", EnterpriseController.services);
//router.get("/:id", UserController.getUserById);
/*
*/

module.exports = router;
