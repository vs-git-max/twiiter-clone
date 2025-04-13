import Notification from "../../models/notification.models.js";
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPost: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPost: postId } });

      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await notification.save();

      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    console.log(`Error in the likeUnlikePost controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default likeUnlikePost;
