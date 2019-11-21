import { useRouter } from "next/router";
import {
  Header,
  Accordion,
  Label,
  Segment,
  Icon,
  Button,
  List,
  Image,
  Divider
} from "semantic-ui-react";

import formatDate from "../../utils/formatDate";

function OrdersListing({ orders }) {
  const router = useRouter();

  function mapOrders(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />
      },
      content: {
        content: (
          <>
            <List.Header as="h2">Total: RM{order.total}</List.Header>
            <Divider />
            <List>
              {order.products.map(({ product, quantity }, i) => (
                <List.Item key={i}>
                  <Image avatar src={product.mediaUrl} />
                  <List.Content>
                    <List.Header>{product.name}</List.Header>
                    <List.Description>
                      {quantity} . RM{product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="red" size="tiny">
                      kJdeMT-U
                    </Label>
                  </List.Content>
                  <Divider />
                </List.Item>
              ))}
            </List>
          </>
        )
      }
    }));
  }

  return (
    <>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline" />
            Tiada order di database.
          </Header>
          <div>
            <Button onClick={() => router.push("/")} color="orange">
              Lihat Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion fluid styled exclusive={false} panels={mapOrders(orders)} />
      )}
    </>
  );
}

export default OrdersListing;
