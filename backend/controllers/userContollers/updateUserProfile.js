import User from "../../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

const updateUserProfile = async (req, res) => {
  const { fullName, username, currentPassword, newPassword, bio, link, email } =
    req.body;

  let { profileImage, coverImage } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      (!currentPassword && newPassword) ||
      (!newPassword && currentPassword)
    ) {
      res
        .status(400)
        .json({ error: "Please provide both current and new passwords" });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ error: "Password must be atleast 6 characters long" });

      const salt = await bcrypt.getSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImage) {
      if (user.profileImage) {
        await cloudinary.destroy(
          user.profileImage.split("/").pop().split(".")[0]
        );
      }
      const uploadedImage = await cloudinary.uploader.upload(profileImage);

      profileImage = uploadedImage.secure_url;
    }

    if (coverImage) {
      if (user.coverImage) {
        await cloudinary.destroy(
          user.coverImage.split("/").pop().split(".")[0]
        );
      }
      const uploadedImage = await cloudinary.uploader.upload(coverImage);

      coverImage = uploadedImage.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.link = link || user.link;
    user.bio = bio || user.bio;
    user.email = email || user.email;
    user.coverImage = coverImage || user.coverImage;
    user.profileImage = profileImage || user.profileImage;

    user = await user.save();
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error in the updateUser ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export default updateUserProfile;
