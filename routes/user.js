import User from "../models/User.js";
import express from "express";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id",verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Güncelleme Başarılı")
  } catch (error) {
    res.status(500).json(err)
  }
});


//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {

  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User deleted");
  } catch (error) {
    res.status(500).json(err)
  }

})

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {

  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(err)
  }

})

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {

  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(err)
  }

})


export default router;
