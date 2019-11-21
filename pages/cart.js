import { useState } from "react";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import axios from "axios";
import cookie from "js-cookie";

import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

import ItemList from "../components/cart/ItemList";
import Summary from "../components/cart/Summary";

function CartP({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function delItem(productId) {
    const url = `${baseUrl}/api/cart`;
    const token = cookie.get("token");
    const payload = {
      params: { productId },
      headers: { Authorization: token }
    };
    const res = await axios.delete(url, payload);
    setCartProducts(res.data);
  }

  async function handleCheckout() {
    try {
      setIsLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get("token");
      const payload = { orderData: { email: user.email } };
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setIsSuccess(true);
    } catch (err) {
      catchErrors(err, window.alert);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Segment loading={isLoading}>
      <ItemList
        delItem={delItem}
        isSuccess={isSuccess}
        user={user}
        products={cartProducts}
      />
      <Summary
        user={user}
        isSuccess={isSuccess}
        handleCheckout={handleCheckout}
        products={cartProducts}
      />
    </Segment>
  );
}

CartP.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;
  const payload = { headers: { Authorization: token } };
  const res = await axios.get(url, payload);
  return {
    products: res.data
  };
};

export default CartP;
