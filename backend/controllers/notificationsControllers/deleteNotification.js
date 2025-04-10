import Notification from "../../models/notification.models.js";

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notification = await Notification.findById(notificationId);

    if (!notification)
      return res.status(404).json({ error: "notification not found" });

    if (notification.to.toString() !== userId.toString())
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this notification" });

    await Notification.findByIdAndDelete(notificationId);

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log(`Error in the deleteNotification controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deleteNotification;
