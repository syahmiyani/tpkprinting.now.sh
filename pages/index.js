import axios from "axios";

import baseUrl from "../utils/baseUrl";

import ProductList from "../components/homepage/ProductList";

function Home({ products }) {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await axios.get(`${baseUrl}/api/products`);
  return { products: res.data };
};

export default Home;
