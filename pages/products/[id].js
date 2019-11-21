import axios from "axios";

import baseUrl from "../../utils/baseUrl";

import ProductSummary from "../../components/product/Summary";
import ProductAttr from "../../components/product/Attributes";

function ProductIdR({ product, user }) {
  return (
    <>
      <ProductSummary user={user} {...product} />
      <ProductAttr user={user} {...product} />
    </>
  );
}

ProductIdR.getInitialProps = async ({ query }) => {
  const url = `${baseUrl}/api/product/${query.id}`;
  const res = await axios.get(url);
  return { product: res.data };
};

export default ProductIdR;
