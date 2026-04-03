const userModel = require("../models/user.model");
const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

authRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  const isEmailExist = await userModel.findOne({ email });

  if (isEmailExist) {
    return res.status(409).json({
      message: "email already exist",
    });
  }

  const user = await userModel.create({
    name,
    email,
    pass,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user registed successfully",
    user,
  });
});

authRouter.post("/login",async (req, res) => {
  const { email, pass } = req.body;

  const user =await userModel.findOne({ email });

  if (!user) {
    return res.status(409).json({
      message: "email does not exist",
    });
  }

  const isPass = pass === user.pass;

  if (!isPass) {
    return res.status(404).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token",token)

  res.status(201).json({
    message: "user logged successfully",
  });
});

module.exports = authRouter;
