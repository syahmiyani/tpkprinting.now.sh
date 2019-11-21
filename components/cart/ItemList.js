import { useRouter } from "next/router";
import {
  Header,
  Segment,
  Button,
  Icon,
  Item,
  Message
} from "semantic-ui-react";

function ItemList({ user, products, delItem, isSuccess }) {
  const router = useRouter();

  function MappedItemList(products) {
    return products.map(({ product, quantity }) => ({
      childKey: product._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/products/${product._id}`)}
        >
          {product.name}
        </Item.Header>
      ),
      image: product.mediaUrl,
      meta: `${quantity} x RM${product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => delItem(product._id)}
        />
      )
    }));
  }

  return (
    <>
      {isSuccess && (
        <Message
          success
          header="Success!"
          content="Your order has been accepted"
          icon="star outline"
        />
      )}
      {products.length === 0 && (
        <Segment secondary color="teal" inverted textAlign="center" placeholder>
          <Header icon>
            <Icon name="shopping basket" />
            Tiada produk dalam kart anda.
          </Header>
          <div>
            {user ? (
              <Button color="orange" onClick={() => router.push("/")}>
                Lihat produk kami
              </Button>
            ) : (
              <Button color="blue" onClick={() => router.push("/signin")}>
                Log masuk untuk isi kart.
              </Button>
            )}
          </div>
        </Segment>
      )}
      <Item.Group divided items={MappedItemList(products)} />
    </>
  );
}

export default ItemList;
