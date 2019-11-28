import { useState, useEffect } from "react";
import { Button, Segment, Divider } from "semantic-ui-react";

import calculateCartTotal from "../../utils/calculateCartTotal";

function Summary({ products, handleCheckout, isSuccess }) {
  const [cartAmount, setCartAmount] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  useEffect(() => {
    const cartTotal = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setIsCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total: </strong>RM{cartAmount}
        <Button
          disabled={isCartEmpty || isSuccess}
          icon="cart"
          color="teal"
          floated="right"
          content="Submit Order"
          onClick={handleCheckout}
        ></Button>
      </Segment>
    </>
  );
}

export default Summary;
