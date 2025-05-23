import User from "../../models/user.model.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in the getUserProfile");
    res.status(500).json({ error: error.message });
  }
};

export default getUserProfile;
