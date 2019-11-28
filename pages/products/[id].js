import fetch from "isomorphic-unfetch";

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
  const res = await fetch(`${baseUrl}/api/product/${query.id}`);
  return { product: await res.json() };
};

export default ProductIdR;
