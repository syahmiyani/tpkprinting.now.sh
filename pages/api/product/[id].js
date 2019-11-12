import Product from "../../../models/Product";

export default async (req, res) => {
  const { id } = req.query;
  const product = await Product.findOne({ _id: id });
  res.status(200).json(product);
};
