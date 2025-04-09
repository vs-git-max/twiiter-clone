import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import getUserProfile from "../controllers/userContollers/getUserProfile.js";
import followUnfollowUser from "../controllers/userContollers/followUnfollowUser.js";
import getSuggestedUsers from "../controllers/userContollers/getSuggestedUsers.js";
import updateUserProfile from "../controllers/userContollers/updateUserProfile.js";
const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUserProfile);

export default router;
