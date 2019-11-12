import { Card, Image } from "semantic-ui-react";
import Link from "next/link";

function ProductList({ products }) {
  return (
    <Card.Group stackable itemsPerRow="3" centered>
      {products.map(({ name, mediaUrl, _id, price }) => (
        <Link href="/products/[id]" as={`/products/${_id}`} key={_id}>
          <Card>
            <Image src={mediaUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>${price}</Card.Meta>
            </Card.Content>
          </Card>
        </Link>
      ))}
    </Card.Group>
  );
}
export default ProductList;
