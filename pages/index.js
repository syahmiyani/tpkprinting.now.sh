import fetch from "isomorphic-unfetch";

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
  const res = await fetch(`${baseUrl}/api/products?page=${page}&size=${size}`);
  const response = await res.json();
  return response;
};

export default Home;
