import fetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";

import AccountTop from "../components/account/Top";
import OrdersListing from "../components/account/OrdersListing";
import Permissions from "../components/account/Permissions.js";

function AccountP({ user, orders }) {
  return (
    <>
      <AccountTop {...user} />
      <OrdersListing orders={orders} />
      {user.role === "admin" || (user.role === "root" && <Permissions />)}
    </>
  );
}

AccountP.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { orders: [] };
  }
  const res = await fetch(`${baseUrl}/api/orders`, {
    method: "GET",
    headers: {
      Authorization: token
    }
  });
  return await res.json();
};

export default AccountP;
