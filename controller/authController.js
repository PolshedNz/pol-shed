const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/emailSender");

exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.getLogin = (req, res) => {
  res.render("auth/login");
};

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(",")[0]
    : req.socket?.remoteAddress || req.ip || "Unknown";

  return ip === "::1" ? "127.0.0.1" : ip;
};

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.signup = async (req, res) => {
  console.log("sigining up");
  const { name, email, password } = req.body;
  const ipAddress = getClientIp(req);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const emailToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 3600000; // 1 hour

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ipAddress,
      emailToken,
      emailTokenExpires: tokenExpires,
    });

    await sendVerificationEmail(email, emailToken);
    res.redirect("/signup?showModal=true");

    // res.redirect("/job");
  } catch (err) {
    res
      .status(500)
      .json({ message: "External Server Error", error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({
      emailToken: token,
      emailTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    user.isVerified = true;
    user.emailToken = undefined;
    user.emailTokenExpires = undefined;

    await user.save();

    const jwt = signToken(user);
    res.cookie("jwt", jwt, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/job");
  } catch (err) {
    console.error("Verification Error:", err);
    res.status(500).send("Server error.");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = getClientIp(req);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    user.ipAddress = ipAddress;
    await user.save();

    const token = signToken(user);

    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // res.status(200).json({
    //   message: "Login successful",
    //   token,
    //   user,
    // });

    res.redirect("/job");
  } catch (err) {
    res
      .status(500)
      .json({ message: "External Server Error", error: err.message });
  }
};
