const { loginController, registerController,  authController } = require("../controllers/userControllers");

const express = require ("express");
const authMiddleware = require("../middlewares/authMiddleware");

// router object

const router = express.Router();

// login || post
router.post("/login", loginController);

// register || post
router.post("/register", registerController)

// auth || post
router.post('/getUserData', authMiddleware, authController)
module.exports= router;