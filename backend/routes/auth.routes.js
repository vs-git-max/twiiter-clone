import express from "express";
import signup from "../controllers/authContollers/auth.signup.js";
import login from "../controllers/authContollers/auth.login.js";
import logout from "../controllers/authContollers/auth.logout.js";
import getMe from "../controllers/authContollers/auth.getMe.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
