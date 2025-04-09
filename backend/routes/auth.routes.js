import express from "express";
import signup from "../controllers/auth.signup.js";
import login from "../controllers/auth.login.js";
import logout from "../controllers/auth.logout.js";
import getMe from "../controllers/auth.getMe.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
