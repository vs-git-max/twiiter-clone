import express from "express";
import signup from "../controllers/auth.signup.js";
import login from "../controllers/auth.login.js";
import logout from "../controllers/auth.logout.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
