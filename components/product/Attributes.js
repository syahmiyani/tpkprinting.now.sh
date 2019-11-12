import { Header, Button } from "semantic-ui-react";

function ProductAttr({ desciption }) {
  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{desciption}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
      />
    </>
  );
}

export default ProductAttr;
