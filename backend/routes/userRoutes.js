import express from "express";

import {
  logIn,
  logOut,
  singup,
  followUnfollow,
  updateProfile,
  getProfile,
} from "../controllers/userControllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();
router.get("/getprofile/:username", getProfile);
router.post("/signup", singup);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/follow/:id", protectRoute, followUnfollow);
router.post("/updateprofile/:id", protectRoute, updateProfile);

export default router;
