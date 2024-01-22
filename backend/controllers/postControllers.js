import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
  const { postedBy, text, img } = req.body;
  try {
    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: "Se requiere el postedBy y el text" });
    }

    if (postedBy !== req.user._id.toString()) {
      return res.status(400).json({
        message: "No tienes autorizacion para crear el post",
      });
    }

    const maxLength = 500;

    if (text.length > maxLength) {
      return res
        .status(401)
        .json({ message: "el texto debe contener maximo 500 caracteres " });
    }

    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json({ message: "post creado stisfactoriamente", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error message en create post", error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ message: "Post no encontrado" });
    }

    if (req.user._id.toString() !== post.postedBy.toString()) {
      return res
        .status(400)
        .json({ message: "no tienes permisos para eliminar este post" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error message en delete post", error.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ message: "Post no encontrado" });
    }

    res.status(200).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error message en get post", error.message);
  }
};

const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const post = await Post.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "Unathorized" });
    }

    if (!post) {
      return res.status(400).json({ message: "Post not Found" });
    }

    const isLiked = post.likes.includes(userId);

    if (!isLiked) {
      await Post.findByIdAndUpdate(req.params.id, {
        $push: { likes: userId },
      });
      res.status(200).json({ message: "Post  Liked Succesfully" });
    } else {
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: userId },
      });

      res.status(200).json({ message: "Post  Unliked Succesfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error message en like post", error.message);
  }
};

const replyPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { text } = req.body;
    const userProfilePic = req.user.avatar;
    const username = req.user.username;

    const user = await User.findById(userId);
    const post = await Post.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ message: "you must be logged to reply" });
    }

    if (!post) {
      return res.status(400).json({ message: "Post not Found" });
    }

    const reply = { userId, text, userProfilePic, username };

    await post.replies.push(reply);

    await post.save();
    res.status(200).json({ message: "reply send succesfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error message en reply post", error.message);
  }
};

const deleteReplyPost = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const post = await Post.findById(req.params.postid);

    if (!user) {
      return res
        .status(400)
        .json({ message: "unathorized to delete the reply" });
    }

    if (!post) {
      return res.status(400).json({ message: "Post not Found" });
    }

    await Post.updateOne(req.params.id, {
      $pull: { replies: { _id: req.params.replyid } },
    });

    await post.save();
    res.status(200).json({ message: "reply deleted succesfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error message en delete reply post", error.message);
  }
};

const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "unathorized " });
    }
    const following = user.following;
    const posts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.log("Error message en getfeed", error.message);
  }
};
export {
  createPost,
  deletePost,
  getPost,
  likePost,
  replyPost,
  deleteReplyPost,
  getFeed,
};
