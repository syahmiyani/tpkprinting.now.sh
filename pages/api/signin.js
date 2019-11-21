import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Password do not match");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in user");
  }
};
