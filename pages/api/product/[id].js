import Product from "../../../models/Product";
import Cart from "../../../models/Cart";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetReq(req, res);
      break;
    case "DELETE":
      await handleDelReq(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function handleGetReq(req, res) {
  const { id } = req.query;
  const product = await Product.findOne({ _id: id });
  res.status(200).json(product);
}

async function handleDelReq(req, res) {
  const { id } = req.query;
  try {
    // delete from Product collections
    await Product.findByIdAndDelete({ _id: id });
    // Delete from Cart collections , ref as 'product'
    await Cart.updateMany(
      { "products.product": id },
      { $pull: { products: { product: id } } }
    );
    res.status(204).json({});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
}
