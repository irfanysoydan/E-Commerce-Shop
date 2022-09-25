import Cart from "../models/Cart.js";
import express from "express";
import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} from "./verifyToken.js";

const router = express.Router();


//CREATE CART
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(err);
  }
});




//UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Ürün Güncelleme Başarılı");
  } catch (error) {
    res.status(500).json(err);
  }
});


//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted");
  } catch (error) {
    res.status(500).json(err);
  }
});



//GET CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(err);
  }
});


//GET ALL CARTS
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const carts  = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(err);
  }
});
 
export default router;
