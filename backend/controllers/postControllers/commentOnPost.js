import Post from "../../models/post.model.js";

const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) return res.status(404).json({ error: "Post not found" });

    const post = await Post.findById(postId);

    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(`Error in commentOnPost ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default commentOnPost;
