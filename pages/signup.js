import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";

import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

function Signup() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErrorMsg("Password tidak sama/match");
      setUser({ ...user, password: "", confirmPassword: "" });
      return;
    }
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(`${baseUrl}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });
      const response = await res.text();
      if (res.status >= 299) {
        catchErrors(response, setErrorMsg);
        return;
      }
      handleLogin(response);
    } catch (err) {
      catchErrors(err, setErrorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Message
        attached
        icon="users"
        header="Jom Daftar!"
        content="Isi borang untuk buat akaun baru"
        color="teal"
      />
      <Form
        error={Boolean(errorMsg)}
        loading={loading}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Message error header="Oops!" content={errorMsg} />
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Nama Pengguna"
            placeholder="Adam Lundun"
            name="name"
            value={user.name}
            onChange={handleChange}
            type="text"
          />
          <Form.Input
            fluid
            type="email"
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="adamlundun@gmail.com"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            type="password"
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="******"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            type="password"
            icon="lock"
            iconPosition="left"
            label="Sahkan Password"
            placeholder="******"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <Button
            icon="signup"
            disabled={disabled || loading}
            type="submit"
            color="orange"
            content="Daftar"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="exclamation" />
        Sudah Daftar?{" "}
        <Link href="/signin">
          <a>Log masuk disini</a>
        </Link>
      </Message>
    </>
  );
}

export default Signup;
