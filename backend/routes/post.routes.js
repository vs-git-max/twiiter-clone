import express from "express";
const router = express.Router();

import protectRoute from "../middleware/protectRoute.js";
import createPost from "../controllers/postControllers/createPost.js";
import deletePost from "../controllers/postControllers/deletePost.js";
import commentOnPost from "../controllers/postControllers/commentOnPost.js";
import likeUnlikePost from "../controllers/postControllers/likeUnlikePost.js";
import getAllPosts from "../controllers/postControllers/getAllPosts.js";
import getLikedPosts from "../controllers/postControllers/getLikedPosts.js";
import getFollowingPost from "../controllers/postControllers/getFollowingPost.js";
import getUserPost from "../controllers/postControllers/getUserPost.js";

router.get("/all", protectRoute, getAllPosts);
router.get("/user/:username", protectRoute, getUserPost);
router.get("/following", protectRoute, getFollowingPost);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
