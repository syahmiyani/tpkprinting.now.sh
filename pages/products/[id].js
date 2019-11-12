import axios from "axios";

import baseUrl from "../../utils/baseUrl";

import ProductSummary from "../../components/product/Summary";
import ProductAttr from "../../components/product/Attributes";

function ProductIdR({ product }) {
  return (
    <>
      <ProductSummary {...product} />
      <ProductAttr {...product} />
    </>
  );
}

ProductIdR.getInitialProps = async ({ query }) => {
  const url = `${baseUrl}/api/product/${query.id}`;
  const res = await axios.get(url);
  return { product: res.data };
};

export default ProductIdR;
