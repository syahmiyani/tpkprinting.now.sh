// import products from "../../public/products.json";
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { page, size } = req.query;
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);

  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const itemSkipped = pageSize * (pageNum - 1);
    products = await Product.find()
      .skip(itemSkipped)
      .limit(pageSize);
  }
  res.status(200).json({ products, totalPages });
};
