const express = require("express");
const router = express.Router();

const adminCtr = require("../controller/Cadmin");
const { checkAdmin } = require("../admin/utils");

router.get("/", adminCtr.toLogin);
router.get("/adminPage", checkAdmin, adminCtr.toAdmin);
router.get("/adminUser", checkAdmin, adminCtr.toUser);
router.get("/adminRoom", checkAdmin, adminCtr.toRoom);
router.get("/adminShop", checkAdmin, adminCtr.toShop);
router.get("/adminSuggestion", checkAdmin, adminCtr.toSug);

router.post("/login", adminCtr.adminLogin);
router.get("/logout", checkAdmin, adminCtr.adminLogout);

router.delete("/deleteUser/:userId", checkAdmin, adminCtr.deleteUser);
router.patch("/patchUserNick", checkAdmin, adminCtr.patchUserNick);
router.patch("/patchUserPenal", checkAdmin, adminCtr.patchUserPenal);
router.patch("/resetPw", checkAdmin, adminCtr.resetPw);

router.delete("/deleteRoom/:roomId", checkAdmin, adminCtr.deleteRoom);

router.patch("/checkSug", adminCtr.checkSug);

module.exports = router;
