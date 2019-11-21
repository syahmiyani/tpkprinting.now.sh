import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

import User from "../../models/User";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 15 })) {
      return res.status(422).send("Nama mestilah 3 hingga 15 characters");
    } else if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password mestilah 6 characters atau lebih");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email mestilah valid");
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).send(`Email "${email}" telah didaftar`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword
    }).save();

    await new Cart({ user: newUser._id }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up. Please try again later");
  }
};
