import Product from "../../../models/Product";

import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await handlePostReq(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

async function handlePostReq(req, res) {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error in creating product");
  }
}
