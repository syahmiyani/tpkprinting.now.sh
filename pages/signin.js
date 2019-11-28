import { useState, useEffect } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";

import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
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
    try {
      setErrorMsg("");
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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
        icon="user"
        header="Selamat Datang"
        content="Log masuk untuk membuat transaksi"
        color="blue"
      />
      <Form error={Boolean(errorMsg)} loading={loading} onSubmit={handleSubmit}>
        <Message error header="Oops!" content={errorMsg} />
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="adamlundun@gmail.com"
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
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
          <Button
            icon="signup"
            disabled={disabled || loading}
            type="submit"
            color="blue"
            content="Log Masuk"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="exclamation" />
        Belum ada akaun?{" "}
        <Link href="/signup">
          <a>Daftar disini</a>
        </Link>
      </Message>
    </>
  );
}

export default Login;
