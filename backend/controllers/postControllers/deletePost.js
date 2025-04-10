import Post from "../../models/post.model.js";

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ error: "You are not authorised to delte this post" });

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in the delete post controller");
    res.status(500).json({ error: "Server error" });
  }
};

export default deletePost;
