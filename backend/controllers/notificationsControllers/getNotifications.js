import Notification from "../../models/notification.models.js";

const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImage",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notification);
  } catch (error) {
    console.log(`Error in the getNotifications controller ${error.message}`);

    res.status(500).json({ error: "Internal server error" });
  }
};

export default getNotifications;
