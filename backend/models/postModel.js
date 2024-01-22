import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      maxLength: 500,
    },

    img: {
      type: String,
    },

    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },

    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          maxLength: 500,
          required: true,
        },

        userProfilePic: {
          type: String,
        },

        username: {
          type: String,
        },
      },
    ],
  },

  { timestamps: true },
  { collection: "threads" }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
