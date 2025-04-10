import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

const getUserPost = async (req, res) => {
  try {
    const username = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const post = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(post);
  } catch (error) {
    console.log(`Error in the getUserPost ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getUserPost;
