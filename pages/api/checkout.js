import jwt from "jsonwebtoken";

import Cart from "../../models/Cart";
import Order from "../../models/Order";
import calculateCartTotal from "../../utils/calculateCartTotal";

export default async (req, res) => {
  const { orderData } = req.body;

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    const cartTotal = calculateCartTotal(cart.products);

    await new Order({
      user: userId,
      email: orderData.email,
      total: cartTotal,
      products: cart.products
    }).save();

    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });

    res.status(200).send("Order success!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing order");
  }
};
