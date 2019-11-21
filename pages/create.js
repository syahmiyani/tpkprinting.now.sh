import { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";

import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_STATE = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [state, setState] = useState(INITIAL_STATE);
  const [mediaPreview, setMediaPreview] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isValValid = Object.values(state).every(val => Boolean(val));
    isValValid ? setBtnDisabled(false) : setBtnDisabled(true);
  }, [state]);

  useEffect(() => {
    if (state.media === "" || !state.media) {
      setMediaPreview("");
      return;
    }
  }, [state.media]);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "media" && files[0]) {
      setState({ ...state, media: files[0] });
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setState({ ...state, [name]: value });
    }
  }

  async function handleImageUpload() {
    const formData = new FormData();
    formData.append("file", state.media);
    formData.append("upload_preset", "next-store-reed");
    formData.append("cloud_name", "dz8mnabzz");
    const res = await axios.post(process.env.CLOUDINARY_URL, formData);
    return res.data.url;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setErrorMsg("");
      setIsLoading(true);
      const mediaUrl = await handleImageUpload();
      const { name, price, description } = state;
      const payload = { name, price, description, mediaUrl };
      await axios.post(`${baseUrl}/api/product`, payload);
      setState(INITIAL_STATE);
      setMediaPreview("");
      setIsSuccess(true);
    } catch (err) {
      catchErrors(err, setErrorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Cipta Produk Baru
      </Header>
      <Form
        loading={isLoading}
        success={isSuccess}
        onSubmit={handleSubmit}
        error={Boolean(errorMsg)}
        autoComplete="off"
      >
        <Message error icon="x" header="Oops!" content={errorMsg} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Produk anda telah di cipta dan disimpan"
        />
        <Form.Group widths="equal">
          <Form.Field
            name="name"
            control={Input}
            type="text"
            label="Nama"
            placeholder="Wedding Card Flower"
            value={state.name}
            onChange={handleChange}
          />
          <Form.Field
            name="price"
            control={Input}
            type="number"
            min="1"
            step="0.1"
            label="Harga (RM)"
            placeholder="RM12"
            value={state.price}
            onChange={handleChange}
          />
          <Form.Field
            name="media"
            control={Input}
            type="file"
            label="Gambar"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          name="description"
          control={TextArea}
          label="Detail / Keterangan"
          placeholder="Barang ini adalah....."
          onChange={handleChange}
          value={state.description}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          type="submit"
          content="Submit"
          disabled={btnDisabled || isLoading}
        />
      </Form>
    </>
  );
}

export default CreateProduct;
