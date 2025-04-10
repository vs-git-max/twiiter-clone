import Post from "../../models/post.model.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (posts.length === 0) return res.status(200).json([]);
  } catch (error) {
    console.log(`Error in the getAllPosts controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getAllPosts;
