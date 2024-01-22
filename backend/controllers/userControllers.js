import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../util/helpers/jasonWebTokenSetCookie.js";
import mongoose from "mongoose";
//promesa-> no sabemos cuanto tiempo tomara y necesitamos que esa accion culmine para pasar al siguiente proceso
const singup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should have at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPassCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPassCorrect) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    generateToken(user._id, res);
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout Succesfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("error in LogoutUser", error);
  }
};

const followUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findOne(new mongoose.Types.ObjectId(id));
    const currentUser = await User.findOne(req.user._id);

    if (id === req.user._id) {
      res.status(400).json({ error: " You can not follow yourself" });
    }

    if (!userToModify || !currentUser) {
      res.status(400).json({ error: "User not Found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //unfollow
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      });
      res.status(200).json({ message: "User Unfollowed", userToModify });
    } else {
      //follow
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      await User.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      });

      res.status(200).json({ message: "User Followed", userToModify });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
    console.log("Error en Follow", error.message);
  }
};

const updateProfile = async (req, res) => {
  const { email, password, name, username, profilePic, bio } = req.body;
  const currentUserId = req.user._id;
  try {
    let user = await User.findById(currentUserId);
    if (req.params.id !== currentUserId.toString())
      return res
        .status(400)
        .json({ error: "No puedes modificar el perfil de otros usuarios" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.email = email || user.email;
    user.username = username || user.username;
    user.name = name || user.name;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    res.status(200).json({
      message: "Profile update succesfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in updateprofile", error.message);
  }
};

const getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error en getProfile", error.message);
  }
};
export { singup, logIn, logOut, followUnfollow, updateProfile, getProfile };
