function calculateCartTotal(products) {
  const total = products.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);

  const cartTotal = ((total * 100) / 100).toFixed(2);

  return cartTotal;
}
export default calculateCartTotal;
