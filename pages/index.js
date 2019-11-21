import axios from "axios";

import baseUrl from "../utils/baseUrl";

import ProductList from "../components/homepage/ProductList";
import ProductPagination from "../components/homepage/ProductPagination.js";

function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} />
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const res = await axios.get(url, payload);
  return res.data;
};

export default Home;
