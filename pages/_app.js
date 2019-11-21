import App from "next/app";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";

import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import Layout from "../components/shared/Layout";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";

      if (isProtectedRoute) {
        redirectUser(ctx, "/signin");
      }
    } else {
      try {
        const payload = { headers: { Authorization: token } };
        const url = `${baseUrl}/api/account`;
        const res = await axios.get(url, payload);
        const user = res.data;
        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";
        const isNotPermitted =
          !(isRoot || isAdmin) && ctx.pathname === "/create";
        if (isNotPermitted) {
          redirectUser(ctx, "/");
        }
        pageProps.user = user;
      } catch (err) {
        console.error("Error getting current user", err);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/signin");
      }
    }

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      console.log("logged out from storage");
      Router.push("/signin");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
