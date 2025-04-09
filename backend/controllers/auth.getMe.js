import User from "../models/user.model.js";

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in the get me controller ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getMe;
