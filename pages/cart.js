import { useState } from "react";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import fetch from "isomorphic-unfetch";
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
    const token = cookie.get("token");
    const res = await fetch(`${baseUrl}/api/cart?productId=${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });
    setCartProducts(await res.json());
  }

  async function handleCheckout() {
    try {
      setIsLoading(true);
      const token = cookie.get("token");
      const payload = { orderData: { email: user.email } };
      await axios.post(`${baseUrl}/api/checkout`, {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: payload
      });
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
  const res = await fetch(`${baseUrl}/api/cart`, {
    method: "GET",
    headers: {
      Authorization: token
    }
  });
  return {
    products: await res.json()
  };
};

export default CartP;
