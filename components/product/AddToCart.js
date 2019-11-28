import { useState, useEffect } from "react";
import { Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import fetch from 'isomorphic-unfetch';
import cookie from "js-cookie";

import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

function AddProductToCart({ user }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => setSuccess(false), 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  async function handleAddToCart() {
    try {
      setLoading(true);
      const token = cookie.get("token");
      await fetch(`${baseUrl}/api/cart`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity, productId: router.query.id })
      });
      setSuccess(true);
    } catch (err) {
      catchErrors(err, window.alert);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Input
      type="number"
      placeholder="Quantity"
      value={quantity}
      min={1}
      onChange={e => setQuantity(Number(e.target.value))}
      action={
        user && success
          ? {
              color: "blue",
              content: "Item Added!",
              icon: "plus cart",
              disabled: true
            }
          : user
          ? {
              color: "orange",
              content: "Add to Cart",
              icon: "plus cart",
              loading,
              disabled: loading,
              onClick: handleAddToCart
            }
          : {
              color: "blue",
              content: "Sign Up To Purchase",
              icon: "signup",
              onClick: () => router.push("/signup")
            }
      }
    />
  );
}

export default AddProductToCart;
