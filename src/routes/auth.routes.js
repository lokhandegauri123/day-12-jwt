const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const authRoute = express.Router();

//  /api/auth/register
authRoute.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user already exist with this email address",
    });
  }

  const user = await userModel.create({
    email,
    name,
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
    message: "user registered",
    user,
    token,
  });
});

//  /api/auth/protected

authRoute.post("/protected", async (req, res) => {
  console.log(res.cookie);
  await res.status(200).json({
    message: "This is protected route",
  });
});

authRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const isEmailExist = await userModel.findOne({ email });

  if (!isEmailExist) {
    return res.status(404).json({
      message: "User with this email does not exist",
    });
  }

  const isPassExist = user.pass === pass;

  if (!isPassExist) {
    return res.status(404).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_cookie",token)

  res.status(200).json({
    message : "User logged in",
    user
  })
});
module.exports = authRoute;
