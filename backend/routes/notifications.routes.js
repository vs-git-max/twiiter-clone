import express from "express";

import protectRoute from "../middleware/protectRoute.js";

import getNotifications from "../controllers/notificationsControllers/getNotifications.js";
import deleteNotifications from "../controllers/notificationsControllers/deleteNotifications.js";
import deleteNotification from "../controllers/notificationsControllers/deleteNotification.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteNotification);

export default router;
