import { useState } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { Header, Button, Modal } from "semantic-ui-react";

import baseUrl from "../../utils/baseUrl";

function ProductAttr({ description, _id, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;
  async function handleDelete() {
    await fetch(`${baseUrl}/api/product/${_id}`, {
      method: "DELETE"
    });
    router.push("/");
  }

  return (
    <>
      <Header as="h3">Tentang produk ini</Header>
      <p>{description}</p>
      {isRootOrAdmin && (
        <Button
          icon="trash alternate outline"
          color="red"
          content="Delete Product"
          onClick={() => setIsOpen(true)}
        />
      )}
      <Modal
        size="small"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        dimmer="blurring"
      >
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Adakah anda pasti untuk delete produk ini?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={() => setIsOpen(false)} />
          <Button
            labelPosition="right"
            icon="trash"
            negative
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttr;
